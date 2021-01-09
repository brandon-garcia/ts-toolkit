"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liftParam = void 0;
var liftParam = function (val) {
    return function (fn) { return fn(val); };
};
exports.liftParam = liftParam;
//# sourceMappingURL=lift-param.js.map