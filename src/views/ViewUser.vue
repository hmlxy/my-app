<template>
    <div class="user">
        <el-dialog
            :title="isAdd === true ? '新增用户' : '编辑用户'"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="dialogBeforeClose"
        >
            <el-form
                :model="form"
                ref="form"
                :rules="rules"
                label-width="80px"
                :inline="true"
                size="normal"
            >
                <el-form-item label="姓名" prop="name">
                    <el-input
                        v-model="form.name"
                        placeholder="请输入姓名"
                    ></el-input>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                    <el-input
                        v-model="form.age"
                        placeholder="请输入年龄"
                    ></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="请选择出生日期"
                        value-format="yyyy-MM-DD"
                    ></el-date-picker>
                </el-form-item>

                <el-form-item label="地址" prop="addr">
                    <el-input
                        v-model="form.addr"
                        placeholder="请输入地址"
                    ></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button @click="dialogBeforeClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>

        <div class="user-header">
            <el-button type="primary" @click="handleAdd">+ 新增</el-button>
            <!-- form搜索区域 -->
            <el-form :inline="true" ref="formSearch" :model="userForm">
                <el-form-item>
                    <el-input
                        v-model="userForm.name"
                        placeholder="请输入姓名"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        icon="el-icon-search"
                        type="primary"
                        @click="onSearche"
                        >查询</el-button
                    >
                </el-form-item>
            </el-form>
        </div>

        <div class="common-table">
            <el-table :data="tableData" height="90%" style="width: 100%">
                <el-table-column prop="name" label="姓名" width="100%">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="100%">
                    <!-- 作用域插槽用于父组件访问子组件，这里用于访问行的数据 -->
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="100%">
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址"> </el-table-column>

                <el-table-column
                    header-align="center"
                    align="center"
                    prop="prop"
                    label="操作"
                >
                    <!-- 作用域插槽用于父组件访问子组件，这里用于访问行的数据 -->
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="small"
                            @click="handleEdit(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            type="danger"
                            size="small"
                            @click="handleDelete(scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handlePage"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser, addUser, editUser, deleteUser } from "@/api";

export default {
    data() {
        return {
            dialogVisible: false, //关闭弹窗
            isAdd: true, //判断新增还是编辑
            form: {
                name: "",
                age: "",
                sex: "",
                birth: "",
                addr: "",
            },
            rules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                ],
                age: [
                    { required: true, message: "请输入年龄", trigger: "blur" },
                ],
                sex: [
                    { required: true, message: "请选择性别", trigger: "blur" },
                ],
                birth: [
                    {
                        required: true,
                        message: "请选择出生日期",
                        trigger: "blur",
                    },
                ],
                addr: [
                    { required: true, message: "请输入地址", trigger: "blur" },
                ],
            },
            tableData: [],
            total: 0, //当前的数据总条数
            pageData: {
                page: 1,
                limit: 10,
            },
            userForm: {
                name: "",
            },
        };
    },

    mounted() {
        this.getList();
    },
    methods: {
        // 关闭弹窗前重置之前填写的表单数据
        dialogBeforeClose() {
            // 清理之前的form数据
            this.$refs.form.resetFields();
            // 关闭弹窗
            this.dialogVisible = false;
        },
        //提交用户表单
        submit() {
            this.$refs.form.validate((valid) => {
                // 验证成功
                if (valid) {
                    // 判断是新增还是编辑
                    if (this.isAdd === true) {
                        addUser(this.form).then(() => {
                            // 新增用户后更新用户列表
                            this.getList();
                        });
                    } else {
                        editUser(this.form).then(() => {
                            // 新增用户后更新用户列表
                            this.getList();
                        });
                    }

                    // 后续对表单数据的处理
                    console.log("提交的formData:", this.form);

                    // 关闭弹窗
                    this.dialogVisible = false;

                    // 清理之前的form数据
                    this.$refs.form.resetFields();
                }
            });
        },

        // 编辑
        handleEdit(row) {
            this.isAdd = false;
            this.dialogVisible = true;
            // 回写数据,不能直接传入row
            // 对当前row的数据进行深拷贝
            // 深拷贝也就是完全独立的副本，修改数据不会影响源数据
            this.form = JSON.parse(JSON.stringify(row));
        },

        // 删除
        handleDelete(row) {
            {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        deleteUser({ id: row.id }).then(() => {
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            // 删除后更新列表
                            this.getList();
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            }
        },

        // 打开新增窗口
        handleAdd() {
            this.isAdd = true;
            this.dialogVisible = true;
        },

        // 获取列表数据
        getList() {
            // 获取列表数据
            getUser({ params: { ...this.userForm, ...this.pageData } }).then(
                ({ data }) => {
                    console.log("data:", data);
                    this.tableData = data.list;
                    console.log("tableData:", this.tableData);
                    this.total = data.count ? data.count : 0;
                }
            );
        },

        // 点击页面切换
        handlePage(val) {
            console.log(val);
            // 传递选择的页码
            this.pageData.page = val;
            // 调用更新列表数据
            this.getList();
        },

        // 列表查询
        onSearche() {
            this.getList();
        },
    },
};
</script>

<style lang="less" scoped>
.user {
    height: 95%;
    .user-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-form-item {
            margin: 0;
        }
    }
    .common-table {
        position: relative;
        margin-top: 20px;
        height: 90%;
        .pagination {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>
