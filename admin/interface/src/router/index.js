import Vue from 'vue'
import VueRouter from 'vue-router'
import request from '../api/index'
let ifLogin = request.ifLogin
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import("../views/login")
  },
  {
    path: '/admin',
    component: ()=> import("../views/home"),
    beforeEnter: (to, from, next) => {
      ifLogin().then(res=>{
        if(!res.data.code===0){
          next("/")
        }else{
          next()
        }
      }).catch(()=>{
        next("/")
      })
    },
    children:[
      {
        path: '/',
        name: 'Home',
        component: ()=> import("../views/home/title"),
      },
      {
        path: 'articleAdd',
        name: 'ArticleAdd',
        component: ()=> import("../views/home/article/articleAdd"),
      },
      {
        path: 'articleDelet',
        name: 'articleDelet',
        component: ()=> import("../views/home/article/articledelet"),
      },
      {
        path: 'ManagementDelete',
        name: 'ManagementDelete',
        component: ()=> import("../views/home/Management/ManagementDelet"),
      },
      {
        path:'userPermission',
        name: 'userPermission',
        component: ()=> import("../views/home/user/userPermission"),
      },
      {
        path:'diaryAdd',
        name: 'diaryAdd',
        component: ()=> import("../views/home/diary/diaryAdd")
      },
      {
        path:'diaryDelet',
        name: 'diaryDelet',
        component: ()=> import("../views/home/diary/diaryDelet")
      },
      {
        path:'unionAdd',
        name: 'unionAdd',
        component: ()=> import("../views/home/union/unionAdd")
      },
      {
        path:'uniondelet',
        name: 'uniondelet',
        component: ()=> import("../views/home/union/unionDelet")
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
