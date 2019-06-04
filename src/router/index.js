import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import main from '@/components/main/main'
import enter from '@/components/main/page/enter/enter'
import business_controller from '@/components/main/page/business-controller/business_controller'
import error from '@/components/main/page/error/error'
import jurisdiction_controller from '@/components/main/page/jurisdiction-controller/jurisdiction_controller'
import log from '@/components/main/page/log/log'
import role_controller from '@/components/main/page/role-controller/role_controller'
import user_controller from '@/components/main/page/user-controller/user_controller'
import uploadFile_controller from '@/components/main/page/uploadFile-controller/uploadFile-controller'



Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      children:[
        {
          path: '/mian/enter',
          name: 'enter',
          component: enter
        },
        {
          path: '/mian/log',
          name: 'log',
          component: log
        },
        {
          path: '/mian/user_controller',
          name: 'user_controller',
          component: user_controller
        },
        {
          path: '/mian/role_controller',
          name: 'role_controller',
          component: role_controller
        },
        {
          path: '/mian/jurisdiction_controller',
          name: 'jurisdiction_controller',
          component: jurisdiction_controller
        },
        {
          path: '/mian/business_controller',
          name: 'business_controller',
          component: business_controller
        },
        {
          path: '/mian/error',
          name: 'error',
          component: error
        },
        {
          path: '/mian/uploadFile_controller',
          name: 'uploadFile_controller',
          component: uploadFile_controller
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
function getCookie(name) {
  var strcookie = document.cookie;//获取cookie字符串
  var arrcookie = strcookie.split("; ");//分割
  //遍历匹配
  for ( var i = 0; i < arrcookie.length; i++) {
  var arr = arrcookie[i].split("=");
  if (arr[0] == name){
     return arr[1];
  }
  }
  return false;
}
router.fromName  = null;　
router.beforeEach((to, from, next) => {
    router.fromName = from.name;
    if(to.name == 'login'){
      next();
    }else if(!getCookie('superAdminFlag')){
      next({name:'login'});
      return
    }
    if(getCookie('superAdminFlag')>1){
      next();
    }else{
      if(to.name == 'enter'){
        next();
      }else{
        next(false);
      }
    }
    next();
    

})

export {
  router
}