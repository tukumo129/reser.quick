module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
  ],
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "react/react-in-jsx-scope": "off",
    "indent": ["error", 2],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
