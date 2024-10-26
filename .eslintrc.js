const path = require('path');

module.exports = {
  env: {
    es2021: true,
    jest: true,
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    // project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'warn',
    'react/display-name': 'off',
    'no-empty-pattern': 'off',
    'jsx-quotes': 'off',
    'react/no-unstable-nested-components': 'off',
    'no-empty': 'off',
    'import/no-named-as-default': 'off',
    'react/jsx-key': 'off',
    'prettier/prettier': [
      'warn',
      {
        bracketSpacing: true,
        jsxBracketSameLine: true,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        arrowParens: 'avoid',
        tabWidth: 2,
        semi: true,
        endOfLine: 'auto',
        useTabs: false,
        jsxSingleQuote: true,
      },
    ],
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react` related packages come first.
          ['^react', '^@\\w', '^\\w'],
          // Internal packages.
          [
            '^components',
            '^screens',
            '^store',
            '^theme',
            '^navigation',
            '^hooks',
            '^constant',
            '^domain',
            '^data',
            '^util',
          ],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Side effect imports.
          ['^\\u0000'],
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname)],
        extensions: ['.ts', '.tsx'],
      },
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
  ignorePatterns: [
    '.eslintrc.js',
    'babel.config.js',
    '.prettierrc.js',
    'index.js',
    'ReactotronConfig.js',
    'metro.config.js',
    'jest.config.js',
    'node_modules/',
    'prettier.config.js',
    'react-native-config.js',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
  ],
}
