"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const optional_1 = require("../optional");
const either_1 = require("../either");
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
const liftNullable = (fn) => (param) => optional_1.Optional.of(fn(param));
const liftTry = (fn) => (param) => {
    let result;
    try {
        result = fn(param);
    }
    catch (err) {
        return either_1.Either.error(err);
    }
    return either_1.Either.success(result);
};
exports.FnUtils = {
    bindInvoker,
    compose,
    doAfter,
    doBefore,
    ifElse,
    liftConsumer,
    liftNullable,
    liftProperty,
    makeBatchReducer,
    matchCompose,
    partial1,
    partial2,
    partial3,
    partial4,
    liftTry,
};
//# sourceMappingURL=utils.js.map