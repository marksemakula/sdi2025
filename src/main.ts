import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';
import { createHead } from '@unhead/vue/client';
import router from './router';
import App from './App.vue';
import './index.css';

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(pinia);
app.use(router);
app.use(MotionPlugin);
app.use(head);

app.mount('#root');
