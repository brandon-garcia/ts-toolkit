"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liftNullable = void 0;
var optional_1 = require("../optional");
var liftNullable = function (fn) {
    return function (param) { return optional_1.Optional.of(fn(param)); };
};
exports.liftNullable = liftNullable;
//# sourceMappingURL=lift-nullable.js.map