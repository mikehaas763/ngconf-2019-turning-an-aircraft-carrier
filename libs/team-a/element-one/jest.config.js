module.exports = {
  name: 'team-a-element-one',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/team-a/element-one',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
