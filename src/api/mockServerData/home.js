// mock数据模拟

import Mock from "mockjs";

// 图表数据
let List = [];
export default {
    getStatisticalData: () => {
        // Mock.Random>float 产生随机数100到8000
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    apple: Mock.Random.float(100, 8000, 0, 0),
                    huawei: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                })
            );
        }
        return {
            code: 20000,
            data: {
                // 饼状图
                videoData: [
                    {
                        name: "apple",
                        value: 5694,
                    },
                    {
                        name: "huawei",
                        value: 2458,
                    },
                    {
                        name: "vivo",
                        value: 1542,
                    },
                    {
                        name: "oppo",
                        value: 689,
                    },
                ],
                // 柱状图
                userData: [
                    {
                        date: "周一",
                        new: 4,
                        active: 200,
                    },
                    {
                        date: "周二",
                        new: 12,
                        active: 456,
                    },
                    {
                        date: "周三",
                        new: 45,
                        active: 755,
                    },
                    {
                        date: "周四",
                        new: 78,
                        active: 123,
                    },
                    {
                        date: "周五",
                        new: 36,
                        active: 456,
                    },
                    {
                        date: "周六",
                        new: 19,
                        active: 785,
                    },
                    {
                        date: "周日",
                        new: 67,
                        active: 456,
                    },
                ],
                // 折线图
                orderData: {
                    date: [
                        "20230801",
                        "20230802",
                        "20230803",
                        "20230804",
                        "20230805",
                        "20230806",
                        "20230807",
                    ],
                    data: List,
                },
                tableData: [
                    {
                        name: "oppo",
                        todayBuy: 100,
                        monthBuy: 200,
                        totalBuy: 500,
                    },
                    {
                        name: "vivo",
                        todayBuy: 200,
                        monthBuy: 400,
                        totalBuy: 600,
                    },
                    {
                        name: "huawei",
                        todayBuy: 1000,
                        monthBuy: 2000,
                        totalBuy: 5000,
                    },
                    {
                        name: "apple",
                        todayBuy: 1000,
                        monthBuy: 2000,
                        totalBuy: 7000,
                    },
                ],
            },
        };
    },
};
