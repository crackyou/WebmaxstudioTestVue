import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { createPinia } from "pinia";
import VueAxios from 'vue-axios'

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .use(router)
    .use(createPinia)
    .mount('#app')
