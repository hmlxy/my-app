import Mock from "mockjs";

export default {
    getMenu: (config) => {
        const { username, password } = JSON.parse(config.body);
        // 先判断用户是否存
        // 判断账号和密码是否对应
        // 匹配1-16位的字符串
        const regex = /^.{1,16}$/;

        if (username === "admin" && password === "admin") {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "ViewHome.vue",
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "video-play",
                            url: "ViewMall.vue",
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "用户管理",
                            icon: "user",
                            url: "ViewUser.vue",
                        },
                        {
                            label: "更多",
                            icon: "location",
                            children: [
                                {
                                    path: "/page1",
                                    name: "page1",
                                    label: "页面1",
                                    icon: "setting",
                                    url: "ViewPageOne.vue",
                                },
                                {
                                    path: "/page2",
                                    name: "page2",
                                    label: "页面2",
                                    icon: "setting",
                                    url: "ViewPageTwo",
                                },
                            ],
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: "获取成功",
                },
            };
        } else if (regex.test(username) && password === "123456") {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "ViewHome.vue",
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "video-play",
                            url: "ViewMall.vue",
                        },
                    ],
                },
            };
        } else {
            return {
                code: -999,
                data: {
                    message: "密码或用户名错误",
                },
            };
        }
    },
};
