"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var either_1 = require("../either");
exports.liftTry = function (fn) {
    return function (param) {
        var result;
        try {
            result = fn(param);
        }
        catch (err) {
            return either_1.Either.error(err);
        }
        return either_1.Either.success(result);
    };
};
//# sourceMappingURL=lift-try.js.map