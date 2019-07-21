// import { goAuthorize } from '/services/authorize';
import util from '../../utils/util';

Component({
    properties: {},
    data: {},
    attached() {
        const { message, type } = this.this;
        this.setData({
            message: message || msg[type]
        })
    },
    methods: {
        goLogin() {
            // const { $actionId } = this.$page;
            // goAuthorize({
            //     type: `user:login:${$actionId}`,
            //     method: 'navigateBack'
            // }).then(() => { })
        },
        goHome() {
            wx.switchTab({ url: '/pages/index/index' })
        }
    }
})