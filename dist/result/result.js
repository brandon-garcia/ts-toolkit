"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
var lift_try_1 = require("../fn/lift-try");
var Result = (function () {
    function Result(flag, data) {
        this.flag = flag;
        this.data = data;
    }
    Result.success = function (data) {
        return new Result(true, data);
    };
    Result.error = function (error) {
        return new Result(false, error);
    };
    Result.prototype.isSuccess = function () {
        return this.flag;
    };
    Result.prototype.isError = function () {
        return !this.flag;
    };
    Object.defineProperty(Result.prototype, "value", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    Result.prototype.ifError = function (consumer) {
        if (!this.flag) {
            consumer(this.data);
        }
        return this;
    };
    Result.prototype.ifSuccess = function (consumer) {
        if (this.flag) {
            consumer(this.data);
        }
        return this;
    };
    Result.prototype.ifErrorThrow = function () {
        if (!this.flag) {
            throw this.data;
        }
        return this;
    };
    Result.prototype.try = function (fn) {
        return this.flatMap(lift_try_1.liftTry(fn));
    };
    Result.prototype.filter = function (predicate, errorFn) {
        if (this.flag) {
            if (!predicate(this.value)) {
                return Result.error(errorFn());
            }
        }
        return this;
    };
    Result.prototype.map = function (fn) {
        if (this.flag) {
            return Result.success(fn(this.data));
        }
        return this;
    };
    Result.prototype.flatMap = function (fn) {
        if (this.flag) {
            return fn(this.data);
        }
        return this;
    };
    Result.prototype.mapError = function (fn) {
        if (this.flag) {
            return this;
        }
        return Result.error(fn(this.data));
    };
    Result.prototype.flatMapError = function (fn) {
        if (this.flag) {
            return this;
        }
        return fn(this.data);
    };
    return Result;
}());
exports.Result = Result;
//# sourceMappingURL=result.js.map