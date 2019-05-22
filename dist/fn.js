"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ifElse = (expr, onTrue, onFalse) => expr ? onTrue() : onFalse();
const compose = (first, second) => (param) => second(first(param));
exports.FnUtils = {
    compose,
    ifElse,
};
//# sourceMappingURL=fn.js.map