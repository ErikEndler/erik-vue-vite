import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const baseUrl = process.env.NODE_ENV === 'production' ? '/erik-vue-vite' : ''

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: baseUrl,
      name: 'Home',
      component: HomeView
    },
    {
      path: `${baseUrl}/simple-form`,
      name: 'SimpleForm',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "SimpleForm" */ '../views/SimpleForm.vue')
    },
    {
      path: `${baseUrl}/tip-calculator`,
      name: 'TipCalculator',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "TipCalculator" */ '../views/TipCalculator.vue')
    },
    {
      path: `${baseUrl}/modals`,
      name: 'Modals',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "ModalsView" */ '../views/ModalsView.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: baseUrl }
  ]
})

export default router
