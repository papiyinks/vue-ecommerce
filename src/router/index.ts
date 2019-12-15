import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/products',
    name: 'products',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Products.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Register.vue'),
  },
  {
    path: '/verify',
    name: 'verify',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Verify.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
  },
  {
    path: '/new',
    name: 'NewProduct',
    component: () => import(/* webpackChunkName: "about" */ '../views/New.vue'),
    beforeEnter(to: any, from: any, next: any) {
      if (store.state.idToken) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/edit/:id',
    name: 'EditProduct',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Edit.vue'),
    beforeEnter(to: any, from: any, next: any) {
      if (store.state.idToken) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Checkout.vue'),
    beforeEnter(to: any, from: any, next: any) {
      if (store.state.idToken) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/order',
    name: 'order',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Order.vue'),
    beforeEnter(to: any, from: any, next: any) {
      if (store.state.idToken) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/product/:id',
    name: 'ShowProduct',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Show.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
