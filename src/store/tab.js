import Cookie from "js-cookie";
export default {
    state: {
        isCollapse: false, //用于折叠aside菜单
        //用于同步菜单栏面包屑的数据
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "ViewHome/ViewHome",
            },
        ],
        // 菜单路由数据
        menu: [],
    },
    // 定义修改方法
    mutations: {
        //用于折叠aside菜单
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            // 判断添加数据是否为首页
            if (val.name !== "home") {
                const index = state.tabList.findIndex(
                    (item) => item.name === val.name
                );
                //如果不存在
                if (index === -1) {
                    state.tabList.push(val);
                }
            }
        },
        // 点击关闭tag
        closeTag(state, item) {
            // 获取当前数据在tabList的索引
            const index = state.tabList.findIndex(
                (val) => val.name === item.name
            );
            state.tabList.splice(index, 1);
        },
        // 设置menu的数据
        setMenu(state, val) {
            state.menu = val;
            // 因为刷新后store就没有了,所以需要使用cookie储存
            Cookie.set("menu", JSON.stringify(val));
        },

        // 动态注册路由,动态添加路由
        registerMenu(state, router) {
            // 判断我们当前缓存是否存在路由数据
            if (!Cookie.get("menu")) return;
            // 如果存在cookie就更新数据并获取
            const menu = JSON.parse(Cookie.get("menu"));
            state.menu = menu;
            console.log("menu数据:", menu);
            // 组装动态路由数据
            const menuArray = [];
            menu.forEach((item) => {
                // 判断是否有子菜单
                if (item.children) {
                    item.children = item.children.map((item) => {
                        // 动态导入组件作为路由的绑定组件
                        item.component = () => import(`../views/${item.url}`);
                        return item;
                    });
                    menuArray.push(...item.children);
                } else {
                    // 动态导入组件作为路由的绑定组件
                    item.component = () => import(`../views/${item.url}`);
                    menuArray.push(item);
                }

                // 路由的动态添加,
                menuArray.forEach((item) => {
                    // 将item路由动态添加到主路由中，Main是主路由的name属性
                    router.addRoute("Main", item);
                });
            });
        },
    },
};
