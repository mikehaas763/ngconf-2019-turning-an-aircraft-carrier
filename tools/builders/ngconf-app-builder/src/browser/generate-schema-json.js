const mergeAndWriteSchemaJSON = require('../shared/merge-and-write-schema-json');

/**
 * NOTE: If you make changes to this file, or the base schema.json changes, e.g. when you
 * upgrade a package version, you will need to execute it again to have the changes reflected
 * in the corresponding schema.json file. The easiest way is to run:
 *
 * ```sh
 * npm run generate-schema-jsons --prefix=tools/builders/ngconf-app-builder
 * ```
 *
 * from the root of the ngconf-app workspace.
 */
mergeAndWriteSchemaJSON({
  dir: __dirname,
  requireBase: '@angular-devkit/build-angular/src/browser/schema.json',
  additionalSchema: {}
});
