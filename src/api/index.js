import http from "@/utils/request";

// 请求首页数据
export const getData = () => {
    // 返回一个promise对象
    return http.get("/home/getData");
};

// 请求用户数据
export const getUser = (params) => {
    console.log(params, "params");
    return http.get("/user/getUser", params);
};

// post新增用户
export const addUser = (data) => {
    return http.post("/user/add", data);
};

// post删除用户
export const deleteUser = (data) => {
    return http.post("/user/delete", data);
};

// post编辑用户
export const editUser = (data) => {
    return http.post("/user/edit", data);
};

// post登录接口
export const getMenu = (data) => {
    return http.post("/permission/getMenu", data);
};
