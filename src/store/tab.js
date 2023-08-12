export default {
    state: {
        isCollapse: false //用于折叠aside菜单
    },
    // 定义修改方法
    mutations: {
        collapseMenu(state) {
            state.isCollapse =! state.isCollapse
        }
    }
}