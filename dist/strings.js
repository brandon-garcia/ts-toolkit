"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regexNumeric = /^\d+$/.compile();
const getSplitter = (delim) => (str) => str.split(delim);
const trim = (str) => str.trim();
exports.StringUtils = {
    isNumeric: (str) => str.length > 0 && regexNumeric.test(str),
    stripWhitespace: (str) => str.replace(/\s/, ""),
    stripNonNumeric: (str) => str.replace(/\D/, ""),
    split: getSplitter,
    trim,
};
//# sourceMappingURL=strings.js.map