import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',  // 路径
      name: 'login', // 名字
      component: () => import('./views/login/login.vue')  // 引入登录组件
    },
    {
      path: '/',  // 路径
      component: () => import('./views/index/index.vue'),  // 引入后端首页组件
      children: [
        {
          path: '',
          component: () => import('./views/home/home.vue')
        },

        {
          path: '/accountmanage',
          name: 'accountmanage',
          component: () => import('./views/accountmanage/accountmanage.vue')
        },

        {
          path: '/accountadd',
          name: 'accountadd',
          component: () => import('./views/accountadd/accountadd.vue')
        },

        {
          path: '/passwordmodify',
          name: 'passwordmodify',
          component: () => import('./views/passwordmodify/passwordmodify.vue')
        },
        {
          path: '/goodsmanage',
          component:()=>import('./views/goodsmanage/goodsmanage.vue')
        },
        {
          path:'/goodsadd',
          component:()=>import('./views/goodsadd/goodsadd.vue')
        },
        {
          path:'/salestatistics',
          component:()=>import('./views/salestatistics/salestatistics.vue')
        }
        
      ]
    }
  ]
})
