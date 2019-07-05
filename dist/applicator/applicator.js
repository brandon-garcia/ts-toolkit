"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Applicator = (function () {
    function Applicator(fn) {
        this.fn = fn;
    }
    Applicator.from0 = function (fn) {
        return new Applicator(fn);
    };
    Applicator.from1 = function (fn) {
        return new Applicator(fn);
    };
    Applicator.from2 = function (fn) {
        return new Applicator(fn);
    };
    Applicator.from3 = function (fn) {
        return new Applicator(fn);
    };
    Applicator.from4 = function (fn) {
        return new Applicator(fn);
    };
    Applicator.from5 = function (fn) {
        return new Applicator(fn);
    };
    Applicator.from6 = function (fn) {
        return new Applicator(fn);
    };
    Applicator.from7 = function (fn) {
        return new Applicator(fn);
    };
    Applicator.from8 = function (fn) {
        return new Applicator(fn);
    };
    Applicator.prototype.left = function (param) {
        var _this = this;
        this.fn = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this.fn.apply(_this, [param].concat(params));
        };
        return this;
    };
    Applicator.prototype.right = function (param) {
        var _this = this;
        this.fn = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this.fn.apply(_this, params.concat([param]));
        };
        return this;
    };
    Applicator.prototype.toCallable = function () {
        return this.fn;
    };
    return Applicator;
}());
exports.Applicator = Applicator;
//# sourceMappingURL=applicator.js.map