import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router';
import { globalState } from './globalState';
import primeVue from 'primevue/config';
import 'primevue/resources/themes/lara-dark-green/theme.css'

createApp(App).use(router).use(globalState).use(primeVue).mount('#app')
