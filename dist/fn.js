"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bindInvoker = (val) => (fn) => fn(val);
const ifElse = (expr, onTrue, onFalse) => expr ? onTrue() : onFalse();
const compose = (first, second) => (param) => second(first(param));
const makeBatchReducer = (reducer, operations) => (v) => operations
    .map(exports.FnUtils.bindInvoker(v))
    .reduce(reducer);
const partial1 = (p1, fn) => () => fn(p1);
const partial2 = (p1, fn) => (p2) => fn(p1, p2);
const partial3 = (p1, fn) => (p2, p3) => fn(p1, p2, p3);
const partial4 = (p1, fn) => (p2, p3, p4) => fn(p1, p2, p3, p4);
const doBefore = (fn, op) => (...args) => {
    op(...args);
    return fn(...args);
};
const doAfter = (fn, op) => (...args) => {
    const retval = fn(...args);
    op(retval);
    return retval;
};
const liftConsumer = (fn) => (param) => {
    fn(param);
    return param;
};
const liftProperty = (field) => (param) => param[field];
const matchCompose = (matcher, cases) => (param) => cases[matcher(param)](param);
exports.FnUtils = {
    bindInvoker,
    compose,
    doAfter,
    doBefore,
    ifElse,
    makeBatchReducer,
    partial1,
    partial2,
    partial3,
    partial4,
    matchCompose,
    liftConsumer,
    liftProperty,
};
//# sourceMappingURL=fn.js.map