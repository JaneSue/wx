// pages/index/index.js
import {
    Pagination
} from '../../../mixins/pagination';
import * as api from '../../../services/data';

let { pagination } = new Pagination([{
    namespace: 'scheme',
    request: api.getItemRank,
    loop: 3,
    loading: false
}]);

Page({
    mixins: [pagination],
    data: {
        tabIndex: 0,
        items: [{
            label: '可使用',
            type: 1,
        }, {
            label: '已使用',
            type: 2,
        }, {
            label: '失效',
            type: 3,
        }],
    },
    cacheItems: [true, true, true],
    onLoad(options) {
        this.options = options;
        let { index = 0 } = options;
        this.setData({
            tabIndex: index
        }, ()=>{
            this.tabBarChange({
                detail: {
                    index
                }
            })
        })  
    },
    onPullDownRefresh() {
        const { tabIndex: index } = this.data;
        this.pagination({
            namespace: 'scheme',
            loading: '加载中...',
            index
        })
    },
    reachBottom() {
        const { tabIndex: index } = this.data;
        this.pagination({
            namespace: 'scheme',
            loading: '加载中...',
            method: 'append',
            index
        })
    },
    tabBarChange(e) {
        const {
            index
        } = e.detail;
        const first = this.cacheItems[index];
        if (first){
            this.pagination({
                namespace: 'scheme',
                index,
                form: {}
            }).then((res) => {
                this.cacheItems[index] = false
                this.setData({
                    tabIndex: index,
                })
            }, () => { })
        }else{
            this.setData({
                tabIndex: index
            })
        }
    }
})