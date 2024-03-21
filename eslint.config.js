import pluginNext from '@next/eslint-plugin-next'
import nnecec from '@nnecec/eslint-config'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...nnecec({
    react: true,
    tailwindcss: true,
    typescript: true,
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['apps/website/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs['core-web-vitals'].rules,
    },
    settings: {
      next: {
        rootDir: ['apps/*/'],
      },
    },
  },
  {
    files: ['apps/**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/node_modules/**', '**/out/**', '**/.next/**'],
    settings: {
      tailwindcss: {
        config: './apps/website/tailwind.config.ts',
      },
    },
  },
]
