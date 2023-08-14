<template>
    <div class="tags">
        <el-tag
            v-for="(item, index) in tags"
            class="tag-item"
            :key="item.label"
            size="small"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            :closable="item.name !== 'home'"
            @click="changeMenu(item)"
            @close="handleClost(item, index)"
            >{{ item.label }}</el-tag
        >
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "CommonTag",
    data() {
        return {};
    },
    computed: {
        ...mapState({
            tags: (state) => state.tab.tabList,
        }),
    },
    methods: {
        // 解构获得store中的数据
        ...mapMutations(["closeTag"]),
        // 点击tag跳转的功能
        changeMenu(item) {
            // 判断路径防止相同路由跳转报错
            if (
                item.path !== this.$route.path &&
                !(this.$route.path === "/home" && item.path === "/")
            ) {
                this.$router.push({ path: item.path });
            }
        },

        // 先删除后跳转
        handleClost(item, index) {
            // 修改的store的closeTag.也就是删除tag
            this.closeTag(item);
            // 获取tabList的长度,是修改后的数据
            // 所以恰好不用减1就是删除前的长度
            const length = this.tags.length;
            // 删除的不是当前选中的tag
            if (item.name !== this.$route.name) {
                return;
            }
            // 删除的是当前选中的项
            else {
                // 删除的是最后一项
                if (index === length) {
                    this.$router.push({
                        name: this.tags[index - 1].name,
                    });
                }
                // 删除的是中间项,跳转到最后一项
                else {
                    this.$router.push({
                        name: this.tags[index].name,
                    });
                }
            }
        },
    },
};
</script>

<style lang="less" scoped>
.tags {
    padding: 10px;
    .tag-item {
        margin: 0 5px;
        cursor: pointer;
    }
}
</style>
