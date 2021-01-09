"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var result_1 = require("../result");
exports.liftTry = function (fn) {
    return function (param) {
        var result;
        try {
            result = fn(param);
        }
        catch (err) {
            return result_1.Result.error(err);
        }
        return result_1.Result.success(result);
    };
};
//# sourceMappingURL=lift-try.js.map