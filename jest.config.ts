const config = {
  preset: "",
  projects: [
    {
      displayName: 'JavaScript component tests',
      testMatch: [
        '**/components/*/template.test.ts'
      ],
      transform: {
        "^.+\\.ts?$": "ts-jest"
      },
      testEnvironment: "jsdom"
    },
    {
      displayName: 'JavaScript component tests',
      setupFilesAfterEnv: [require.resolve('expect-puppeteer')],
      testMatch: [
        '**/components/*/*.test.ts',
        '!**/(*.)?template.test.ts',
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
