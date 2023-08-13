export default {
    state: {
        isCollapse: false, //用于折叠aside菜单
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "ViewHome/ViewHome",
            },
        ], //面包屑
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
    },
};
