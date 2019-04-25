import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './reducers';

@NgModule({
  imports: [BrowserModule, StoreModule.forRoot(reducers, { metaReducers })],
  providers: [],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   * Expose the top-level Injector as early as possible, so that all the Angular Elements
   * which get loaded and bootstrapped will be able to share the same injector
   */
  constructor(injector: Injector) {
    (window as any).__NGCONF_APP_SHARED_CONTEXT__ = (window as any).__NGCONF_APP_SHARED_CONTEXT__ || {};
    (window as any).__NGCONF_APP_SHARED_CONTEXT__.injector = injector;
  }
}
