import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  /**
   * Allow other code (e.g. in the AngularJS) to know that the ngconf-app Angular
   * app has been bootstrapped
   */
  .then(() => (window as any).__NGCONF_APP_SHARED_CONTEXT__.setNgconfAppBootstrapped())
  .catch(err => console.log(err));
