import util from '../assets/lib/kissy-util/index';
import config from '../config';
import storage from '../utils/storage';
import { getAuthHeaders } from './authorize';


const duration = 2500;

const wxHttpError = {
}

const defaultHeaders = {
    ...getAuthHeaders(storage.get('user') || {})
}

class httpRequest {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
    }
    request(params = {}) {
        let { url, type, loading = true, query = {}, header = {},
            errorToast = true,
            data = {},
            name = 'the request has no name!'
        } = params;
        checkParams(params);
        if (loading) {
            wx.showLoading({
                mask: true,
                title: typeof loading !== 'string' ? '正在提交...' : loading
            });
        }
        type = type.toLocaleUpperCase();

        if (type === 'POST') {
            header = util.mix({ 
                'content-type': 'application/x-www-form-urlencoded' 
            }, header)
        }
        header = util.mix({}, defaultHeaders, header)
        return new Promise((resolve, reject) => {
            let uri = this.baseUrl + url
            uri += '?' + util.param(util.mix({
                merch_id: ''
            }, query))
            wx.request({
                url: uri,
                header,
                method: type,
                data,
                dataType: 'json',
                success(response) {
                    let { data: d } = response;
                    const { status, error, message, data } = d;
                    logs(name, uri, query, d);
                    if (status === 0) {
                        resolve(d);
                    } else {
                        if (errorToast) {
                            wx.showToast({
                                icon: 'none',
                                mask: true,
                                title: error || `请求错误，请重试`,
                                duration
                            });
                        }
                        reject({
                            status,
                            error: error || message
                        });
                    }
                    loading && wx.hideLoading();
                },
                fail(res) {
                    console.log(res);
                    const { errMsg: error, status = 9100 } = res;
                    const response = {
                        status,
                        error,
                        type: 'wechat request fail'
                    };
                    logs(name, uri, query, response.data);
                    if (errorToast) {
                        wx.showToast({
                            icon: 'none',
                            mask: true,
                            title: error || `请求失败，请检查网络！`,
                            duration
                        }); 
                    }
                    reject(response);
                    loading && wx.hideLoading();
                }
            })
        })
    }
}

function checkParams(params) {
    if (typeof params.url !== 'string') {
        console.warn('httpRequest url is not string!');
    }
    if (typeof params.type !== 'string') {
        console.warn('httpRequest type is not string!');
    }
}

function logs(name, uri, query, response) {
    const color = 'color: blue';
    query = util.param(query || {});
    query = query || 'not';
    if (config.env === 'dev') {
        console.info(`%c -----------------------------------------`, color)
        console.info(`%c request.name: ${name}`, color);
        console.info(`%c url: ${uri}`, color);
        console.info(`%c query: ${query}`, color);
        console.info(`%c response: `, color, response);
        console.info(`%c -----------------------------------------`, color)
    }
}

export default httpRequest;

