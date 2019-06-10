"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coalesce = (...options) => {
    for (let v of options) {
        if (v != null) {
            return v;
        }
    }
    return undefined;
};
const undefinedToNull = (v) => v != null ? v : null;
const nullToUndefined = (v) => v != null ? v : undefined;
exports.NullUtils = {
    coalesce,
    undefinedToNull,
    nullToUndefined,
};
//# sourceMappingURL=null.js.map