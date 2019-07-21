import { hex_md5 } from '../utils/md5';

const authorizeToken = 'bsx30dMFka9Urd7D';

/** 
 * 获取headers签名串
 * @param  {number|string} id 用户id
 * @return {object}
 */
function getAuthHeaders({ user_id: userId, merch_id: merchId }) {
    let headers = {};
    if (typeof userId !== 'undefined' &&
        typeof merchId !== 'undefined') {
        headers.Authorization = getAutograph(`${userId}-${merchId}`)
    }
    return headers;
}

/** 
 * 获取验证md5
 * @param  {number|string} id 用户id
 * @return {string} 
 */
function getAutograph(id) {
    let date = String(new Date().getTime()).substr(0, 10);
    let rand = random(8);
    let md5Token = hex_md5(date + authorizeToken + rand + id);
    md5Token = md5Token.substr(8, 16)
    let autograph = date + md5Token + rand + id;
    return autograph;
}

/** 
 * 设置随机数
 * @param  {number} num 设置随机个数  
 * @return {number}
 */
function random(num = 1) {
    let value = '1';
    num = num < 1 ? 1 : num;
    while (--num) {
        value += '0';
    }
    return parseInt((Math.random() * 9 + 1) * parseInt(value));
}   

export {
    getAuthHeaders,
    getAutograph
}