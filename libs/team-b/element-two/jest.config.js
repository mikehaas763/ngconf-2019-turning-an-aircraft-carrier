module.exports = {
  name: 'team-b-element-two',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/team-b/element-two',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
