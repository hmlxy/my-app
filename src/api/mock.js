import Mock from "mockjs";

import homeApi from "./mockServerData/home";

import userApi from "./mockServerData/user";

// 定义mcok请求拦截
Mock.mock("/api/home/getData", homeApi.getStatisticalData);

// 定义用户列表的数据
// 新增用户
Mock.mock("/api/user/add", "post", userApi.createUser);
// 编辑用户
Mock.mock("/api/user/edit", "post", userApi.updateUser);
// 删除用户
Mock.mock("/api/user/delete", "post", userApi.deleteUser);
// 用户列表
// 这里使用正则表达式匹配url的开头，因为带上参数后难以匹配
Mock.mock(/api\/user\/getUser/, "get", userApi.getUserList);
