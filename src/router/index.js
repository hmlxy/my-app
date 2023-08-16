// 导入
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 引入组件
import ViewMain from "../views/ViewMain.vue";
import ViewLogin from "../views/ViewLogin.vue";
// 将路由和组件映射,也就是定义路由配置
// 每个路由应当映射一个组件
const routes = [
    //主路由
    {
        // 路由的实际添加应当是动态路由
        path: "/",
        name: "Main",
        redirect: "/home", //导航时重定向到/home，也就是说初始时是渲染ViewMain
        component: ViewMain,

        // 子路由
        children: [],
    },

    // 定义登录路由
    {
        path: "/login",
        name: "login",
        component: ViewLogin,
    },
];

// 创建router实例，传入routes配置
const router = new VueRouter({
    routes, // (缩写) 相当于 routes: routes
});

// 暴露router实例，也就是导出,然后去main.js挂载到根vue实例上
export default router;
