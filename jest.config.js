module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/lib/"],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/lib/",
    "<rootDir>/src/index.ts",
  ],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageThreshold: {
    global: { branches: 100, statements: 100, functions: 100, lines: 100 },
  },
};
