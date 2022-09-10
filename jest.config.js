module.exports = {
  transform: {
    '^.+\\.[jt]s$': 'ts-jest',
  },
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.(ts|js)'],
  coverageReporters: ['text'],
}
