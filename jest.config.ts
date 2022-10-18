const config = {
  verbose: true,
  projects: [
    {
      displayName: 'JavaScript component tests',
      testMatch: [
        '**/components/*/template.test.ts',
        '**/components/*/*unit.test.ts'
      ],
      transform: {
        "^.+\\.ts?$": "ts-jest"
      },
      testEnvironment: "jsdom"
    },
    {
      displayName: 'JavaScript puppeteer tests',
      setupFilesAfterEnv: [require.resolve('expect-puppeteer')],
      testMatch: [
        '**/components/*/*.test.ts',
        '!**/(*.)?template.test.ts',
        '!**/components/*/*unit.test.ts'
      ],
      preset: "jest-puppeteer",
      transform: {
        "^.+\\.ts?$": "ts-jest"
      },
      testTimeout: 15000
    }
  ],

}

export default config
