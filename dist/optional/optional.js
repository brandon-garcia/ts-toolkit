"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
class Optional {
    constructor(value) {
        this.value = value;
    }
    static of(value) {
        return new Optional(value);
    }
    static some(value) {
        return Optional.of(value);
    }
    static none() {
        return Optional.of();
    }
    static liftList(list) {
        return Optional.some(Optional.unboxList(list));
    }
    static flatten(value) {
        return value.orElseGet(Optional.none).getValue();
    }
    static unboxList(list) {
        return list
            .filter((maybeItem) => maybeItem.isPresent())
            .map((maybeItem) => maybeItem.getValue());
    }
    static coalesce(list) {
        for (const item of list) {
            if (item.isPresent()) {
                return item;
            }
        }
        return Optional.none();
    }
    isPresent() {
        return this.value != null;
    }
    isEmpty() {
        return !this.isPresent();
    }
    getValue() {
        return this.value == null ? undefined : this.value;
    }
    mapToProperty(field) {
        return this.flatMap(fn_1.FnUtils.compose(fn_1.FnUtils.liftProperty(field), Optional.of));
    }
    filter(predicate) {
        if (this.value != null && predicate(this.value)) {
            return this;
        }
        this.value = null;
        return this;
    }
    filterProperty(field, predicate) {
        return this.filter((val) => val[field] != null ? predicate(val[field]) : false);
    }
    map(fn) {
        if (this.value != null) {
            this.value = fn(this.value);
        }
        return this;
    }
    flatMap(fn) {
        if (this.value != null) {
            return fn(this.value);
        }
        return this;
    }
    orElse(defaultVal) {
        if (this.isEmpty()) {
            this.value = defaultVal;
        }
        return this;
    }
    orElseGet(fn) {
        if (this.isEmpty()) {
            this.value = fn();
        }
        return this;
    }
    orElseThrow(fn) {
        if (this.isPresent()) {
            return this;
        }
        throw fn();
    }
    try(fn) {
        return this.map(fn_1.FnUtils.liftTry(fn));
    }
    coalesce(other) {
        if (this.isEmpty()) {
            return other;
        }
        return this;
    }
    ifPresent(fn) {
        if (this.value != null) {
            fn(this.value);
        }
        return this;
    }
    ifEmpty(fn) {
        if (this.value == null) {
            fn();
        }
        return this;
    }
}
exports.Optional = Optional;
//# sourceMappingURL=optional.js.map