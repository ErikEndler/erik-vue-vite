<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  exibir: boolean
}>()

const emit = defineEmits<{
  (e: 'fecharModal', exibir: boolean): void
}>()

const modalRef = ref<HTMLElement | null>(null)
let modal: Modal
onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value)
  }
  if (props.exibir) modal.show()
})

watch(
  () => props.exibir,
  (exibir) => {
    if (exibir) {
      modal.show()
    } else {
      modal.hide()
    }
  }
)

function close() {
  emit('fecharModal', false)
}
</script>

<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" @click="close()" aria-label="Close"></button>
        </div>
        <div class="modal-body">Woo-hoo, you're reading this text in a modal!</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close()">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-title {
  color: var(--background-dark-3);
}
.modal-body {
  color: var(--background-dark-3);
}
</style>
