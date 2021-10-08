"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liftTry = void 0;
var result_1 = require("../result");
var liftTry = function (fn) {
    return function (param) {
        var result;
        try {
            result = fn(param);
        }
        catch (err) {
            return result_1.Result.failure(err);
        }
        return result_1.Result.success(result);
    };
};
exports.liftTry = liftTry;
//# sourceMappingURL=lift-try.js.map