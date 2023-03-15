const config = {
  verbose: false,
  projects: [
    {
      displayName: "JavaScript component tests",
      testMatch: [
        "**/components/*/template.test.ts",
        "**/components/*/*unit.test.ts",
        "!package/**",
      ],
      transform: {
        "^.+\\.ts?$": "ts-jest",
      },
      testEnvironment: "jsdom",
      modulePathIgnorePatterns: ["<rootDir>/package"],
    },
  ],
};
export default config;
