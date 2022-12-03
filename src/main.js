import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPersist from 'pinia-plugin-persist'
import elementIcon from './plugins/icon'
import echarts from './plugins/echarts'
import './assets/init.css'

const app = createApp(App)
const pinia = createPinia() //make pinia state persist, otherwise state will be lost when user refresh webpage
pinia.use(piniaPersist)
app.use(pinia)
app.use(elementIcon)
app.use(echarts)
app.use(router)
app.mount('#app')
