<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  displayProp: boolean
}>()

const emit = defineEmits<{
  (e: 'closeModal', exibir: boolean): void
  (e: 'confirmeModal'): void
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
  if (props.displayProp) modal.show()
})
watch(
  () => props.displayProp,
  (exibir) => {
    if (exibir) {
      modal.show()
    } else {
      modal.hide()
    }
  }
)
function close() {
  emit('closeModal', false)
}
function confirme() {
  emit('confirmeModal')
  emit('closeModal', false)
}
defineExpose({
  close,
  confirme
})
</script>
<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modalRef">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="modal-title" class="modal-title">Modal title</h5>
          <button
            id="modal-btn-close-header"
            type="button"
            class="btn-close"
            @click="close()"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" id="modal-body">Woo-hoo, you're reading this text in a modal!</div>
        <div class="modal-footer">
          <button id="modal-btn-close" type="button" class="btn btn-secondary" @click="close()">
            Close
          </button>
          <button id="modal-btn-confirme" type="button" class="btn btn-primary" @click="confirme()">
            Save changes
          </button>
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
