module.exports = {
  name: 'ngconf-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngconf-app/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
