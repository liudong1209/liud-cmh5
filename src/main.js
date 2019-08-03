// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import fastclick from 'fastclick'
import { fetchGet, fetchPost,multipartPost,getNoProgress} from './api/axiosconf'
Vue.prototype.$get = fetchGet
Vue.prototype.$post = fetchPost
Vue.prototype.$multipartPost = multipartPost
Vue.prototype.$getNoProgress = getNoProgress
import vueTouch from 'kim-vue-touch'
import mandMobile from 'mand-mobile'
import 'normalize.css'
import 'mand-mobile/lib/mand-mobile.css'
import '../static/css/mandMobile.css' //全局修改mand-mobile样式
import global_ from  './globle/globle'
Vue.prototype.GLOBAL=global_;
Vue.use(mandMobile)
fastclick.attach(document.body); 
//将axios挂载到原型上
//Vue.prototype.$axios = axios;
//bus全局事件中心
Vue.prototype.bus=new Vue();
Vue.use(vueTouch)
Vue.config.productionTip = false;


//路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (store.getters.tokenString) { // 判断缓存里面是否有 userId  //在注册时设置它的值
      next();
    } else {
      next({
        path: '/register',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
