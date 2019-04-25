const copy = require('copy');

console.log('Copy UMD bundles to ngconf-app dist...');

copy(
  'node_modules/@angular/*/bundles/*.umd.js',
  'dist/apps/ngconf-app/assets',
  {},
  _ => {}
);
copy(
  'node_modules/@ngrx/*/bundles/*.umd.js',
  'dist/apps/ngconf-app/assets',
  {},
  _ => {}
);
copy(
  'node_modules/rxjs/bundles/*.js',
  'dist/apps/ngconf-app/assets/rxjs',
  {},
  _ => {}
);
copy(
  'node_modules/zone.js/dist/*.js',
  'dist/apps/ngconf-app/assets/zone.js',
  {},
  _ => {}
);
copy(
  'node_modules/core-js/client/*.js',
  'dist/apps/ngconf-app/assets/core-js',
  {},
  _ => {}
);

console.log('Copy webcomponent polyfills ...');

copy(
  'node_modules/@webcomponents/**/*.js',
  'dist/apps/ngconf-app/assets',
  {},
  _ => {}
);
