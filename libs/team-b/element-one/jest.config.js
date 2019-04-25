module.exports = {
  name: 'team-b-element-one',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/team-b/element-one',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
