import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config.js'
import customReporter from 'vitest-sonar-reporter'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      reporters: ['default', new customReporter()],
      coverage: {
        provider: 'v8', // istanbul or 'v8'
        reporter: ['text', 'lcov', 'json', 'html']
      },
      outputFile: {
        'vitest-sonar-reporter': './sonar-report.xml'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import']
        }
      }
    }
  })
)
