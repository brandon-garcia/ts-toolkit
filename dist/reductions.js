"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberReducers = {
    max: (first, second) => Math.max(first, second),
    min: (first, second) => Math.min(first, second),
    sum: (first, second) => first + second,
    product: (first, second) => first * second,
};
exports.BoolReducers = {
    and: (first, second) => first && second,
    or: (first, second) => first || second,
};
exports.StringReducers = {
    makeConcatReducer: (separator) => (first, second) => first + separator + second,
    concat: (first, second) => first + second,
};
//# sourceMappingURL=reductions.js.map