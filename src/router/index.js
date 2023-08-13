// 导入
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
import CommonTest from "../components/CommonTest.vue";

import CommonNavAside from "@/components/CommonNavAside.vue";
import CommonNavHeader from "@/components/CommonNavHeader.vue";
// 将路由和组件映射,也就是定义路由配置
// 每个路由应当映射一个组件
const routes = [
    //主路由
    {
        path: "/",
        redirect: "/home", //导航时重定向到/home，也就是说初始时是渲染ViewMain
        // 定义路由视图
        components: {
            default: ViewMain,
        },

        // 子路由
        children: [
            // 这里的home表示相对于父路由的路由路径，而如果是/home就是绝对路径
            { path: "home", name: "home", component: ViewHome }, //首页
            { path: "user", name: "user", component: ViewUser }, //用户管理
            {
                path: "mall",
                name: "mall",
                // 定义相对于ViewMain的嵌套路由视图
                components: {
                    default: ViewMall,
                    test: CommonTest,
                },
            }, //商品管理
            { path: "page1", name: "page1", component: ViewPageOne }, //页面1
            { path: "page2", name: "page2", component: ViewPageTwo }, //页面2
        ],
    },
];

// 创建router实例，传入routes配置
const router = new VueRouter({
    routes, // (缩写) 相当于 routes: routes
});

// 暴露router实例，也就是导出,然后去main.js挂载到根vue实例上
export default router;
