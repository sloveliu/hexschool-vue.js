import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products')
  },
  {
    path: '/product/:id',
    name: '產品頁面',
    component: () => import('../views/Product.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
