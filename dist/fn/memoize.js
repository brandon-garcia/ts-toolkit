"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = void 0;
var types_1 = require("../types");
var getHasher = function (p) {
    if (types_1.TypeUtils.number(p) || types_1.TypeUtils.boolean(p) || types_1.TypeUtils.string(p)) {
        return function (p) { return p.toString(); };
    }
    return JSON.stringify;
};
var memoize = function (fn) {
    var cache = {};
    var hasher;
    return function (p) {
        if (hasher == null) {
            hasher = getHasher(p);
        }
        var hashCode = hasher(p);
        if (!(hashCode in cache)) {
            cache[hashCode] = fn(p);
        }
        return cache[p];
    };
};
exports.memoize = memoize;
//# sourceMappingURL=memoize.js.map