/**
 * We use ts-ignore here to suppress IDE warnings regarding the .ngfactory file not being
 * available. It will be available at build time (as long we build with AOT enabled).
 */
// @ts-ignore
import { NgconfAppDeployableUnitElementsModuleNgFactory } from './ngconf-app-team-a.module.ngfactory';

/**
 * After ngconf-app is ready, use the shared injector it made available
 * to create the deployable-unit module, and register all the components as custom-elements
 */
(window as any).__NGCONF_APP_SHARED_CONTEXT__.onNgconfAppBootstrapped(() => {
  try {
    /**
     * Manually create the module ref using the shared injector
     */
    const elementModuleRef = NgconfAppDeployableUnitElementsModuleNgFactory.create(
      (window as any).__NGCONF_APP_SHARED_CONTEXT__.injector
    );
    /**
     * Create and define the custom-elements
     */
    (NgconfAppDeployableUnitElementsModuleNgFactory.moduleType as any).createAndDefineElements(
      elementModuleRef.injector
    );
  } catch (err) {
    console.error(err);
  }
});
