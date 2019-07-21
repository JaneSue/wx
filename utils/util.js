const proto = Object.prototype;

const noop = function () { }

const isFn = (fn) => ('function' === typeof fn)

const typeOf = (v) => {
    return (proto.toString.call(v).match(/^\[object (.+?)\]$/) || [])[1]
}

export default {
    isFn,
    noop,
    typeOf
}