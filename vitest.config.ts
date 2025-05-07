import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      reporters: ['default', 'junit'],
      coverage: {
        provider: 'v8', // istanbul or 'v8'
        // --- Adicione esta linha para especificar os formatos dos relatórios ---
        reporter: ['text', 'lcov', 'json', 'html']
      },
      outputFile: {
        junit: './junit.xml' // <-- Define que o reporter 'junit' deve salvar em './junit.xml' (na raiz)
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
