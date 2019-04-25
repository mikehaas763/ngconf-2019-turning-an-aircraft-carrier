import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import {
  TeamAComponentOneComponent,
  TeamAElementOneModule
} from '@c1-ngconf/team-a/element-one';
import { NgZoneNgElementStrategyFactory } from '@c1-ngconf/shared/elements-utils';
import { StoreModule } from '@ngrx/store';
import * as fromTeamA from './ngconf-app-team-a.reducer';

@NgModule({
  imports: [
    TeamAElementOneModule,
    StoreModule.forFeature('teamA', fromTeamA.reducer)
  ],
  /**
   * Components used as Angular Elements need to be added to entryComponents
   */
  entryComponents: [TeamAComponentOneComponent]
})
export class NgconfAppDeployableUnitElementsModule {
  /**
   * Define the DOM selectors which will be used when the components
   * are consumed as custom elements
   */
  static readonly COMPONENTS_AS_CUSTOM_ELEMENTS = [
    {
      angularComponent: TeamAComponentOneComponent,
      customElementSelector: 'c1-element-team-a-custom-element-one'
    }
  ];
  /**
   * Register Angular components as custom-elements
   */
  static createAndDefineElements(sharedInjector: Injector) {
    NgconfAppDeployableUnitElementsModule.COMPONENTS_AS_CUSTOM_ELEMENTS.forEach(
      componentConfig => {
        const ngZoneNgElementStrategyFactory = new NgZoneNgElementStrategyFactory(
          componentConfig.angularComponent,
          sharedInjector
        );
        customElements.define(
          componentConfig.customElementSelector,
          createCustomElement(componentConfig.angularComponent, {
            injector: sharedInjector,
            strategyFactory: ngZoneNgElementStrategyFactory
          })
        );
      }
    );
  }
}
