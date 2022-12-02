import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import HomeView from '../views/HomeView/index.vue'
import Login from '../views/LoginFunc/index.vue'
import { useLoginStore } from '../stores/loginStore'

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
          component:HomeView,
          meta:{
            requiresAuth:true
          }
        },
        {
          path:'/project',
          name:'project',
          component:() => import('../views/ProjectInfo/index.vue'), //import on-demand
          meta:{
            requiresAuth:true
          }
        },
        {
          path:'/tunnel',
          name:'tunnel',
          component:() => import('../views/TunneInfo/index.vue'), //import on-demand
          meta:{
            requiresAuth:true
          }
        },
        {
          path:'/work',
          name:'work',
          component:() => import('../views/WorkSupervise/index.vue'), //import on-demand
          meta:{
            requiresAuth:true
          }
        },
        {
          path:'/quality',
          name:'quality',
          component:() => import('../views/QualityControl/index.vue'), //import on-demand
          meta:{
            requiresAuth:true
          }
        },
        {
          path:'/geoprocast',
          name:'geoprocast',
          component:() => import('../views/GeoProcast/index.vue'), //import on-demand
          meta:{
            requiresAuth:true
          }
        },
        {
          path:'/system',
          name:'system',
          component:() => import('../views/SystemReport/index.vue'), //import on-demand
          meta:{
            requiresAuth:true
          }
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
/**
 * before jumping to a page, check if the user has logged in
 */
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){ //login required
    const loginStore = useLoginStore()
    if(!loginStore.token){
      next({
        path:'/login'
      })
    }else{
      next()
    }
  }else{
    next()
  }
})
export default router
