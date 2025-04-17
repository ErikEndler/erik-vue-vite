// src/stores/uiStore.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

// Use a sintaxe de "setup store" que é mais amigável ao TypeScript
export const useUiStore = defineStore('ui', () => {
  // --- State ---
  // Define o estado reativo com um tipo explícito e valor inicial
  const currentBackgroundClass = ref<string>('bg-default')

  // --- Actions ---
  // Define uma ação para modificar o estado, com tipo no parâmetro
  function setBackgroundClass(className: string): void {
    // Garante que temos um valor válido ou voltamos ao padrão
    currentBackgroundClass.value = className || 'bg-default'
    console.log(`[UI Store] Background class set to: ${currentBackgroundClass.value}`) // Para debug
  }

  // --- Getters (Opcional) ---
  // Exemplo de getter, se necessário
  // const isDefaultBackground = computed(() => currentBackgroundClass.value === 'bg-default')

  // Expõe o estado e as ações para serem usados pelos componentes
  return {
    currentBackgroundClass,
    setBackgroundClass
    // isDefaultBackground // Exponha getters se os tiver
  }
})

// Opcional: Definir um tipo para a store para facilitar o uso em componentes complexos
// export type UiStore = ReturnType<typeof useUiStore>;
