<template>
    <div>
        <el-row>
            <el-col :span="8" :offset="0" style="padding-right: 10px">
                <el-card class="card-user" shadow="hover">
                    <div class="user">
                        <img
                            class="user-img"
                            src="@/assets/images/me.jpg"
                            alt=""
                        />
                        <div class="user-info">
                            <p class="name">何茂林</p>
                            <p class="name-detail">超级管理员</p>
                        </div>
                    </div>

                    <div class="login-info">
                        <p>上次登录时间:<span>2023-08-12</span></p>
                        <p>上次登录地点:<span>浙江杭州</span></p>
                    </div>
                </el-card>

                <el-card class="card-mall" shadow="hover">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column
                            v-for="(val, key) in tableLabel"
                            :prop="key"
                            :label="val"
                            :key="key"
                        >
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>

            <el-col :span="16" :offset="0" style="padding-left: 10px">
                <div class="count">
                    <el-card
                        shadow="hover"
                        class="card-count"
                        :body-style="{ display: 'flex', padding: '0' }"
                        v-for="item in countData"
                        :key="item.name"
                    >
                        <i
                            class="icon"
                            :class="`el-icon-${item.icon}`"
                            :style="{ background: item.color }"
                        ></i>
                        <div class="count-info">
                            <p class="monney">￥{{ item.value }}</p>
                            <p class="name">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
                <!-- 折线图 -->
                <el-card shadow="hover" class="card-line">
                    <div ref="echartsLine" class="echartsLine"></div>
                </el-card>

                <div class="graph">
                    <!-- 柱状图 -->
                    <el-card shadow="hover" class="card-zhu">
                        <div class="echartsZhu" ref="echartsZhu"></div>
                    </el-card>
                    <!-- 饼状图 -->
                    <el-card shadow="hover" class="card-bin">
                        <div class="echartsBin" ref="echartsBin"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getData } from "@/api";
import * as echarts from "echarts";
export default {
    data() {
        return {
            tableData: [],
            tableLabel: {
                name: "课程",
                todayBuy: "日销售量",
                monthBuy: "月销售量",
                totalBuy: "总销售量",
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "green",
                },

                {
                    name: "今日未支付订单",
                    value: 213,
                    icon: "s-goods",
                    color: "red",
                },
                {
                    name: "今日收藏订单",
                    value: 645,
                    icon: "star-on",
                    color: "orange",
                },
                {
                    name: "本月支付订单",
                    value: 3648,
                    icon: "success",
                    color: "green",
                },

                {
                    name: "本月未支付订单",
                    value: 6983,
                    icon: "s-goods",
                    color: "red",
                },
                {
                    name: "本月收藏订单",
                    value: 3915,
                    icon: "star-on",
                    color: "orange",
                },
            ],
        };
    },
    mounted() {
        console.log("this is home route", this.$route);
        // 获取数据使用echarts渲染图例
        getData().then(({ data }) => {
            // 使用解构语法获取对象中特定的属性
            // 等价于const tableData = data.data.tableData;
            const { tableData } = data.data;

            // 将动态数据传给定义的tableData
            this.tableData = tableData;

            // 基于准备好的DOM，初始化echarts的实例
            const echartsLine = echarts.init(this.$refs.echartsLine);
            // // 指定图例的配置
            var opitonLine = {};
            // 处理数据xAxis
            const { orderData, userData, videoData } = data.data;
            // Object.keys()返回对象的所有可枚举属性
            const xAxis = Object.keys(orderData.data[0]);
            const xAxisData = {
                data: xAxis,
            };
            opitonLine.xAxis = xAxisData;
            opitonLine.yAxis = {};
            opitonLine.legend = xAxisData;
            opitonLine.series = [];
            xAxis.forEach((key) => {
                opitonLine.series.push({
                    name: key,
                    // map返回key对应的值组成的新数组
                    data: orderData.data.map((item) => item[key]),
                    type: "line",
                });
            });

            // 根据实例配置和数据显示图表
            echartsLine.setOption(opitonLine);

            // 柱状图的echarts实例
            const echartsZhu = echarts.init(this.$refs.echartsZhu);
            const optionZhu = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category",
                    data: userData.map((item) => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                },
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: "新增用户",
                        data: userData.map((item) => item.new),
                        type: "bar",
                    },
                    {
                        name: "活跃用户",
                        data: userData.map((item) => item.active),
                        type: "bar",
                    },
                ],
            };
            // 根据实例配置和数据显示图表
            echartsZhu.setOption(optionZhu);

            // 饼状图echarts实例化
            const echartsBin = echarts.init(this.$refs.echartsBin);
            const optionBin = {
                tooltip: {
                    trigger: "item",
                },
                color: ["green", "red", "orange", "blue"],
                series: [
                    {
                        data: videoData,
                        type: "pie",
                    },
                ],
            };

            // 使用配置和数据显示图例
            echartsBin.setOption(optionBin);
        });
    },
};
</script>

<style lang="less" scoped>
.el-card:hover {
    box-shadow: 0 2px 4px rgba(38, 36, 36, 0.399); /* 修改阴影深度的值 */
}
.card-user {
    .user {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #8d85856f;
        margin-bottom: 20px;
        .user-img {
            margin-right: 40px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        .user-info {
            .name {
                margin-bottom: 10px;
                font-size: 36px;
            }
            .name-detail {
                color: #8d85856f;
            }
        }
    }

    .login-info {
        p {
            padding: 5px 0;
            font-size: 16px;
            color: #8d85856f;
            span {
                margin-left: 50px;
                color: #000;
            }
        }
    }
}

.card-mall {
    margin-top: 94px;
}

.count {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .card-count {
        width: 30%;
        margin-bottom: 20px;
        .icon {
            width: 60px;
            height: 60px;
            text-align: center;
            font-size: 30px;
            line-height: 80px;
            color: #fff;
        }
        .count-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-left: 20px;
            .monney {
                font-size: 24px;
                line-height: 40px;
                color: orange;
            }
        }
    }
}

/deep/.card-line {
    height: 220px;
    .echartsLine {
        height: 200px;
    }
    .el-card__body {
        padding-top: 20px;
    }
}
.graph {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    // 对于没有标注data-v的标签需要使用deep穿透
    /deep/.el-card {
        height: 200px;
        width: 50%;
        padding: 0;
        .el-card__body {
            padding-top: 20px;
        }
    }
    .echartsZhu {
        height: 180px;
    }

    .echartsBin {
        height: 180px;
    }
}
</style>
