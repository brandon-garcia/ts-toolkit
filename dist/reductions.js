"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberReducers = {
    max: function (first, second) { return Math.max(first, second); },
    min: function (first, second) { return Math.min(first, second); },
    sum: function (first, second) { return first + second; },
    product: function (first, second) { return first * second; },
};
exports.BoolReducers = {
    and: function (first, second) { return first && second; },
    or: function (first, second) { return first || second; },
};
exports.StringReducers = {
    makeConcatReducer: function (separator) { return function (first, second) { return first + separator + second; }; },
    concat: function (first, second) { return first + second; },
};
//# sourceMappingURL=reductions.js.map