/**
 * only works in sub-routing now. 
 * manual input path will induce 404
 */
const permitted = {
    path:'/work',
    name:'work',
    component:() => import('../views/WorkSupervise/index.vue'), //import on-demand
    meta:{
      requiresAuth:true,
      key:'WORK SUPERVISION',
    }
  }
  export default permitted;