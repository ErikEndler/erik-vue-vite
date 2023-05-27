<template>
  <div class="body w-100 p-5 center">
    <div class="row align-items-center teste">
      <div class="col align-self-center text-center">
        <h1><b>Learn to code by watching others</b></h1>
        <p>
          See how experienced developers solve problems in real-time. Watching scripted tutorials is
          great, but understanding how developers think is invaluable.
        </p>
      </div>
      <div class="col align-self-center text-center">
        <div class="card p-3">
          <Form @submit="onSubmit" :validation-schema="schema" @invalid-submit="onInvalidSubmit">
            <TextInput
              nameProp="name"
              type="text"
              :label="$t('simpleForm.fields.label.name')"
              :placeholder="$t('simpleForm.fields.placeholder.name')"
              :success-message="$t('simpleForm.fields.successMessage.name')"
            />
            <TextInput
              nameProp="email"
              type="email"
              :label="$t('simpleForm.fields.label.email')"
              :placeholder="$t('simpleForm.fields.placeholder.email')"
              :success-message="$t('simpleForm.fields.successMessage.email')"
            />
            <TextInput
              nameProp="password"
              type="password"
              :label="$t('simpleForm.fields.label.password')"
              :placeholder="$t('simpleForm.fields.placeholder.password')"
              :success-message="$t('simpleForm.fields.successMessage.password')"
            />
            <TextInput
              nameProp="confirm_password"
              type="password"
              :label="$t('simpleForm.fields.label.confirmPassword')"
              :placeholder="$t('simpleForm.fields.placeholder.confirmPassword')"
              :success-message="$t('simpleForm.fields.successMessage.confirmPassword')"
            />

            <button class="submit-btn" type="submit">Submit</button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { Form } from 'vee-validate'
import TextInput from '../components/TextInput.vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from 'yup'
import { watch } from 'vue'
import Tr from '@/i18n/translation'
import '@/i18n/rules/validators.ts' //F:\dev\erik-vue-vite\src\i18n\rules\validators.ts

const { t } = useI18n()

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2))
}

function onInvalidSubmit() {
  const submitBtn = document.querySelector('.submit-btn')
  submitBtn!.classList.add('invalid')
  setTimeout(() => {
    submitBtn!.classList.remove('invalid')
  }, 1000)
}

setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: 'field_invalid'
    //required:((msg)=>())
  },
  // use functions to generate an error object that includes the value from the schema
  string: {
    min: ({ min }) => t('simpleForm.fields.errorMessage.passwordMin', { min: min }),
    max: ({ max }) => ({ key: 'field_too_big', values: { max } })
  }
})

let schema = Yup.object().shape({
  name: Yup.string().required(() => t('simpleForm.fields.errorMessage.name')),
  email: Yup.string()
    .email()
    .required(() => t('simpleForm.fields.errorMessage.email')),
  password: Yup.string()
    .min(6)
    .required(() => t('simpleForm.fields.errorMessage.password')),
  confirm_password: Yup.string()
    .required(() => t('simpleForm.fields.errorMessage.confirmPassword'))
    .oneOf([Yup.ref('password')], () => t('simpleForm.fields.errorMessage.passwordNotMatch'))
})

// watch(
//   () => Tr.currentLocale,
//   () => {
//     console.log('Tr.currentLocale = ', Tr.currentLocale)
//     schema = Yup.object().shape({
//       name: Yup.string().required(() => t('simpleForm.fields.errorMessage.name')),
//       email: Yup.string()
//         .email()
//         .required(() => t('simpleForm.fields.errorMessage.email')),
//       password: Yup.string()
//         .min(6)
//         .required(() => t('simpleForm.fields.errorMessage.password')),
//       confirm_password: Yup.string()
//         .required(() => t('simpleForm.fields.errorMessage.confirmPassword'))
//         .oneOf([Yup.ref('password')])
//     })
//     console.log()
//   }
// )
</script>

<style scoped>
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
}

p {
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
}
.body {
  background-image: url('@/assets/images/bg-intro-desktop.png');
  /* Center and scale the image nicely */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-color: var(--Primary-Red);
  height: 100vh;
  width: 100vw;
}
.teste {
  width: 100%;
  height: 80%;
}
.center {
  display: grid;
  place-items: center;
}
h1 {
  color: white;
  font-weight: 700;
}
</style>
