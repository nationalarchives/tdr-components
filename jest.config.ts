const config = {
  verbose: false,
  projects: [
    {
      displayName: 'JavaScript component tests',
      testMatch: [
        '**/components/*/template.test.ts',
        '**/components/*/*unit.test.ts',
        '!package/**'
      ],
      transform: {
        "^.+\\.ts?$": "ts-jest"
      },
      testEnvironment: "jsdom",
      modulePathIgnorePatterns: ['<rootDir>/package']
    },
    {
      displayName: 'JavaScript puppeteer tests',
      setupFilesAfterEnv: [require.resolve('expect-puppeteer')],
      testMatch: [
        '**/components/*/*.test.ts',
        '!**/(*.)?template.test.ts',
        '!**/components/*/*unit.test.ts',
      ],
      modulePathIgnorePatterns: ['<rootDir>/package'],
      preset: "jest-puppeteer",
      transform: {
        "^.+\\.ts?$": "ts-jest"
      },
      testTimeout: 15000
    }
  ],

}
export default config
