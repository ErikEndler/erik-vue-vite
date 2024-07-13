//  [
//   'plugin:vue/vue3-essential',
//   'eslint:recommended',
//   '@vue/eslint-config-typescript',
//   '@vue/eslint-config-prettier/skip-formatting'
// ],
import js from '@eslint/js'
import vue3Essential from 'plugin:vue/vue3-essential'
import vueEslitTypescipt from '@vue/eslint-config-typescript'
import x from '@vue/eslint-config-prettier/skip-formatting'

export default [
  js.configs.recommended,
  vue3Essential,
  vueEslitTypescipt,
  x,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.tsx', '**/*.vue'],
    ignorePatterns: ['temp.js', 'config/*', '.gitignore'],
    languageOptions: {
      ecmaVersion: 'latest',
      ignores: ['/dist']
    }
  }
]
