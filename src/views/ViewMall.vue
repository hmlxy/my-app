<template>
    <div>
        <h1>我是Mall</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: "hello",
        };
    },
    components: {},
    mounted() {
        console.log("this is mall route", this.$route);
    },
};
</script>
