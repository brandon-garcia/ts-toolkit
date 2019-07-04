"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
const hasField = (obj, field, validator) => field in obj && validator(obj[field]);
const validateOptionalField = (obj, field, validator) => !(field in obj) || obj[field] == null || validator(obj[field]);
const isNumber = (v) => typeof v === "number";
const isString = (v) => typeof v === "string";
const isObject = (v) => v != null && typeof v === "object";
const isBoolean = (v) => typeof v === "boolean";
const isNonNull = (v) => v != null;
const isNull = (v) => v === null;
const isUndefined = (v) => v === undefined;
const isSymbol = (v) => typeof v === "symbol";
const isFunction = (v) => typeof v === "function";
const isUnknown = (v) => true;
const isNonEmptyString = (v) => isString(v) && v.length > 0;
const composeTypeGuard = (reducer, predicates) => (v) => predicates
    .map(fn_1.FnUtils.bindInvoker(v))
    .reduce(reducer);
exports.TypeUtils = {
    boolean: isBoolean,
    composeTypeGuard,
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