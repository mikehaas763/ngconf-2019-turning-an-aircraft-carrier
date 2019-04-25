const { DevServerBuilder } = require('@angular-devkit/build-angular');
const { debounce } = require('lodash');
const { Observable } = require('rxjs');
const execa = require('execa');
const browserSync = require('browser-sync');

class NgconfAppDevServerBuilder extends DevServerBuilder {
  constructor() {
    super();
    this.browserSyncInstance = browserSync.create('ngconf-app-builder:dev-server');
  }

  run(builderConfig) {
    return new Observable(() => {
      logMessage('Initializing dev-server...');
      /**
       * Initialize the browser-sync intsance
       */
      this.browserSyncInstance.init({
        open: builderConfig.options.open,
        server: {
          index: './index.html',
          routes: {
            '/dist': 'dist'
          }
        },
        logLevel: 'silent',
        port: builderConfig.options.port
      });
      /**
       * Create the file watcher for the output directories of all potential build processes
       */
      const watcher = this.browserSyncInstance.watch([`dist/apps/ngconf-app/**/*`], {
        ignoreInitial: true
      });

      watcher.on('ready', () => {
        logMessage('Completed initial scan of one-build/dist, watching...');
        /**
         * Trigger parallel builds in watch mode for all deployable-units
         */
        logMessage('Triggering builds in watch mode for all deployable-units...');
        execa.shell('npx nx affected:build --all --exclude ngconf-app --parallel --watch').stdout.pipe(process.stdout);
        /**
         * Watch file changes from all the potential builds
         */
        watcher.on(
          'all',
          debounce(() => {
            logMessage('Detected one-build/dist changes, reloading the browser...');
            this.browserSyncInstance.reload();
          }, 500)
        );
      });
    });
  }
}

/**
 * We need to export it like this to keep the Angular CLI happy.
 */
exports.NgconfAppDevServerBuilder = NgconfAppDevServerBuilder;
exports.default = NgconfAppDevServerBuilder;

function logMessage(msg) {
  console.log('\n----------------------------------------------------------------------------------------------------------------');
  console.log(`-> ngconf-app-builder:dev-server - ${new Date().toTimeString()} ${msg}`);
  console.log('----------------------------------------------------------------------------------------------------------------\n');
}
