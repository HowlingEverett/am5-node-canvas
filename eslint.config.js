const { tseslint } = require('@ftr/code-standards')

module.exports = tseslint.config(
  require('@ftr/code-standards/configs/eslint'),
  {
    ignores: ['**/coverage/', '**/dist/'],
  },
  {
    rules: {
      'security/detect-object-injection': 'off',
    },
  },
)
