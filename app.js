import storage from './utils/storage';
import sram from './assets/lib/sram/sram.wx';
import mixins from './assets/lib/sram/mixins';

mixins();

App({
    global: {
        tabbar: [],
        tabbarConfigs: {
            isHide: true,
            selected: 0,
            color: "#999",
            selectedColor: "#000",
            list: [{
                "pagePath": "/pages/tabbar/0/index",
                "text": "首页",
                "iconPath": "/assets/images/home_grey.png",
                "selectedIconPath": "/assets/images/home_green.png"
            }, {
                "pagePath": "/pages/tabbar/1/index",
                "text": "订单",
                "iconPath": "/assets/images/order_grey.png",
                "selectedIconPath": "/assets/images/order_green.png"
            }, {
                "pagePath": "/pages/tabbar/2/index",
                "text": "帮助",
                "iconPath": "/assets/images/help_grey.png",
                "selectedIconPath": "/assets/images/help_green.png"
            }, {
                "pagePath": "/pages/tabbar/3/index",
                "text": "我的",
                "iconPath": "/assets/images/user_grey.png",
                "selectedIconPath": "/assets/images/user_green.png"
            }]
        }
    },
    onLaunch() {
        storage.set('user', {
            user_id: 2290,
            merch_id: 'ma_ff09c529d7632d24bbf0c85b9'  
        });
    },
    onShow() { 
        
    }
}) 