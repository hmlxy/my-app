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
export default {
    data() {
        return {
            menuData: [
                {
                    path: "/",
                    name: "home",
                    label: "首页",
                    icon: "s-home",
                    url: "ViewHome/ViewHome",
                },
                {
                    path: "/mall",
                    name: "mall",
                    label: "商品管理",
                    icon: "video-play",
                    url: "ViewMallManage/ViewMallManage",
                },
                {
                    path: "/user",
                    name: "user",
                    label: "用户管理",
                    icon: "user",
                    url: "ViewUserManage/ViewUserManage",
                },
                {
                    label: "其他",
                    icon: "location",
                    children: [
                        {
                            path: "/page1",
                            name: "page1",
                            label: "页面1",
                            icon: "setting",
                            url: "ViewOther/ViewPageOne",
                        },
                        {
                            path: "/page2",
                            name: "page2",
                            label: "页面2",
                            icon: "setting",
                            url: "ViewOther/ViewPageTwo",
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {
            console.log(item);
            //   当页面路由与跳转路由不一致时才允许跳转
            if (
                this.$route.path !== item.path &&
                !(this.$route.path === "/home" && item.path === "/")
            )
                this.$router.push(item.path);
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
        // 折叠的store.state共用
        isCollapse() {
            return this.$store.state.tab.isCollapse;
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
