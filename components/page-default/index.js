const msg = {
    'coupon-receive': '暂无可领取优惠券!',
    'collect': '暂无任何收藏!',
    'article': '暂无任何新闻公告!',
    'order': '目前暂无订单!',
    'adresss': '目前暂无收货地址!'
}

Component({
    properties: { },
    data: { },
    attached() {
        const { message, type } = this.this;
        this.setData({
            message: message || msg[type]
        })
    },
    methods: {
        goHome() {
            wx.switchTab({ url: '/pages/index/index' })
        }
    }
})