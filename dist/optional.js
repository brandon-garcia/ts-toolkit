"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        for (let i = 0; i < list.length; ++i) {
            if (list[i].isPresent()) {
                return list[i];
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
    toProperty(field) {
        if (this.value != null) {
            return Optional.of(this.value[field]);
        }
        return Optional.none();
    }
    filter(predicate) {
        if (this.value != null && predicate(this.value)) {
            return this;
        }
        return Optional.none();
    }
    map(fn) {
        if (this.value != null) {
            const result = fn(this.value);
            return Optional.of(result);
        }
        return Optional.none();
    }
    flatMap(fn) {
        if (this.value != null) {
            return fn(this.value);
        }
        return Optional.none();
    }
    orElse(defaultVal) {
        if (this.isPresent()) {
            return this;
        }
        return Optional.some(defaultVal);
    }
    orElseGet(fn) {
        if (this.isPresent()) {
            return this;
        }
        return Optional.some(fn());
    }
    orElseThrow(fn) {
        if (this.isPresent()) {
            return this;
        }
        throw fn();
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