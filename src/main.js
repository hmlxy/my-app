import Vue from "vue";
import App from "./App.vue";

import "element-ui/lib/theme-chalk/index.css";
// 全局引入element
import ElementUI from "element-ui";
Vue.use(ElementUI);

// 按需引入element
// import {Button,Row,Container} from 'element-ui';
// Vue.use(Button);
// Vue.use(Row);
// Vue.use(Container);

// 因为router文件下有index.js文件，所以会自动寻址index.js中的内容
import router from "./router";

import store from "./store";
import "./api/mock";

Vue.config.productionTip = false;

import Cookie from "js-cookie";

// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
    // 判断token的存在
    const token = Cookie.get("token");
    if (!token && to.name !== "login") {
        // 说明当前用户没有登录，并且不在登录页面
        // 那么自动跳转登录页面
        next({ name: "login" });
    } else if (token && to.name === "login") {
        // token存在说明用户已经登录,如果去到login页面
        // 那么自动跳转首页
        next({ name: "home" });
    } else {
        next();
    }
});

new Vue({
    router, //挂载vue-router实例
    store, //挂载vuex实例
    render: (h) => h(App),

    // 刷新网页会重新加载vue实例
    // 这意味着如果在登录才会执行的操作一旦刷新就没有了
    // 所以这里直接在生命周期函数里定义动态路由的获取与传递
    created() {
        store.commit("registerMenu", router);
    },
}).$mount("#app");
