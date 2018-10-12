import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router.js';
import axios from 'axios';
import NProgress from 'nprogress';

// CSS
import './assets/css/index.css';
import 'font-awesome/css/font-awesome.css';
import 'animate.css';
import 'nprogress/nprogress.css';
import 'element-ui/lib/theme-chalk/index.css';

// 更改配置
NProgress.configure({
    showSpinner: false // 关闭小圆圈
});

// 请求拦截器
axios.interceptors.request.use(config => {
    NProgress.start();
    // config.withCredentials = true;
    // config.headers['Content-Type'] = "application/x-www-form-urlencoded";
    // config.headers['Content-Type'] = "application/form-data";
    // console.log('有请求发出了');
    return config;
});

//响应拦截器
axios.interceptors.response.use(res => {
    NProgress.done();
    return res; //得返回响应,不然收不到响应
});

// 给vue的每一个组件的实例添加添加属性, axios
Vue.use(function (Vue) {
    Vue.prototype.$axios = axios;
});

// 拖拽指令
Vue.directive('drag', {
    bind: function (el, binding) { //第一次绑定到元素时调用，进行一次性的初始化设置
        el.onmousedown = function (evt) {
            let l = evt.clientX - el.offsetLeft;
            let t = evt.clientY - el.offsetTop;
            el.style.cursor = "move";
            document.onmousemove = function (evt) {
                let left = evt.clientX - l;
                let top = evt.clientY - t;

                // 定界
                let elW = el.clientWidth;
                let elH = el.clientHeight;
                let parentW = el.parentNode.clientWidth;
                let parentH = el.parentNode.clientHeight;
                if (left <= 0) left = 0;
                if (top <= 0) top = 0;
                if (left + elW >= parentW) left = parentW - elW;
                if (top + elH >= parentH) top = parentH - elH;

                el.style.left = left + 'px';
                el.style.top = top + 'px';
            };

            el.onmouseup = function (evt) {
                document.onmousemove = null;
                el.onmouseup = null;
                el.style.cursor = "auto";
            }
        }
    },
    inserted: function (el, binding) { //当被绑定的元素插入到 DOM 中时
        // console.log('inserted');
    },
    update: function (el, binding) { //组件的 VNode 更新时调用
        // console.log('update');
    },
    componentUpdated: function (el, binding) { //指令所在组件的 VNode 及其子VNode全部更新后调用。
        // console.log('componentUpdated');
    },
    unbind: function (el, binding) { //只调用一次，指令与元素解绑时调用。
        // console.log('unbind');
    }
});

// 注册组件
Vue.use(ElementUI);

const vm = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
console.log('sssss');

if (module.hot) {
    module.hot.accept()
}