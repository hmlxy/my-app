import Vue from 'vue';
import Vuex from 'vuex';
import tab from './tab';

// 全局注册Vuex
Vue.use(Vuex)

// 创建vuex实例
export default new Vuex.Store({
    modules: {
        tab
    }
})