import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginJest from 'eslint-plugin-jest';
import pluginCypress from 'eslint-plugin-cypress';

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest, cy: true },
    },
    plugins: {
      'eslint-plugin-jest': pluginJest,
      'eslint-plugin-cypress': pluginCypress,
    },
  },
  pluginJs.configs.recommended,
];
