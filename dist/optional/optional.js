"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fn_1 = require("../fn");
var Optional = (function () {
    function Optional(value) {
        this.value = value;
    }
    Optional.of = function (value) {
        return new Optional(value);
    };
    Optional.some = function (value) {
        return Optional.of(value);
    };
    Optional.none = function () {
        return Optional.of();
    };
    Optional.liftList = function (list) {
        return Optional.some(Optional.unboxList(list));
    };
    Optional.flatten = function (value) {
        return value.orElseGet(Optional.none).getValue();
    };
    Optional.unboxList = function (list) {
        return list
            .filter(function (maybeItem) { return maybeItem.isPresent(); })
            .map(function (maybeItem) { return maybeItem.getValue(); });
    };
    Optional.coalesce = function (list) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item.isPresent()) {
                return item;
            }
        }
        return Optional.none();
    };
    Optional.prototype.isPresent = function () {
        return this.value != null;
    };
    Optional.prototype.isEmpty = function () {
        return !this.isPresent();
    };
    Optional.prototype.getValue = function () {
        return this.value == null ? undefined : this.value;
    };
    Optional.prototype.mapToProperty = function (field) {
        return this.flatMap(fn_1.FnUtils.compose(fn_1.FnUtils.liftProperty(field), Optional.of));
    };
    Optional.prototype.filter = function (predicate) {
        if (this.value != null && predicate(this.value)) {
            return this;
        }
        this.value = null;
        return this;
    };
    Optional.prototype.filterProperty = function (field, predicate) {
        return this.filter(function (val) { return val[field] != null ? predicate(val[field]) : false; });
    };
    Optional.prototype.map = function (fn) {
        if (this.value != null) {
            this.value = fn(this.value);
        }
        return this;
    };
    Optional.prototype.flatMap = function (fn) {
        if (this.value != null) {
            return fn(this.value);
        }
        return this;
    };
    Optional.prototype.orElse = function (defaultVal) {
        if (this.isEmpty()) {
            this.value = defaultVal;
        }
        return this;
    };
    Optional.prototype.orElseGet = function (fn) {
        if (this.isEmpty()) {
            this.value = fn();
        }
        return this;
    };
    Optional.prototype.orElseThrow = function (fn) {
        if (this.isPresent()) {
            return this;
        }
        throw fn();
    };
    Optional.prototype.try = function (fn) {
        return this.map(fn_1.FnUtils.liftTry(fn));
    };
    Optional.prototype.coalesce = function (other) {
        if (this.isEmpty()) {
            return other;
        }
        return this;
    };
    Optional.prototype.ifPresent = function (fn) {
        if (this.value != null) {
            fn(this.value);
        }
        return this;
    };
    Optional.prototype.ifEmpty = function (fn) {
        if (this.value == null) {
            fn();
        }
        return this;
    };
    return Optional;
}());
exports.Optional = Optional;
//# sourceMappingURL=optional.js.map