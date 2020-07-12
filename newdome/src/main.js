// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './theme/index.css'
import './assets/css/style.scss'
import store from './vuex/store.js'
import authority from '././common/js/authority';
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'token') {

    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);

        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal);
  }
}


var timer
window.onresize = function () {
  clearTimeout(timer)
  timer = setTimeout(rem, 100)

}
rem();

function rem() {
  let html = document.documentElement;
  let wW = html.clientWidth; // 窗口宽度
  let whdef = 140 / 1920; // 表示1920的设计图,使用120PX的默认值
  let rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
  // html.style.fontSize = wW >= 1366 ? rem + 'px' : '98px';
  html.style.fontSize = rem + 'px'
  document.body.style.fontSize = '20px';
}
