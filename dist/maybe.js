"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Maybe {
    constructor(value) {
        this.value = value;
    }
    static of(value) {
        return new Maybe(value);
    }
    static empty() {
        return Maybe.of();
    }
    static liftList(list) {
        return Maybe.of(Maybe.unboxList(list));
    }
    static flatten(value) {
        return value.orElseGet(Maybe.empty);
    }
    static unboxList(list) {
        return list
            .filter((maybeItem) => maybeItem.isPresent())
            .map((maybeItem) => maybeItem.getValue());
    }
    static coalesce(list) {
        for (let i = 0; i < list.length; ++i) {
            if (list[i].isPresent()) {
                return list[i];
            }
        }
        return Maybe.empty();
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
    toProperty(field) {
        if (this.value != null) {
            return Maybe.of(this.value[field]);
        }
        return Maybe.empty();
    }
    filter(predicate) {
        if (this.value != null && predicate(this.value)) {
            return this;
        }
        return Maybe.empty();
    }
    map(fn) {
        if (this.value != null) {
            const result = fn(this.value);
            return Maybe.of(result);
        }
        return Maybe.empty();
    }
    flatMap(fn) {
        if (this.value != null) {
            return fn(this.value);
        }
        return Maybe.empty();
    }
    defaultTo(defaultVal) {
        if (this.value == null) {
            return Maybe.of(defaultVal);
        }
        return this;
    }
    defaultToSupplier(fn) {
        if (this.value == null) {
            return Maybe.of(fn());
        }
        return this;
    }
    orElse(defaultVal) {
        if (this.value == null) {
            return defaultVal;
        }
        return this.value;
    }
    orElseGet(fn) {
        if (this.value == null) {
            return fn();
        }
        return this.value;
    }
    orElseThrow(fn) {
        if (this.value == null) {
            throw fn();
        }
        return this.value;
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
exports.Maybe = Maybe;
//# sourceMappingURL=maybe.js.map