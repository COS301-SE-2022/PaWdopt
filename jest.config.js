import('ts-jest/dist/types').InitialOptionsTsJest;

const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: getJestProjects(),
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
};
