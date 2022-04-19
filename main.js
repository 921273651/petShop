
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//导入网络请求的包
//导入成员$http
import {$http} from '@escook/request-miniprogram'
//将$http挂载到uni对象身上，作为自定义属性而存在
//可以通过uni.$http发起网络请求

uni.$http =$http;

//请求的根路径
$http.baseUrl='https://www.uinav.com'


//请求拦截器
$http.beforeRequest=function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
}
//响应拦截器
$http.beforeRequest = function (options) {
  // do somethimg...
  uni.hideLoading()
}
//封装弹框的方法
uni.$showMsg =function(title='数据请求失败',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
  
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif