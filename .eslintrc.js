module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
    },
    extends: [
      'airbnb-base',
      'airbnb-typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      "project": ["tsconfig.json"]
    },
    plugins: [
      '@typescript-eslint',
      'jsdoc',
    ],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-shadow': 'off',
      'react/jsx-filename-extension': [0],
      '@typescript-eslint/no-shadow': 'error',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
    },
  };