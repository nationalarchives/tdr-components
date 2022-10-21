// jest-puppeteer.config.js
module.exports = {
  browserContext: 'incognito',
  launch: {
    headless: true,

  },
  server: {
    command: 'node_modules/.bin/ts-node app/start.ts',
    port: 3000,
  },
}
