

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  testEnvironment: "jsdom",
  testMatch: [
    "**/components/*/template.test.ts",
    "**/components/*/*unit.test.ts",
    "!package/**",
  ],
  transform: {
    "^.+\\.ts?$": "babel-jest",
  },
  modulePathIgnorePatterns: ["<rootDir>/package"],
};

module.exports = config;
