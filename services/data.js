import { code } from './api.request';

// 商品统计
export const getItemRank = function ({
    query = {},
    userInfo = {},
    loading = '正在加载...',
    errorToast = false
} = {}) {
    console.log(userInfo);
    return code.request({
        type: 'get',
        url: '/tongji/part-rank',
        query,
        errorToast,
        loading
    })
}

// 商品统计
export const getDefaultIndex = function ({
    query = {},
    userInfo = {},
    loading = '正在加载...',
    errorToast = false
} = {}) {
    return code.request({
        type: 'get',
        url: '/default/index',
        query,
        errorToast,
        loading
    })
}