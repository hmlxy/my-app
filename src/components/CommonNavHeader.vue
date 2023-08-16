<template>
    <div class="nav-header">
        <div class="nav-left">
            <!-- 按钮 -->
            <el-button
                type="plain"
                size="small"
                icon="el-icon-menu"
                @click="handleMenu"
            ></el-button>
            <!-- 面包屑 -->
            <div class="left-bread">
                <!-- 对于to为null时，就不跳转了 -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                        v-for="item in tags"
                        :key="item.path"
                        :to="shouldNavigate(item) ? { path: item.path } : null"
                        >{{ item.label }}</el-breadcrumb-item
                    >
                </el-breadcrumb>
            </div>
        </div>

        <div class="nav-right">
            <el-dropdown
                trigger="click"
                placement="bottom"
                @command="handleClick"
            >
                <span class="el-dropdown-link">
                    <img class="head-img" src="@/assets/images/me.jpg" alt="" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
    data() {
        return {
            path: " ",
        };
    },
    methods: {
        handleMenu() {
            // this.$store.commit执行mutations中的collapseMenu方法
            this.$store.commit("collapseMenu");
        },
        // 如果不是跳转相同路径，并且不是从/home跳转到/,就返回真值
        shouldNavigate(item) {
            if (
                this.$route.path !== item.path &&
                !(this.$route.path === "/home" && item.path === "/")
            ) {
                return true;
            }
        },
        // 登出
        handleClick(command) {
            if (command === "logout") {
                // 清除cookie中的数据
                Cookie.remove("token");
                Cookie.remove("menu");
                // 跳转到登录页面
                this.$router.push("login");
            }
        },
    },
    computed: {
        ...mapState({
            tags: (state) => state.tab.tabList,
        }),
    },
};
</script>

<style lang="less" scoped>
.nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: #333;
    .nav-left {
        display: flex;
        align-items: center;
        .left-bread {
            margin-left: 20px;
            font-size: 14px;
            color: #fff;

            // /deep/.el-breadcrumb__item {
            //     .el-breadcrumb__inner {
            //         &.is-link {
            //             color: #c3c2c2;
            //         }
            //     }
            // }
            /deep/.el-breadcrumb__inner {
                color: #c3c2c2;
                cursor: pointer;
            }
        }
    }

    .nav-right {
        margin-right: 20px;
        .head-img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>
