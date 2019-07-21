// 对原生组件tabbar兼容
import _ from '../assets/lib/kissy-util/index';

function setTabBarItem(index, params = {}) {
    if (this.isExistTarBar()) {
        const tabBar = this.getTabBar();
        const tabBarItem = tabBar.data.list[index];
        tabBar.setData({
            [`list[${index}]`]: _.mix(tabBarItem, params)
        })
    } else {
        wx.setTabBarItem({
            index,
            ...params
        })
    }
}

function setTabBarStyle(params = {}) {
    const { list, ...more } = params;
    if (this.isExistTarBar()) {
        const tabBar = this.getTabBar();
        const { data } = tabBar;
        tabBar.setData({
            ..._.mix(data, more)
        })
    } else {
        wx.setTabBarStyle({
            ...more
        })
    }
}

function removeTarBarItem(index){
    if (this.isExistTarBar()) {
        const tabBar = this.getTabBar();
        const tabBarItem = tabBar.data.list[index];
        let list = [`list`];
        let value = [];
        if(typeof index !== 'undefined'){
            list = [`list${index}`];
            value = _.mix(tabBarItem, params)
        }
        tabBar.setData({
            [list]: value
        })
    } else {
        console.error('Native tabbar does not support deletion operations!')
    }
}

function isExistTarBar() {
    return typeof this.getTabBar === 'function' && this.getTabBar()
}

export default {
    onLoad(){
        const { tabbar } = getApp().global;
        console.log(this);
        tabbar.push({
            pageId: this.getTabBar().__wxExparserNodeId__,
            route: this.route,
            instance: this.getTabBar()
        });
        console.log(getApp().global.tabbar, 'load');
    },
    onShow() {
        if (this.isExistTarBar()) {
            const app = getApp();
            const { global: { tabbar, tabbarConfigs } } = app;
            tabbar.forEach((gtb, i)=>{
                const tb = this.getTabBar();
                if (gtb.pageId === tb.__wxExparserNodeId__) {
                    console.log(gtb.route.match(/\d/)[0], 'show', tabbarConfigs);
                    tb.setData({
                        ...tabbarConfigs,
                        selected: Number(gtb.route.match(/\d/)[0])
                    })
                }
            })
        }
    },
    onUnload() {
        if (this.isExistTarBar()) {
            const app = getApp();
            const { global: { tabbar } } = app;
            tabbar.forEach((gtb, i) => {
                const tb = this.getTabBar();
                if (gtb.pageId === tb.__wxWebviewId__) {
                    tabbar.splice(i, 1);
                }
            })
        }
    },
    setTabBarStyle,
    setTabBarItem,
    removeTarBarItem,
    isExistTarBar
}