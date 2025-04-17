<script setup lang="ts">
import * as Yup from 'yup'
import { Form } from 'vee-validate'
import TextInput from '@/components/TextInput.vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from 'yup'
import '@/i18n/rules/validators'
import { reactive, toRef, onMounted } from 'vue'
import services from '@/services'
import type { SimpleForm } from '@/types/Interfaces'
import ListSimpleForm from '@/components/ListSimpleForm.vue'
import { useUiStore } from '@/stores/uiStore' // Importe o hook da store

const uiStore = useUiStore()

const pageBackgroundClass = 'bg-simple-form'

const { t } = useI18n()

const invalid = toRef('')

const state = reactive({ simpleForm: {} as SimpleForm, list: [] as SimpleForm[] })

// Quando o componente for montado, atualize o estado na store
onMounted(() => {
  uiStore.setBackgroundClass(pageBackgroundClass)
})

function onSubmit() {
  services.simpleForm.save(state.simpleForm)
  alert(JSON.stringify(state.simpleForm, null, 2))
}

async function listSimpleForms() {
  const { data, errors } = await services.simpleForm.findAll()
  if (errors) {
    alert(errors.message)
  }
  if (data) {
    state.list = data
  }
}

function onInvalidSubmit() {
  invalid.value = 'invalid'
  setTimeout(() => {
    invalid.value = ''
  }, 1000)
}

setLocale({
  string: {
    min: ({ min }) => t('simpleForm.fields.errorMessage.passwordMin', { min: min })
    //max: ({ max }) => ({ key: 'field_too_big', values: { max } })
  }
})

const schema = Yup.object().shape({
  name: Yup.string().required(() => t('simpleForm.fields.errorMessage.name')),
  email: Yup.string()
    .email(() => t('simpleForm.fields.errorMessage.email'))
    .required(() => t('simpleForm.fields.errorMessage.emailRequired')),
  password: Yup.string()
    .min(6)
    .required(() => t('simpleForm.fields.errorMessage.password')),
  confirmPassword: Yup.string()
    .required(() => t('simpleForm.fields.errorMessage.confirmPassword'))
    .oneOf([Yup.ref('password')], () => t('simpleForm.fields.errorMessage.passwordNotMatch'))
})
defineExpose({ onInvalidSubmit, onSubmit, schema })
</script>
<template>
  <div class="body w-100 p-5 center">
    <div class="row align-items-center teste">
      <div class="col align-self-center text-center info">
        <h1>
          <b>{{ $t('simpleForm.title') }}</b>
        </h1>
        <p>
          {{ $t('simpleForm.description') }}
        </p>
      </div>
      <div class="col align-self-center text-center form">
        <div class="card p-3">
          <Form
            @submit="(value) => onSubmit()"
            :validation-schema="schema"
            @invalid-submit="onInvalidSubmit()"
          >
            <TextInput
              v-model:value="state.simpleForm.fullName"
              id="nameInput"
              nameProp="name"
              type="text"
              :label="$t('simpleForm.fields.label.name')"
              :placeholder="$t('simpleForm.fields.placeholder.name')"
              :success-message="$t('simpleForm.fields.successMessage.name')"
            />
            <TextInput
              v-model:value="state.simpleForm.email"
              id="emailInput"
              nameProp="email"
              type="email"
              :label="$t('simpleForm.fields.label.email')"
              :placeholder="$t('simpleForm.fields.placeholder.email')"
              :success-message="$t('simpleForm.fields.successMessage.email')"
            />
            <TextInput
              v-model:value="state.simpleForm.passWord"
              id="passwordInput"
              nameProp="password"
              type="password"
              :label="$t('simpleForm.fields.label.password')"
              :placeholder="$t('simpleForm.fields.placeholder.password')"
              :success-message="$t('simpleForm.fields.successMessage.password')"
            />
            <TextInput
              v-model:value="state.simpleForm.confirmPassword"
              id="confirmPasswordInput"
              nameProp="confirmPassword"
              type="password"
              :label="$t('simpleForm.fields.label.confirmPassword')"
              :placeholder="$t('simpleForm.fields.placeholder.confirmPassword')"
              :success-message="$t('simpleForm.fields.successMessage.confirmPassword')"
            />

            <button id="submitBtn" :class="invalid" class="submit-btn" type="submit">Submit</button>
          </Form>
          <button id="listBtn" class="submit-btn" @click="listSimpleForms">List</button>
          <ListSimpleForm :list="state.list" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  justify-content: center;
}
.info {
  min-width: 400px;
  max-width: 650px;
}
.form {
  min-width: 460px;
  max-width: 650px;
}
.submit-btn {
  background: var(--Primary-Green);
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 10px 15px;
  display: block;
  width: 100%;
  border-radius: 7px;
  margin-top: 40px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}
.submit-btn:hover {
  transform: scale(1.015);
}
.card {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 5px 7px 3px;
  background-color: var(--background-dark-3);
  color: var(--text-dark-1);
}

p {
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
}

.teste {
  gap: 2rem;
  width: 100%;
  height: 80%;
}
.center {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
h1 {
  color: white;
  font-weight: 700;
}
.submit-btn.invalid {
  animation: shake 0.5s;
  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }
  10% {
    transform: translate(-1px, -2px);
  }
  20% {
    transform: translate(-3px, 0px);
  }
  30% {
    transform: translate(3px, 2px);
  }
  40% {
    transform: translate(1px, -1px);
  }
  50% {
    transform: translate(-1px, 2px);
  }
  60% {
    transform: translate(-3px, 1px);
  }
  70% {
    transform: translate(3px, 1px);
  }
  80% {
    transform: translate(-1px, -1px);
  }
  90% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(1px, -2px);
  }
}
</style>
