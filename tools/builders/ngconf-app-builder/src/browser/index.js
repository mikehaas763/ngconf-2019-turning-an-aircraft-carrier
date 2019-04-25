const { BrowserBuilder } = require('@angular-devkit/build-angular');
const buildExtendedWebpackConfig = require('../shared/build-extended-webpack-config');

class NgconfAppBrowserBuilder extends BrowserBuilder {
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

    return extendedWebpackConfig;
  }
}

/**
 * We need to export it like this to keep the Angular CLI happy.
 */
exports.NgconfAppBrowserBuilder = NgconfAppBrowserBuilder;
exports.default = NgconfAppBrowserBuilder;
