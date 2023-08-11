import Vue from "vue";
import App from "./App.vue";

import "element-ui/lib/theme-chalk/index.css";
// 全局注册
import ElementUI from "element-ui";
Vue.use(ElementUI);

// 按需引入
// import {Button,Row,Container} from 'element-ui';
// Vue.use(Button);
// Vue.use(Row);
// Vue.use(Container);

// 因为router文件下有index.js文件，所以会自动寻址
import router from './router';



Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
