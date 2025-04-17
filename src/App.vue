<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

import { watch } from 'vue'
import { useUiStore } from '@/stores/uiStore'

const uiStore = useUiStore()

// Variável para rastrear a classe que foi aplicada anteriormente ao body.
// Isso é mais seguro do que confiar no argumento 'oldValue' do watch para manipulação do DOM.
let previouslyAppliedBgClass: string = ''

// Observa a propriedade 'currentBackgroundClass' da store
watch(
  () => uiStore.currentBackgroundClass, // A função getter para observar
  (newClass: string) => {
    // O handler quando o valor muda
    console.log(`[App.vue Watcher] Detected background change to: ${newClass}`)

    const bgClassToAdd = newClass || 'bg-default' // Garante que temos uma classe válida

    // Verifica se o body existe (boa prática)
    if (document.body) {
      // Remove a classe anterior *se* ela existir e *se* estiver no body
      if (previouslyAppliedBgClass && document.body.classList.contains(previouslyAppliedBgClass)) {
        document.body.classList.remove(previouslyAppliedBgClass)
        console.log(`[App.vue Watcher] Removed class: ${previouslyAppliedBgClass}`)
      }

      // Adiciona a nova classe *se* ela ainda não estiver presente
      if (!document.body.classList.contains(bgClassToAdd)) {
        document.body.classList.add(bgClassToAdd)
        console.log(`[App.vue Watcher] Added class: ${bgClassToAdd}`)
      }

      // Atualiza o rastreador com a classe que acabou de ser aplicada/garantida
      previouslyAppliedBgClass = bgClassToAdd
    }
  },
  {
    immediate: true // Executa o handler imediatamente na montagem inicial do App.vue
    // para definir o background padrão (ou o inicial da store)
  }
)
</script>

<template>
  <NavBar class="myHeader" />
  <RouterView class="myContent" />
</template>

<style>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
