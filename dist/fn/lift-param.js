"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liftParam = function (val) {
    return function (fn) { return fn(val); };
};
//# sourceMappingURL=lift-param.js.map