"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var optional_1 = require("../optional");
exports.liftNullable = function (fn) {
    return function (param) { return optional_1.Optional.of(fn(param)); };
};
//# sourceMappingURL=lift-nullable.js.map