"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fn_1 = require("../fn");
var hasField = function (obj, field, validator) {
    return field in obj && validator(obj[field]);
};
var validateOptionalField = function (obj, field, validator) {
    return !(field in obj) || obj[field] == null || validator(obj[field]);
};
var isNumber = function (v) {
    return typeof v === "number";
};
var isString = function (v) {
    return typeof v === "string";
};
var isObject = function (v) {
    return v != null && typeof v === "object";
};
var isBoolean = function (v) {
    return typeof v === "boolean";
};
var isNonNull = function (v) {
    return v != null;
};
var isNull = function (v) {
    return v === null;
};
var isUndefined = function (v) {
    return v === undefined;
};
var isSymbol = function (v) {
    return typeof v === "symbol";
};
var isFunction = function (v) {
    return typeof v === "function";
};
var isUnknown = function (v) {
    return true;
};
var isNonEmptyString = function (v) {
    return isString(v) && v.length > 0;
};
var composeTypeGuard = function (reducer, predicates) {
    return function (v) {
        return predicates
            .map(fn_1.FnUtils.bindInvoker(v))
            .reduce(reducer);
    };
};
exports.TypeUtils = {
    boolean: isBoolean,
    composeTypeGuard: composeTypeGuard,
    field: hasField,
    function: isFunction,
    nonEmptyString: isNonEmptyString,
    nonNull: isNonNull,
    null: isNull,
    undefined: isUndefined,
    number: isNumber,
    object: isObject,
    optField: validateOptionalField,
    string: isString,
    symbol: isSymbol,
    unknown: isUnknown,
};
//# sourceMappingURL=utils.js.map