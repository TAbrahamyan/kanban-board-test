import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';
import NotFound from '@/components/NotFound.vue';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: { requiresAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  document.title = to.name;
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuth) {
      next();
    } else {
      next({ path: '/auth' });
    }
  } else {
    if (store.getters.isAuth) {
      next({ path: '/' });
    } else {
      next();
    }
  }
});

export default router;
