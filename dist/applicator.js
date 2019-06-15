"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Applicator {
    constructor(fn) {
        this.fn = fn;
    }
    static from0(fn) {
        return new Applicator(fn);
    }
    static from1(fn) {
        return new Applicator(fn);
    }
    static from2(fn) {
        return new Applicator(fn);
    }
    static from3(fn) {
        return new Applicator(fn);
    }
    static from4(fn) {
        return new Applicator(fn);
    }
    static from5(fn) {
        return new Applicator(fn);
    }
    static from6(fn) {
        return new Applicator(fn);
    }
    static from7(fn) {
        return new Applicator(fn);
    }
    static from8(fn) {
        return new Applicator(fn);
    }
    left(param) {
        return new Applicator((...params) => this.fn(param, ...params));
    }
    right(param) {
        return new Applicator((...params) => this.fn(...params, param));
    }
    toCallable() {
        return this.fn;
    }
}
exports.Applicator = Applicator;
//# sourceMappingURL=applicator.js.map