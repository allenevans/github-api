module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  resetMocks: true,
  restoreMocks: true,
  testMatch: [
    '**/?(*.)spec.ts',
  ],
  testPathIgnorePatterns: [
    'dist/',
    'node_modules/',
  ],
  testURL: 'http://localhost/',
  verbose: true,
};
