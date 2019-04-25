const { BrowserBuilder } = require('@angular-devkit/build-angular');
const buildExtendedWebpackConfig = require('../shared/build-extended-webpack-config');
const path = require('path');
const webpackMerge = require('webpack-merge');

class NgconfAppDeployableUnitBrowserBuilder extends BrowserBuilder {
  /**
   * We wrap the default webpack config generation logic from the Angular CLI,
   * and slightly extend it with some of our own.
   */
  buildWebpackConfig(root, projectRoot, host, options) {
    const defaultWebpackConfig = super.buildWebpackConfig(root, projectRoot, host, options);
    const extendedWebpackConfig = buildExtendedWebpackConfig(defaultWebpackConfig, options);

    /**
     * We want to create a single UMD bundle, so we remove any default webpack config which will
     * cause chunks to be split out
     */
    delete extendedWebpackConfig.optimization.runtimeChunk;
    delete extendedWebpackConfig.optimization.splitChunks;
    delete extendedWebpackConfig.entry.styles;

    /**
     * Create the UMD library and filename based on the ngconf-app team/deployable unit project nane
     */
    const ngconfAppDeployableUnitProjectName = path.basename(extendedWebpackConfig.entry.main[0], '.main.ts');
    return webpackMerge([
      extendedWebpackConfig,
      {
        output: {
          library: ngconfAppDeployableUnitProjectName,
          libraryTarget: 'umd',
          filename: `${ngconfAppDeployableUnitProjectName}.umd.js`
        }
      }
    ]);
  }
}

/**
 * We need to export it like this to keep the Angular CLI happy.
 */
exports.NgconfAppDeployableUnitBrowserBuilder = NgconfAppDeployableUnitBrowserBuilder;
exports.default = NgconfAppDeployableUnitBrowserBuilder;
