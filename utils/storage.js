/** 
 * -------------------------------------------------------------
 * 扩展storage可以设置过期数据
 * @author janesue
 * -------------------------------------------------------------
 */
import util from './util';

const clearTime = 1;
const undef = undefined;

let sram = wx;

/**  
 * 设置缓存
 * @param  {string}    name    设置缓存的key
 * @param  {object}    options 设置缓存，键值对，当值为expire时，
 * 							   设置过期时间单位为天 {expire: 1} = 1天
 * 							   不设置时expire默认为null，null代表永久缓存
 * @return {undefined} 
 */
function set(name, options) {
    let {
        expire,
        ...data
    } = options;
    if (util.typeOf(options) !== 'Object'){
        throw new Error(`storage.set: the second parameter must be the object`)
    }
    if (expire !== null) {
        if (typeof expire === 'number') {
            if (expire > 0) {
                expire = (parseFloat(expire) * 86400 * 1e3) +
                    new Date().getTime();
            }
        } else {
            
            expire = null;
            let data = get(name);
            if (data) {
                expire = data.expire
            }
        }
    }
    try {
        sram.setStorageSync(name, {
            ...data,
            expire
        })
    } catch (e) {
        console.error(`storage.set error: ${e}`);
    }
}

/**  
 * 获取过期时间
 * @param  {string}  name 获取过期时间的key
 * @return {number|null} 
 */
function getExpire(name) { // undefined //value
    try {
        let data = sram.getStorageSync(name || '');
        if (util.typeOf(data) === 'Object') {
            let { expire } = data;
            return expire || null;
        } else {
            return null;
        }
    } catch (e) {
        console.error(`storage.getExpire error: ${e}`);
        return null;
    }
}

/**  
 * 判断缓存是否过期
 * @param  {string}  name 判断缓存的key
 * @return {boolean}
 */
function isExpire(name) {
    var expire = getExpire(name);
    if (expire < 0) {
        return true;
    } else if (expire === null) {
        return false;
    } else {
        
        let time = new Date().getTime();
        return expire < time;
    }
}

/**  
 * 判断缓存是否存在
 * @param  {string}  name 判断缓存的key
 * @return {Boolean}
 */
function isExist(name) {
    try {
        let data = get(name);
        return !!data
    } catch (e) {
        console.error(`storage.isExist error: ${e}`);
        return false;
    }
}

/**  
 * 获取缓存
 * @param  {string} name 获取缓存的key
 * @return {object|null} 返回null或者是数据，获取失败或者过期一律返回null
 */
function get(name) {
    try {
        let data = sram.getStorageSync(name || '');
        if (!data || data === 'undefined' || isExpire(name)) {
            return null;
        }
        return data;
    } catch (e) {
        console.error(`storage.get error: ${e}`);
        return null;
    }
}

/**  
 * 清除缓存
 * @param  {string}    name 清楚缓存的key，当无参数时默认清除所有缓存
 * @return {undefined}
 */
function remove(name) {
    try {
        if (name) {
            sram.removeStorageSync(name);
            return;
        }
        sram.clearStorageSync();
    } catch (e) {
        console.error(`storage.remove error: ${e}`);
    }
}

/**  
 * 清除所有过期缓存
 * @return {undefined}
 */
function clearExpire() {
    try {
        let {
            keys
        } = sram.getStorageInfoSync();
        for (let name of keys) {
            if (isExpire(name)) {
                remove(name);
            }
        }
    } catch (e) {
        console.error(`storage.clearExpire error: ${e}`);
    }
}

//定时清理过期缓存
setInterval(() => {
    clearExpire();
}, 1000 * 60 * 60 * clearTime);

export default {
    set,
    get,
    remove,
    clearExpire,
    isExpire,
    isExist,
    getExpire
}