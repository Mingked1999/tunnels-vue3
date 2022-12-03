import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import HomeView from '../views/HomeView/index.vue'
import Login from '../views/LoginFunc/index.vue'
import { useLoginStore } from '../stores/loginStore'
import { useSliderStore } from '@/stores/sliderControl.js'

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
            requiresAuth:true,
            key:'HOME'
          }
        },
        {
          path:'/project',
          name:'project',
          component:() => import('../views/ProjectInfo/index.vue'), //import on-demand
          meta:{
            requiresAuth:true,
            key:'PROJECT INTRO',
          }
        },
        {
          path:'/tunnel',
          name:'tunnel',
          component:() => import('../views/TunneInfo/index.vue'), //import on-demand
          meta:{
            requiresAuth:true,
            key:'TUNNEL DESIGN',
          }
        },
        {
          path:'/quality',
          name:'quality',
          component:() => import('../views/QualityControl/index.vue'), //import on-demand
          meta:{
            requiresAuth:true,
            key:'QALITY CONRTROL',
          }
        },
        {
          path:'/geoprocast',
          name:'geoprocast',
          component:() => import('../views/GeoProcast/index.vue'), //import on-demand
          meta:{
            requiresAuth:true,
            key:'GEOLOGICAL PROCAST',
          }
        },
        {
          path:'/system',
          name:'system',
          component:() => import('../views/SystemReport/index.vue'), //import on-demand
          meta:{
            requiresAuth:true,
            key:'SYSTEM DETAILS',
          }
        },
        {
          path:'/profile',
          name:'profile',
          component:()=>import('../views/Profile/index.vue'),
          meta:{
            requiresAuth:true
          },
        },
        {
          name:'plan',
          path:'/plan',
          component: ()=>import('../views/WorkSupervise/PlanTest/index.vue'),
          meta:{
              requiresAuth:true,
              key:'PLAN TEST',
            },
        },
        {
            name:'section',
            path:'/section',
            component: ()=>import('../views/WorkSupervise/SectionTest/index.vue'),
            meta:{
                requiresAuth:true,
                key:'SECTION TEST',
              },
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/:pathMatch(.*)*',
      name:'notfound',
      component:()=>import('../views/NotFound/index.vue')
    },

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
router.afterEach((to,from)=>{
  localStorage.setItem('sliderKey',to.path) //set a localstorage key to store the current path
  if(to.meta.key){
    const sliderStore = useSliderStore();
    sliderStore.breadCrumb = to.meta.key
  }
})


export default router
