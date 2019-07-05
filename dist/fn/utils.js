"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var optional_1 = require("../optional");
var either_1 = require("../either");
var bindInvoker = function (val) {
    return function (fn) { return fn(val); };
};
var ifElse = function (expr, onTrue, onFalse) {
    return expr ? onTrue() : onFalse();
};
var compose = function (first, second) {
    return function (param) { return second(first(param)); };
};
var makeBatchReducer = function (reducer, operations) {
    return function (v) { return operations
        .map(exports.FnUtils.bindInvoker(v))
        .reduce(reducer); };
};
var partial1 = function (p1, fn) {
    return function () { return fn(p1); };
};
var partial2 = function (p1, fn) {
    return function (p2) { return fn(p1, p2); };
};
var partial3 = function (p1, fn) {
    return function (p2, p3) { return fn(p1, p2, p3); };
};
var partial4 = function (p1, fn) {
    return function (p2, p3, p4) { return fn(p1, p2, p3, p4); };
};
var doBefore = function (fn, op) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        op.apply(void 0, args);
        return fn.apply(void 0, args);
    };
};
var doAfter = function (fn, op) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var retval = fn.apply(void 0, args);
        op(retval);
        return retval;
    };
};
var liftConsumer = function (fn) {
    return function (param) {
        fn(param);
        return param;
    };
};
var liftProperty = function (field) {
    return function (param) { return param[field]; };
};
var matchCompose = function (matcher, cases) {
    return function (param) { return cases[matcher(param)](param); };
};
var liftNullable = function (fn) {
    return function (param) { return optional_1.Optional.of(fn(param)); };
};
var liftTry = function (fn) {
    return function (param) {
        var result;
        try {
            result = fn(param);
        }
        catch (err) {
            return either_1.Either.error(err);
        }
        return either_1.Either.success(result);
    };
};
exports.FnUtils = {
    bindInvoker: bindInvoker,
    compose: compose,
    doAfter: doAfter,
    doBefore: doBefore,
    ifElse: ifElse,
    liftConsumer: liftConsumer,
    liftNullable: liftNullable,
    liftProperty: liftProperty,
    makeBatchReducer: makeBatchReducer,
    matchCompose: matchCompose,
    partial1: partial1,
    partial2: partial2,
    partial3: partial3,
    partial4: partial4,
    liftTry: liftTry,
};
//# sourceMappingURL=utils.js.map