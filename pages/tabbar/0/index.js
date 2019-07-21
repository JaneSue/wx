// pages/tabbar/0/index.js
import tabbar from '../../../mixins/tabbar';

Page({
    mixins: [tabbar],
    onLoad() {
        getApp().global.tabbarConfigs.list[0].text = 0;
    }
})