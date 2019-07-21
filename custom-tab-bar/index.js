const { tabbarConfigs } = getApp().global

Component({
    data: tabbarConfigs,
    attached() {
        
    },
    methods: {
        switchTab(e) {
            const {
                path: url,
                index: selected
            } = e.currentTarget.dataset;
            wx.switchTab({
                url
            })
        }
    }
})