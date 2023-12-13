<script setup lang="ts">
import { ref, onMounted, watch, reactive, computed } from 'vue'
import { Modal } from 'bootstrap'
import TextInput from '@/components/TextInput.vue'

export interface ConfigModalForm {
  title?: string
  label?: string
  valueCustom?: number | string
  type?: string
  classInput?: string
  classLabel?: string
  classHeader?: string
  classModal?: string
}

interface Props {
  displayProp: boolean
  config?: ConfigModalForm
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({
    title: 'Title',
    label: 'Label custom',
    valueCustom: '',
    type: 'string',
    classInput: undefined,
    classLabel: undefined,
    classHeader: undefined,
    classModal: undefined
  })
})
const defaultConfig = {
  title: 'Title',
  label: 'Label custom',
  valueCustom: '',
  type: 'string',
  classInput: undefined,
  classLabel: undefined,
  classHeader: undefined,
  classModal: undefined
}

const innerConfig = computed(() => {
  return { ...defaultConfig, ...props.config }
})
const headerClass = computed(() => {
  if (innerConfig.value.classHeader) return innerConfig.value.classHeader
  return 'modal-header-default'
})
const modalClass = computed(() => {
  if (innerConfig.value.classModal) return innerConfig.value.classModal
  return 'modal-content-default'
})

const state = reactive({
  customValue: undefined as string | number | undefined
})

const emit = defineEmits<{
  (e: 'closeModal', exibir: boolean): void
  (e: 'confirmeModal', value: number | string | undefined): number
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
  if (props.config.valueCustom) state.customValue = props.config.valueCustom
  if (props.displayProp) {
    modal.show()
  }
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
watch(
  () => props.config.valueCustom,
  (valueCustomProp) => {
    if (valueCustomProp) state.customValue = valueCustomProp
  }
)

function close() {
  emit('closeModal', false)
}
function confirmar() {
  emit('confirmeModal', state.customValue)
  emit('closeModal', false)
}
</script>

<template>
  <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modalRef">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" :class="modalClass">
        <div class="modal-header" :class="headerClass">
          <h1 class="modal-title fs-5">{{ innerConfig?.title }}</h1>
          <button type="button" class="btn-close" @click="close()" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <TextInput
                v-model:value="state.customValue"
                nameProp="customModal"
                :type="innerConfig?.type"
                :label="innerConfig?.label!"
                placeholder="0"
                :class-input="innerConfig.classInput"
                :class-label="innerConfig.classLabel"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close()">Close</button>
          <button type="button" class="btn btn-custom btn-primary" @click="confirmar()">
            Confirme
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  --bs-modal-footer-border-width: outset;
}
.modal-header {
  --bs-modal-header-border-width: outset;
}
.modal-content-default {
  --bs-modal-bg: var(--Dark-blue);
}
.modal-header-default {
  background: var(--Violet);
}
</style>
