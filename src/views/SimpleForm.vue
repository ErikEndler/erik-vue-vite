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
              name="name"
              type="text"
              label="Full Name"
              placeholder="Your Name"
              success-message="Nice to meet you!"
            />
            <TextInput
              name="email"
              type="email"
              label="E-mail"
              placeholder="Your email address"
              success-message="Got it, we won't spam you!"
            />
            <TextInput
              name="password"
              type="password"
              label="Password"
              placeholder="Your password"
              success-message="Nice and secure!"
            />
            <TextInput
              name="confirm_password"
              type="password"
              label="Confirm Password"
              placeholder="Type it again"
              success-message="Glad you remembered it!"
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

const schema = Yup.object().shape({
  name: Yup.string().required('Name'),
  email: Yup.string().email().required('Email'),
  password: Yup.string().min(6).required('Password'),
  confirm_password: Yup.string()
    .required('Confirm Password')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
})
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
