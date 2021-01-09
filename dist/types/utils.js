"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUtils = void 0;
var lift_param_1 = require("../fn/lift-param");
var hasField = function (obj, field, validator) {
    return isObject(obj) &&
        field in obj &&
        isNonNull(obj[field]) &&
        validator(obj[field]);
};
var hasFields = function (obj, schema) {
    for (var fieldName in schema) {
        if (schema.hasOwnProperty(fieldName) && isFunction(schema[fieldName])) {
            if (!hasField(obj, fieldName, schema[fieldName])) {
                return false;
            }
        }
    }
    return true;
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
var isArray = function (v, itemValidator) {
    if (!Array.isArray(v)) {
        return false;
    }
    for (var i = 0; i < v.length; ++i) {
        if (!itemValidator(v[i])) {
            return false;
        }
    }
    return true;
};
var isStringArray = function (v) {
    return isArray(v, isString);
};
var isNumberArray = function (v) {
    return isArray(v, isNumber);
};
var composeTypeGuard = function (reducer, predicates) {
    return function (v) {
        return predicates
            .map(lift_param_1.liftParam(v))
            .reduce(reducer);
    };
};
exports.TypeUtils = {
    boolean: isBoolean,
    composeTypeGuard: composeTypeGuard,
    field: hasField,
    fields: hasFields,
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
    array: isArray,
    stringArray: isStringArray,
    numberArray: isNumberArray,
};
//# sourceMappingURL=utils.js.map