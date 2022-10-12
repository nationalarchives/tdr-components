// jest-puppeteer.config.js
module.exports = {
  headless: false,
  server: {
    command: 'node_modules/.bin/ts-node app/start.ts',
    port: 3000,
  },
}
