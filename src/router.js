// 1. 引入vue和vue-router引入
import Vue from 'vue';
import VueRouter from 'vue-router';

import Signin from './components/Signin/Signin.vue';
import Home from './components/Home/Home.vue';

// 引入路由配置中所需要的组件
// 给每个路由规则中的组件实例(this)添加两个属性
// (this.$router)
// (this.$route)
Vue.use(VueRouter);

// 配置规则
const router = new VueRouter({
    routes: [
        {name: '404', path: '*', redirect: '/signin'},
        {name: 'signin', path: '/signin',component: Signin},//登录
        {name: 'hoem', path: '/home',component: Home},//登录
    ]
})

export default router;