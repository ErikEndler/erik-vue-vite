<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  exibirProp: boolean
}>()

const emit = defineEmits<{
  (e: 'fecharModal', exibir: boolean): void
}>()

const modalRef = ref<HTMLElement | null>(null)
let modal: Modal
onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value, {
      backdrop: 'static',
      keyboard: false
    })
  }
  if (props.exibirProp) modal.show()
})

watch(
  () => props.exibirProp,
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
    <div class="modal-dialog modal-dialog-centered">
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
.modal {
  --bs-modal-bg: var(--Dark-blue);
  --bs-modal-footer-border-width: outset;
}
.btn-close {
  --bs-btn-close-color: var(--Pale-Blue);
}
.modal-header {
  --bs-modal-header-border-width: outset;
  background: var(--Violet);
}
/* .modal-body {
  background: var(--Dark-blue);
} */
</style>
