// pages/tabbar/3/index.js
import tabbar from '../../../mixins/tabbar';

Page({
    mixins: [tabbar],
    data: {},
    onLoad() {

    },
    onShow() {
    },
    re() {
        wx.reLaunch({
            url: '/pages/tabbar/2/index'
        })
    }
}) 