module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    "project": "./tsconfig.json",
    "warnOnUnsupportedTypeScriptVersion": false
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
