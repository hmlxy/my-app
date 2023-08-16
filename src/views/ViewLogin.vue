<template>
    <div class="login">
        <el-form
            class="login-form"
            :model="form"
            ref="form"
            :rules="rules"
            label-width="80px"
            :inline="false"
            size="normal"
            @keyup.enter.native="onSubmit"
        >
            <h3>系统登录</h3>
            <el-form-item label="用户名称" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
                <el-input
                    type="password"
                    v-model="form.password"
                    show-password
                ></el-input>
            </el-form-item>

            <el-button @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form>
    </div>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名称",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入用户密码",
                        trigger: "blur",
                    },
                ],
            },
        };
    },

    methods: {
        // 取消登录
        onCancel() {
            // 清除填写的信息
        },
        // 确认登录
        onSubmit() {
            // 校验通过后调用接口
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({ data }) => {
                        console.log(data);
                        // 判断登录用户权限
                        if (data.code === 20000) {
                            // 将token信息存入cookie，用于不同页面间的通信
                            // cookie用于存储信息token，用于判断页面是否存在token
                            Cookie.set("token", data.data.token);

                            // 获取菜单路由的数据,存入store
                            // 注册动态路由数据
                            this.$store.commit("setMenu", data.data.menu);
                            this.$store.commit("registerMenu", this.$router);

                            // 跳转到首页
                            this.$router.push("/home");
                        } else {
                            this.$message.error(
                                data.data.message,
                                "用户名或者密码错误"
                            );
                        }
                    });
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.login {
    .login-form {
        margin: 100px auto;
        padding: 40px;
        width: 350px;
        border: 1px solid rgb(220, 215, 215);
        border-radius: 10%;
        box-shadow: 1px 1px 6px rgb(196, 195, 195);
        text-align: center;
        h3 {
            margin-bottom: 30px;
        }
    }
}
</style>
