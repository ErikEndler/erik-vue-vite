import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './i18n'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import './assets/styles/app.scss'

// import './assets/main.css'

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(createPinia())

app.mount('#app')
