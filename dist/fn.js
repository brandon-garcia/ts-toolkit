"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bindInvoker = (val) => (fn) => fn(val);
const ifElse = (expr, onTrue, onFalse) => expr ? onTrue() : onFalse();
const compose = (first, second) => (param) => second(first(param));
const makeBatchReducer = (reducer, operations) => (v) => operations
    .map(exports.FnUtils.bindInvoker(v))
    .reduce(reducer);
exports.FnUtils = {
    bindInvoker,
    compose,
    ifElse,
    makeBatchReducer,
};
//# sourceMappingURL=fn.js.map