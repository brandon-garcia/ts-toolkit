"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var optional_1 = require("./optional");
var head = function (_a) {
    var first = _a[0];
    return first;
};
var tail = function (_a) {
    var rest = _a.slice(1);
    return rest;
};
var getFirst = function (list) {
    if (list.length) {
        return optional_1.Optional.of(list[0]);
    }
    return optional_1.Optional.none();
};
exports.ListUtils = {
    getFirst: getFirst,
    head: head,
    tail: tail,
};
//# sourceMappingURL=list.js.map