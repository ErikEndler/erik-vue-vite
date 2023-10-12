<script setup lang="ts">
import { computed, toRef, watch } from 'vue'
import { useField } from 'vee-validate'
import Tr from '@/i18n/translation'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: [String, Number],
    default: null
  },
  nameProp: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  successMessage: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  classInput: {
    type: String,
    default: ''
  },
  classLabel: {
    type: String,
    default: ''
  },
  preventPaste: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:value'])

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'nameProp')
const propsLocal = toRef(props)

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  validate,
  handleChange,
  meta
} = useField(name, undefined, {
  initialValue: propsLocal.value.value
})
const computedValidate = computed(() => {
  return {
    blur: handleChange,
    change: [handleChange],
    input: [updateValue, handleChange],
    paste: colar
  }
})
function colar(event: Event) {
  if (props.preventPaste) {
    event.preventDefault()
  }
}
function updateValue(event: Event) {
  emit('update:value', (event.target as HTMLInputElement).value)
}
watch(
  () => Tr.currentLocale,
  () => {
    if (meta.validated) validate()
  }
)
</script>

<template>
  <div class="textInput" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label :class="classLabel" :for="name">{{ label }}</label>
    <input
      v-on="computedValidate"
      :class="classInput"
      :name="nameProp"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="help-message" v-if="errorMessage">
      {{ errorMessage }}
    </p>
    <p class="help-message" v-show="meta.valid">
      {{ successMessage }}
    </p>
  </div>
</template>

<style scoped>
.textInput {
  position: relative;
  margin-bottom: calc(1em * 1.5);
  width: 100%;
}

label {
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
  width: 100%;
}

input {
  font-weight: 700;
  border-radius: 5px;
  border: 2px solid gainsboro;
  padding: 15px 10px;
  outline: none;
  background-color: transparent;
  width: 100%;
  transition:
    border-color 0.3s ease-in-out,
    color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
}

input:focus {
  border-color: var(--Accent-Blue);
}
.help-message {
  font-weight: 700;
  /* position: absolute; */
  bottom: calc(-1.5 * 1em);
  text-align: left;
  left: 0;
  margin: 0;
  font-size: 14px;
}
.textInput.has-error {
  margin-bottom: calc(0.3em);
}
.textInput.has-error input {
  background-color: var(--error-bg-color);
  color: var(--Primary-Red);
}
.textInput.has-error input:focus {
  border-color: var(--Primary-Red);
}
.textInput.has-error .help-message {
  color: var(--Primary-Red);
}
.textInput.success {
  margin-bottom: calc(0.3em);
}
.textInput.success input {
  background-color: var(--success-bg-color);
  color: var(--success-color);
}
.textInput.success input:focus {
  border-color: var(--success-color);
}
.textInput.success .help-message {
  color: var(--success-color);
}
</style>
