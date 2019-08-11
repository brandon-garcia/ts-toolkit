"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lift_try_1 = require("../fn/lift-try");
var Either = (function () {
    function Either(flag, data) {
        this.flag = flag;
        this.data = data;
    }
    Either.success = function (data) {
        return new Either(true, data);
    };
    Either.error = function (error) {
        return new Either(false, error);
    };
    Either.prototype.isSuccess = function () {
        return this.flag;
    };
    Either.prototype.isError = function () {
        return !this.flag;
    };
    Object.defineProperty(Either.prototype, "value", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    Either.prototype.ifError = function (consumer) {
        if (!this.flag) {
            consumer(this.data);
        }
        return this;
    };
    Either.prototype.ifSuccess = function (consumer) {
        if (this.flag) {
            consumer(this.data);
        }
        return this;
    };
    Either.prototype.try = function (fn) {
        return this.flatMap(lift_try_1.liftTry(fn));
    };
    Either.prototype.flatMap = function (fn) {
        if (this.flag) {
            return fn(this.data);
        }
        return this;
    };
    Either.prototype.map = function (fn) {
        if (this.flag) {
            this.data = fn(this.data);
        }
        return this;
    };
    return Either;
}());
exports.Either = Either;
//# sourceMappingURL=either.js.map