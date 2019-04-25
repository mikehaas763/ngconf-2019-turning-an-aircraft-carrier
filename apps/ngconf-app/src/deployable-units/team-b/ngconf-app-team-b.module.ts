import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import {
  TeamBComponentOneComponent,
  TeamBElementOneModule
} from '@c1-ngconf/team-b/element-one';
import {
  TeamBComponentTwoComponent,
  TeamBElementTwoModule
} from '@c1-ngconf/team-b/element-two';
import { NgZoneNgElementStrategyFactory } from '@c1-ngconf/shared/elements-utils';
import { StoreModule } from '@ngrx/store';
import * as fromTeamB from './ngconf-app-team-b.reducer';

@NgModule({
  imports: [
    TeamBElementOneModule,
    TeamBElementTwoModule,
    StoreModule.forFeature('teamB', fromTeamB.reducer)
  ],
  /**
   * Components used as Angular Elements need to be added to entryComponents
   */
  entryComponents: [TeamBComponentOneComponent, TeamBComponentTwoComponent]
})
export class NgconfAppDeployableUnitElementsModule {
  /**
   * Define the DOM selectors which will be used when the components
   * are consumed as custom elements
   */
  static readonly COMPONENTS_AS_CUSTOM_ELEMENTS = [
    {
      angularComponent: TeamBComponentOneComponent,
      customElementSelector: 'c1-element-team-b-custom-element-one'
    },
    {
      angularComponent: TeamBComponentTwoComponent,
      customElementSelector: 'c1-element-team-b-custom-element-two'
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
