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
            <span class="left-bread"> 首页 </span>
        </div>

        <div class="nav-right">
            <el-dropdown placement="bottom">
                <span class="el-dropdown-link">
                    <img class="head-img" src="@/assets/images/me.jpg" alt="" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        handleMenu(){
            this.$store.commit('collapseMenu')
        }
    }
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
        .left-bread {
            margin-left: 20px;
            font-size: 14px;
            color: #fff;
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
