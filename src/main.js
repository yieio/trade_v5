import Vue from 'vue' 
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import pconf from './config/index'


Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.$conf = pconf


// let ajaxArr = []
// let loadingTime = null
// //ajax 请求的拦截器，用于显示全局的loadding
// 大部分的调用不需要全局modal形式的loadding
// 建议使用 this.$store.commit("setIsLoadding",true)
// this.$store.commit("setIsLoadding",false)
// 的方式直接控制loadding 的显示
// axios.interceptors.request.use(config => {
//   if(ajaxArr.length===0){
//     loadingTime = setTimeout(()=>{
//       store.commit("setIsLoadding",true);
//     },300);
//   }
//   ajaxArr.push('ajax');  
//   return config;
// });

// axios.interceptors.response.use(resp => {

//   if(ajaxArr.length===1){
//     if(loadingTime){
//       clearTimeout(loadingTime);
//       loadingTime = null;
//     }
//     store.commit("setIsLoadding",false);
//   }
//   ajaxArr.pop();
//   return resp;
// }); 

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')