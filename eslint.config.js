// const eslintConfigLove = require('eslint-config-love');
//
// module.exports = [
//     {
//       ...eslintConfigLove,
//       files: [ 'src/**/*.ts' ]
//     }
//   ]

module.exports = (async function config() {
    const { default: eslintConfigLove } = await import('eslint-config-love')

    return [
        {
            ...eslintConfigLove,
            files: [ '**/*.ts' ],
            rules: {
                '@typescript-eslint/no-unsafe-assignment': 'off'
            }
        },
    ]
})()