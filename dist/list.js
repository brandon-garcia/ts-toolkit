"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const optional_1 = require("./optional");
const head = ([first]) => first;
const tail = ([, ...rest]) => rest;
const getFirst = (list) => {
    if (list.length) {
        return optional_1.Optional.of(list[0]);
    }
    return optional_1.Optional.none();
};
exports.ListUtils = {
    getFirst,
    head,
    tail,
};
//# sourceMappingURL=list.js.map