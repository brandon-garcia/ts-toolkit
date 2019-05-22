"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Optional {
    constructor(value) {
        this.value = value;
    }
    ;
    static of(value) {
        return new Optional(value);
    }
    static ofNullable(value) {
        return value != null ? Optional.of(value) : Optional.empty();
    }
    static empty() {
        return Optional.ofNullable(null);
    }
    static coalesce(list) {
        for (let i = 0; i < list.length; ++i) {
            if (list[i].isPresent()) {
                return list[i];
            }
        }
        return Optional.empty();
    }
    isPresent() {
        return this.value != null;
    }
    getValue() {
        return this.orElseThrow(() => new Error('value must be nonnull'));
    }
    filter(predicate) {
        if (this.value != null && predicate(this.value)) {
            return this;
        }
        return Optional.empty();
    }
    map(fn) {
        if (this.value != null) {
            const result = fn(this.value);
            return Optional.ofNullable(result);
        }
        return Optional.empty();
    }
    flatMap(fn) {
        if (this.value != null) {
            return fn(this.value);
        }
        return Optional.empty();
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
}
exports.Optional = Optional;
//# sourceMappingURL=optional.js.map