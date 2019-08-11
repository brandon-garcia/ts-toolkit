"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getHasher = function (p) {
    var typeCode = typeof p;
    if (typeCode === "number" || typeCode === "boolean" || typeCode === "string") {
        return function (p) { return p.toString(); };
    }
    return JSON.stringify;
};
exports.memoize = function (fn) {
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
//# sourceMappingURL=memoize.js.map