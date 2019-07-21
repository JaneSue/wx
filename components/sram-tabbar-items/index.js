// components/sram-loading/index.js
Component({
    options: {
        multipleSlots: true,
        styleIsolation: 'apply-shared'
    },
    properties: {
        items: Object,
        idx: {
            type: [String, Number],
            value: 0
        },
        position: {
            type: Object,
            value: {
                top: 0,
            }
        }
    },
    methods: {
        tabbarHandle(e) {
            const { index, type } = e.currentTarget.dataset;
            this.setData({ idx: index }, () => {
                this.triggerEvent('change', { index, type }, {})
            })
        }
    }
})
