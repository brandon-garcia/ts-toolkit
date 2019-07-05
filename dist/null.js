"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coalesce = function () {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        options[_i] = arguments[_i];
    }
    for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
        var v = options_1[_a];
        if (v != null) {
            return v;
        }
    }
    return undefined;
};
var undefinedToNull = function (v) {
    return v != null ? v : null;
};
var nullToUndefined = function (v) {
    return v != null ? v : undefined;
};
exports.NullUtils = {
    coalesce: coalesce,
    undefinedToNull: undefinedToNull,
    nullToUndefined: nullToUndefined,
};
//# sourceMappingURL=null.js.map