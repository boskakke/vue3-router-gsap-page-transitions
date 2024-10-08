import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
   scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
      }
    } 
     return new Promise((resolve, reject) => {
      setTimeout(() => {      
        resolve({ left: 0, top: 0 })
      }, 750)
    })
  },
  linkActiveClass: 'font-bold',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/page/',
      name: 'page',
      component: () => import('../views/PageView.vue')
    },
    
  
  ]
})

export default router

