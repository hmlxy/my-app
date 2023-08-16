<template>
    <div>
        <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <!-- 模板语法{{ 可以是是js表达式，真是高效 }} -->
            <h3>{{ isCollapse ? "后台" : "通用后台" }}</h3>
            <el-menu-item
                v-for="item in noChildren"
                :key="item.name"
                :index="item.name"
                @click="clickMenu(item)"
            >
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>

            <el-submenu
                v-for="item in hasChildren"
                :key="item.label"
                :index="item.label"
            >
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group
                    v-for="subItem in item.children"
                    :key="subItem.path"
                    :index="subItem.path"
                >
                    <el-menu-item
                        @click="clickMenu(subItem)"
                        :index="subItem.path"
                        >{{ subItem.label }}</el-menu-item
                    >
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
    data() {
        return {};
    },
    methods: {
        handleOpen(key, keyPath) {},
        handleClose(key, keyPath) {},
        clickMenu(item) {
            //   当页面路由与跳转路由不一致时才允许跳转
            if (
                this.$route.path !== item.path &&
                !(this.$route.path === "/home" && item.path === "/")
            ) {
                this.$router.push({ path: item.path }); //编程式导航，也就是更改要显示的路由，渲染不同的组件
            }

            // 调用selectMenu方法提交修改共同状态属性
            this.$store.commit("selectMenu", item);
        },
    },

    computed: {
        // 没有子菜单
        noChildren() {
            return this.menuData.filter((item) => !item.children);
        },
        // 有子菜单
        hasChildren() {
            return this.menuData.filter((item) => item.children);
        },
        // 从vuex的状态管理中获取isCollapse，从而实现另一个组件修改而这里改变的功能
        // this.$store.state获取所有store模块
        // tab.isCollapse获取tab模块里的定义在state中的属性isCollapse
        isCollapse() {
            return this.$store.state.tab.isCollapse;
        },

        menuData() {
            // 如果cookie缓存中没有,从当前的store获取
            return JSON.parse(Cookie.get("menu")) || this.$store.state.tab.menu;
        },
    },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;
    border-right: 0;
    h3 {
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        color: #fff;
    }
}
</style>
