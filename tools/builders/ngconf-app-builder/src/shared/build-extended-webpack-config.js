const webpackMerge = require('webpack-merge');

/**
 * There are a few use-cases within ngconf-app which require us to slightly extend the default webpack configuration
 * which is generated behind the scenes in the Angular CLI.
 *
 * This utility function takes in that default config, and a copy of the options provided for the custom builder
 * within the angular.json file at the root of the workspace.
 */
module.exports = function buildExtendedWebpackConfig(defaultWebpackConfig, angularJSONOptions) {
  const additionalWebpackConfig = {};

  /**
   * With Angular and our old AngularJS (if it is powered by webpack) on the page at the same time, we have two different versions of the webpack runtime.
   * This can cause issues, and so webpack allows us to give the critical jsonpFunction it generates a unique
   * name, so that each instance of the runtime uses its own function.
   *
   * See: https://webpack.js.org/configuration/output/#output-jsonpfunction
   */
  additionalWebpackConfig.output = {
    jsonpFunction: 'webpackJsonpAngular'
  };

  /**
   * We use the UMD bundles provided by our major 3rd Party dependencies and mark them as external, so that no ngconf-app
   * code bundles them in with our 1st part source. The bundles themselves will be resolved by requirejs at runtime.
   */
  additionalWebpackConfig.externals = {
    rxjs: {
      amd: 'rxjs',
      commonjs: 'rxjs',
      commonjs2: 'rxjs',
    },
    'rxjs/operators': {
      amd: 'rxjs/operators',
      commonjs: 'rxjs/operators',
      commonjs2: 'rxjs/operators',
    },
    '@angular/core': {
      amd: '@angular/core',
      commonjs: 'ng.core',
      commonjs2: 'ng.core',
    },
    '@angular/compiler': {
      amd: '@angular/compiler',
      commonjs: 'ng.compiler',
      commonjs2: 'ng.compiler',
    },
    '@angular/common': {
      amd: '@angular/common',
      commonjs: 'ng.common',
      commonjs2: 'ng.common',
    },
    '@angular/platform-browser': {
      amd: '@angular/platform-browser',
      commonjs: 'ng.platformBrowser',
      commonjs2: 'ng.platformBrowser',
    },
    '@angular/platform-browser-dynamic': {
      amd: '@angular/platform-browser-dynamic',
      commonjs: 'ng.platformBrowserDynamic',
      commonjs2: 'ng.platformBrowserDynamic',
    },
    '@angular/elements': {
      amd: '@angular/elements',
      commonjs: 'ng.elements',
      commonjs2: 'ng.elements',
    },
    '@ngrx/store': {
      amd: '@ngrx/store',
      commonjs: 'ngrx.store',
      commonjs2: 'ngrx.store',
    },
  };

  /**
   * All of our ngconf-app code gets turned into UMD bundles, so that it can be resolved by
   * requirejs at runtime.
   */
  additionalWebpackConfig.output = {
    libraryTarget: 'umd'
  };

  /**
   * Merge the default Angular CLI webpack config with our own
   */
  return webpackMerge([defaultWebpackConfig, additionalWebpackConfig]);
};
