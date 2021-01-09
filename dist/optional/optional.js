"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compose_1 = require("../fn/compose");
var lift_property_1 = require("../fn/lift-property");
var lift_try_1 = require("../fn/lift-try");
var Optional = (function () {
    function Optional(data) {
        this.data = data;
    }
    Optional.of = function (value) {
        return new Optional(value);
    };
    Optional.some = function (value) {
        return Optional.of(value);
    };
    Optional.none = function () {
        return Optional.of(undefined);
    };
    Optional.liftList = function (list) {
        return Optional.some(Optional.unboxList(list));
    };
    Optional.flatten = function (value) {
        return value.orElseGet(Optional.none).value;
    };
    Optional.unboxList = function (list) {
        return list
            .filter(function (maybeItem) { return maybeItem.isPresent(); })
            .map(function (maybeItem) { return maybeItem.value; });
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
        return this.data != null;
    };
    Optional.prototype.isEmpty = function () {
        return !this.isPresent();
    };
    Object.defineProperty(Optional.prototype, "value", {
        get: function () {
            return this.data == null ? undefined : this.data;
        },
        enumerable: true,
        configurable: true
    });
    Optional.prototype.mapToProperty = function (field) {
        return this.flatMap(compose_1.compose(lift_property_1.liftProperty(field), Optional.of));
    };
    Optional.prototype.filter = function (predicate) {
        if (this.data != null && predicate(this.data)) {
            return this;
        }
        return Optional.none();
    };
    Optional.prototype.filterProperty = function (field, predicate) {
        return this.filter(function (val) { return val[field] != null ? predicate(val[field]) : false; });
    };
    Optional.prototype.map = function (fn) {
        if (this.data != null) {
            return Optional.of(fn(this.data));
        }
        return this;
    };
    Optional.prototype.flatMap = function (fn) {
        if (this.data != null) {
            return fn(this.data);
        }
        return this;
    };
    Optional.prototype.orElse = function (defaultVal) {
        if (this.isEmpty()) {
            return Optional.of(defaultVal);
        }
        return this;
    };
    Optional.prototype.orElseGet = function (fn) {
        if (this.isEmpty()) {
            return Optional.of(fn());
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
        return this.map(lift_try_1.liftTry(fn));
    };
    Optional.prototype.coalesce = function (other) {
        if (this.isEmpty()) {
            return other;
        }
        return this;
    };
    Optional.prototype.ifPresent = function (fn) {
        if (this.data != null) {
            fn(this.data);
        }
        return this;
    };
    Optional.prototype.ifEmpty = function (fn) {
        if (this.data == null) {
            fn();
        }
        return this;
    };
    return Optional;
}());
exports.Optional = Optional;
//# sourceMappingURL=optional.js.map