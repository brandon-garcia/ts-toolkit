"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("./fn");
class Either {
    constructor(flag, data) {
        this.flag = flag;
        this.data = data;
    }
    static success(data) {
        return new Either(true, data);
    }
    static error(error) {
        return new Either(false, error);
    }
    isSuccess() {
        return this.flag;
    }
    isError() {
        return !this.flag;
    }
    getValue() {
        return this.data;
    }
    ifError(consumer) {
        if (!this.flag) {
            consumer(this.data);
        }
        return this;
    }
    ifSuccess(consumer) {
        if (this.flag) {
            consumer(this.data);
        }
        return this;
    }
    try(fn) {
        return this.flatMap(fn_1.FnUtils.liftTry(fn));
    }
    flatMap(fn) {
        if (this.flag) {
            return fn(this.data);
        }
        return this;
    }
    map(fn) {
        if (this.flag) {
            return Either.success(fn(this.data));
        }
        return this;
    }
}
exports.Either = Either;
//# sourceMappingURL=either.js.map