"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
var regexNumeric = /^\d+$/.compile();
var regexAlphaNumeric = /^[0-9a-zA-Z]+$/.compile();
var getSplitter = function (delim) {
    return function (str) { return str.split(delim); };
};
var trim = function (str) { return str.trim(); };
var isNumeric = function (str) { return str.length > 0 && regexNumeric.test(str); };
var isAlphaNumeric = function (str) { return str.length > 0 && regexAlphaNumeric.test(str); };
exports.StringUtils = {
    isAlphaNumeric: isAlphaNumeric,
    isNumeric: isNumeric,
    stripWhitespace: function (str) { return str.replace(/\s/g, ""); },
    stripNonNumeric: function (str) { return str.replace(/\D/g, ""); },
    split: getSplitter,
    trim: trim,
};
//# sourceMappingURL=strings.js.map