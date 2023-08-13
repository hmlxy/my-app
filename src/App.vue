<template>
    <div id="app">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {
            msg: "hello",
        };
    },
};
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /* margin-top: 60px; */
}

html,
body,
h3,
p {
    margin: 0;
    padding: 0;
}
</style>
