import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/erik-vue-vite',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/erik-vue-vite/simple-form',
      name: 'SimpleForm',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "SimpleForm" */ '../views/SimpleForm.vue')
    },
    {
      path: '/erik-vue-vite/tip-calculator',
      name: 'TipCalculator',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "TipCalculator" */ '../views/TipCalculator.vue')
    },
    {
      path: '/erik-vue-vite/modals',
      name: 'Modals',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "ModalsView" */ '../views/ModalsView.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '/erik-vue-vite' }
  ]
})

export default router
