/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  // Your existing ts-jest preset
  preset: 'ts-jest',

  // '<rootDir>' refers to the project's root directory (where package.json is)
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // Adjust path if needed
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
