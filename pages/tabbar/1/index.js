// pages/tabbar/1/index.js
import tabbar from '../../../mixins/tabbar';

Page({
    mixins: [tabbar],
    onLoad() {
        console.log(this)
    },
    onShow() {
    }
})