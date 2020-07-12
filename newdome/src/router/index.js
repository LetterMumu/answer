import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: () => import('@/components/login')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/home'),
      children: [{
        path: '/productControl',
        name: 'productControl',
        component: () => import('@/components/productControl')
      }, {
        path: '/answerList',
        name: 'answerList',
        component: () => import('@/components/answerList')
      }, {
        path: '/userControl',
        name: 'userControl',
        component: () => import('@/components/userControl')
      }, {
        path: '/tryEditing',
        name: 'tryEditing',
        component: () => import('@/components/tryEditing')
      }, {
        path: '/answerSheet',
        name: 'answerSheet',
        component: () => import('@/components/answerSheet')
      },{
        path: '/collectTab',
        name:'collectTab',
        component: () => import('@/components/collectTab')
      },{
        path: '/readControl',
        name:'readControl',
        component: () => import('@/components/readControl')
      },{
        path: '/readOver',
        name: 'readOver',
        component: () => import('@/components/readOver')
      },{
        path: '/scorePage',
        name: 'scorePage',
        component: () => import('@/components/scorePage')
      },{
        path: '/showSwerSheet',
        name: 'showSwerSheet',
        component: () => import('@/components/showSwerSheet')
      },{
        path: '/addStudent',
        name: 'addStudent',
        component: () => import('@/components/addStudent')
      },{
        path: '/invigilate',
        name: 'invigilate',
        component: () => import('@/components/invigilate')
      }]
    }

  ]
})
