import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@ionic/vue/css/core.css';

createApp(App)
  .use(router)
  .mount('#app');
