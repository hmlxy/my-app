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

new Vue({
    router, //挂载vue-router实例
    store, //挂载vuex实例
    render: (h) => h(App),
}).$mount("#app");
