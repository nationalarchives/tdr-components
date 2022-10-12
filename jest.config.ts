import type {Config} from 'jest';

const config: Config = {
  displayName: 'JavaScript component tests',
  preset: "jest-puppeteer",
  globals: {page: true},
  testMatch: [
    '**/components/*/*.test.ts',
  ],
  testTimeout: 15000,
  transform: {
    "^.+\\.ts?$": "ts-jest"
  }
}

export default config
