import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import HomeView from '../views/HomeView/index.vue'
import Login from '../views/LoginFunc/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children:[ //sub-routing
        {
          path:'/',
          name:'home',
          component:HomeView
        },
        {
          path:'/project',
          name:'project',
          component:() => import('../views/ProjectInfo/index.vue') //import on-demand
        },
        {
          path:'/tunnel',
          name:'tunnel',
          component:() => import('../views/TunneInfo/index.vue') //import on-demand
        },
        {
          path:'/work',
          name:'work',
          component:() => import('../views/WorkSupervise/index.vue') //import on-demand
        },
        {
          path:'/quality',
          name:'quality',
          component:() => import('../views/QualityControl/index.vue') //import on-demand
        },
        {
          path:'/geoprocast',
          name:'geoprocast',
          component:() => import('../views/GeoProcast/index.vue') //import on-demand
        },
        {
          path:'/system',
          name:'system',
          component:() => import('../views/SystemReport/index.vue') //import on-demand
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})

export default router
