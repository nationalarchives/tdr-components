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