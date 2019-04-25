const { writeFileSync } = require('fs');
const { join } = require('path');
const { merge } = require('lodash');

/**
 * All of our custom builders are slight extensions of default Angular CLI ones. We nevertheless need
 * to provide full JSON schemas when definiing them and registering them with the angular.json, as JSON
 * does not have an extension/inheritance mechanism built in.
 *
 * In order to mitigate the risk of us getting out of date with the underlying JSON schemas in the future,
 * this simple utility allows us to merge the default Angular CLI one with our modifications and write it to disk.
 */
module.exports = function mergeAndWriteSchemaJSON({ dir, requireBase, additionalSchema }) {
  const originalJSON = require(requireBase);
  const merged = merge(originalJSON, additionalSchema);
  const writePath = join(dir, './auto-generated-schema.json');
  writeFileSync(writePath, JSON.stringify(merged, null, 2), 'utf-8');
  console.log('');
  console.log(`Successfully wrote updated auto-generated-schema.json to: ${writePath}`);
  console.log('');
};
