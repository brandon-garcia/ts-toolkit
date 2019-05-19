"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hasField = (obj, field, validator) => {
    return field in obj && validator(obj[field]);
};
const isNumber = (v) => typeof v === "number";
const isString = (v) => typeof v === "string";
const isObject = (v) => typeof v === "object";
const isBoolean = (v) => typeof v === "boolean";
const isNonNull = (v) => v != null;
const isUnknown = (v) => true;
const isNonEmptyString = (v) => isString(v) && v.length > 0;
exports.TypeUtils = {
    boolean: isBoolean,
    field: hasField,
    nonEmptyString: isNonEmptyString,
    nonNull: isNonNull,
    number: isNumber,
    object: isObject,
    string: isString,
    unknown: isUnknown,
};
//# sourceMappingURL=types.js.map