import Mock from 'mockjs';

import homeApi from './mockServerData/home'

// 定义mcok请求拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData)