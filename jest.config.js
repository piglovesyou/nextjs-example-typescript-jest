const { defaults: tsjPreset, process: tsjProcess } = require('ts-jest/presets');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    ...tsjPreset.transform,
    '\\.graphql$': [
      'graphql-let/jestTransformer',
      { subsequentTransformer: 'ts-jest' }
    ],
    "\\.graphqls$": "jest-transform-graphql",
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json'
    }
  }
};
