import { createRouter, createWebHistory } from '@ionic/vue-router';

import Home from '../pages/Home.vue';
import HeartScan from '../pages/HeartScan.vue';
import Analysis from '../pages/Analysis.vue';
import Session from '../pages/Session.vue';
import History from '../pages/History.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/scan', component: HeartScan },
  { path: '/analysis', component: Analysis },
  { path: '/session', component: Session },
  { path: '/history', component: History }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
