import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['**/*.ts'],
  },
  {
    ignores: ['dist', 'node_modules', 'db', 'migrations', '**/*.js'],
  },

  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  prettierPluginRecommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'warn',
    },
  },
];