import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  eslint.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        allowDefaultProject: ['*.js', '*.mjs'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
