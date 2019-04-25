/**
 * Related PR to make this the default behaviour in Angular: https://github.com/angular/angular/pull/24185
 *
 * Related work in Zone.js: https://github.com/angular/zone.js/pull/1126
 *
 * Inspiration from: https://github.com/remackgeek/elements-zone-strategy
 *
 * Original constructs in Angular source:
 * - https://github.com/angular/angular/blob/6.1.4/packages/elements/src/create-custom-element.ts
 * - https://github.com/angular/angular/blob/6.1.4/packages/elements/src/component-factory-strategy.ts
 */
import { Injector, NgZone, Type } from '@angular/core';
import { createCustomElement, NgElementStrategy, NgElementStrategyEvent, NgElementStrategyFactory } from '@angular/elements';
import { Observable } from 'rxjs';

class NgZoneNgElementStrategy {
  private _ngZone: NgZone;
  events!: Observable<NgElementStrategyEvent>;

  constructor(protected _strategy: NgElementStrategy, protected _injector: Injector) {
    this._ngZone = this._injector.get<NgZone>(NgZone);
  }

  connect(element: HTMLElement): void {
    this._ngZone.run(() => {
      this._strategy.connect(element);
    });
    this.events = this._strategy.events;
  }

  disconnect(): void {
    this._ngZone.run(() => {
      this._strategy.disconnect();
    });
  }

  getInputValue(propName: string): any {
    return this._ngZone.run(() => {
      return this._strategy.getInputValue(propName);
    });
  }

  setInputValue(propName: string, value: string): void {
    this._ngZone.run(() => {
      this._strategy.setInputValue(propName, value);
    });
  }
}

export class NgZoneNgElementStrategyFactory implements NgElementStrategyFactory {
  private _ngElement = createCustomElement(this._component, { injector: this._injector });

  constructor(private _component: Type<any>, private _injector: Injector) {
    /**
     * This is to keep the document-register-element polyfill happy, it doesn't like creating elements
     * before the define, so we fill the registry with a random definition
     */
    customElements.define(
      `placeholder-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 5)}`,
      this._ngElement
    );
  }

  create(): NgElementStrategy {
    /**
     * The only way to get a default strategy outside @angular/elements
     * is to create the ngElement/ngElementImpl and get it from a property
     */
    let tempElement = new this._ngElement(this._injector);
    const strategy = tempElement['ngElementStrategy'];
    /* tslint:disable-next-line */
    tempElement = null!;

    return new NgZoneNgElementStrategy(strategy, this._injector);
  }
}
