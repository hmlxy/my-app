<template>
    <div class="nav-header">
        <div class="nav-left">
          <!-- 按钮 -->
            <el-button
                type="plain"
                size="small"
                icon="el-icon-menu"
            ></el-button>
            <!-- 面包屑 -->
        </div>


        <div class="nav-right"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
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
}

.el-icon-menu {
    background-color: #fff;
}
</style>
