const eslintConfigLove = require('eslint-config-love');

module.exports = [
    {
      ...eslintConfigLove,
      files: [ 'src/**/*.ts' ]
    }
  ]
