<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: String,
    default: ''
  },
  name: {
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
  }
})

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name')

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<template>
  <div class="TextInput" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label :for="name">{{ label }}</label>
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />

    <p class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<style scoped>
.TextInput {
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
  transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
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

.TextInput.has-error {
  margin-bottom: calc(0.3em);
}

.TextInput.has-error input {
  background-color: var(--error-bg-color);
  color: var(--Primary-Red);
}

.TextInput.has-error input:focus {
  border-color: var(--Primary-Red);
}

.TextInput.has-error .help-message {
  color: var(--Primary-Red);
}

.TextInput.success {
  margin-bottom: calc(0.3em);
}
.TextInput.success input {
  background-color: var(--success-bg-color);
  color: var(--success-color);
}

.TextInput.success input:focus {
  border-color: var(--success-color);
}

.TextInput.success .help-message {
  color: var(--success-color);
}
</style>
