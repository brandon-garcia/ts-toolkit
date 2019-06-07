"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regexNumeric = /^\d+$/.compile();
exports.StringUtils = {
    isNumeric: (str) => str.length > 0 && regexNumeric.test(str),
    stripWhitespace: (str) => str.replace(/\s/, ""),
    stripNonNumeric: (str) => str.replace(/\D/, ""),
};
//# sourceMappingURL=strings.js.map