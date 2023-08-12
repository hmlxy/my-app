<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <NavMenu></NavMenu>
      </el-aside>
      <el-container direction="vertical">
        <el-header>
          <NavHeader></NavHeader>
        </el-header>
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
import NavMenu from "@/components/CommonNavAside.vue";
import NavHeader from "@/components/CommonNavHeader.vue";

export default {
  data() {
    return {
      msg: "hello",
    };
  },
  components: {
    NavMenu,
    NavHeader,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
