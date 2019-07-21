
import _ from '../assets/lib/kissy-util/index';

let pgid = 0;

class Pagination {
    constructor(options) {
        if (_.isObject(options)) {
            options = [options];
        }
        if (!_.isArray(options)) {
            throw new Error('Parameters must be object or array!');
        }
        this.options = options;
        this.pagination = this.__init(this);
    }
    __init(self) {
        let { options } = self;
        let dataResult = {};
        options.forEach((option, i) => {
            let { loop = 1, namespace = '' } = option;
            let namespaceRes = dataResult[namespace] = [];
            for (let i = 0; i < loop; i++) {
                namespaceRes.push({
                    item: [],
                    loading: false,
                    status: 'waiting',
                    error: null,
                    page: 1,
                    reach: false,
                    toast: 0
                })
            }
        })
        return {
            onLoad() {
                this.setData({
                    ...dataResult
                })
            },
            $$paginationId: ++pgid,
            pagination(params, done) {
                let { namespace, index = 0, ...moreParams } = params;
                let namespaceIdx = 0;
                if (typeof namespace === 'string') {
                    for (let i = 0; i < options.length; i++) {
                        let option = options[i];
                        if (option.namespace === namespace) {
                            namespaceIdx = i;
                            break;
                        }
                    }
                } else if (typeof namespace === 'number') {
                    namespaceIdx = namespace;
                    namespace = self.options[namespace].namespace;
                } else {
                    throw new Error('Parameters.namespace must be string or number!')
                }

                if (typeof namespace !== 'string' && this.data[namespace]) {
                    throw new Error(`pagination namespace \`this.data.${namespace}\` not exist!`, 'color:red');
                }
                params = _.mix({
                    ...self.options[namespaceIdx]
                }, moreParams);

                let { request, type = 'page', method, form = {}, ...more } = params;

                let {
                    [namespace]: namespaceData
                } = this.data;
                let prefix = `${namespace}[${index}]`;

                let {
                    item,
                    page: current,
                    reach
                } = namespaceData[index];

                if (method === 'append' && (typeof current !== 'undefined')) {
                    if (reach) return;
                    current++;
                } else {
                    current = 1;
                }
                this.setData({
                    [`${prefix}.loading`]: true,
                })
                return request({
                    query: _.mix({
                        page: current,
                        page_size: 10,
                    }, form),
                    ...more
                }).then((response) => {
                    let { status, data: { list, items, page_info } } = response;
                    list = list ? list : items;
                    let result = [];
                    if (method === 'append') {
                        result = item.concat(list)
                    } else {
                        result = list;
                    }
                    this.setData({
                        [`${prefix}.loading`]: false,
                        [`${prefix}.item`]: result,
                        [`${prefix}.page`]: current,
                        [`${prefix}.reach`]: page_info.page_count <= current,
                        [`${prefix}.toast`]: page_info.total_count,
                        [`${prefix}.status`]: status,
                    })
                    return done ? done(response) : response;
                }, (response) => {
                    const { error } = response;
                    if (type === 'page') {
                        this.setData({
                            [`${prefix}.error`]: error,
                            [`${prefix}.status`]: true
                        })
                    } else if (type === 'toast') {
                        wx.showToast({
                            icon: 'none',
                            mask: true,
                            title: error
                        })
                    }
                    this.setData({
                        [`${prefix}.loading`]: false,
                    })
                    return done ? done(response) : response;
                })
            }
        }
    }
}

export {
    Pagination
}