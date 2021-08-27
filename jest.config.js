module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/lib/"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/lib/"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageThreshold: {
    global: { branches: 95, statements: 95, functions: 95, lines: 95 },
  },
};
