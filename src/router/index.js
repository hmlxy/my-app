import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 引入组件
import ViewHome from "../views/ViewHome.vue";
import ViewUser from "../views/ViewUser.vue";
import ViewMain from "../views/ViewMain.vue";
import ViewMall from "../views/ViewMall.vue";
import ViewPageOne from "../views/ViewPageOne.vue";
import ViewPageTwo from "../views/ViewPageTwo.vue";

// 将路由和组件映射
const routes = [
  //主路由
  {
    path: "/",
    redirect: '/home',
    component: ViewMain,
    children: [
      { path: "home", component: ViewHome },//首页
      { path: "user", component: ViewUser },//用户管理
      { path: "mall", component: ViewMall },//商品管理
      { path: "page1", component: ViewPageOne },//页面1
      { path: "page2", component: ViewPageTwo },//页面2
    ]

  },
  

];

// 创建router实例，传入routes配置
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

// 暴露router实例，也就是导出,然后去main.js挂载

export default router;
