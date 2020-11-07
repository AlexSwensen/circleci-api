module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverageFrom: ["src/**/*.{ts, tsx}"],
  reporters: ["default", "jest-junit"],
};
