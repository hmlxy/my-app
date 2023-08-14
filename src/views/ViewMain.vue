<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <CommonNavAside></CommonNavAside>
            </el-aside>
            <el-container direction="vertical">
                <el-header>
                    <CommonNavHeader></CommonNavHeader>
                </el-header>

                <!-- 标签组件 -->
                <CommonTag></CommonTag>

                <el-main>
                    <!-- 路由出口 -->
                    <!-- 路由匹配到的组件将渲染在这里 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonNavAside from "@/components/CommonNavAside.vue";
import CommonNavHeader from "@/components/CommonNavHeader.vue";
import CommonTag from "@/components/CommonTag.vue";

export default {
    data() {
        return {
            msg: "hello",
        };
    },
    components: {
        CommonNavAside,
        CommonNavHeader,
        CommonTag,
    },
};
</script>

<style lang="less" scoped>
.el-header {
    padding: 0;
}

.el-main {
    padding: 0 20px;
}
</style>
