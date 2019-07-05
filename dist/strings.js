"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regexNumeric = /^\d+$/.compile();
var getSplitter = function (delim) {
    return function (str) { return str.split(delim); };
};
var trim = function (str) { return str.trim(); };
exports.StringUtils = {
    isNumeric: function (str) { return str.length > 0 && regexNumeric.test(str); },
    stripWhitespace: function (str) { return str.replace(/\s/g, ""); },
    stripNonNumeric: function (str) { return str.replace(/\D/g, ""); },
    split: getSplitter,
    trim: trim,
};
//# sourceMappingURL=strings.js.map