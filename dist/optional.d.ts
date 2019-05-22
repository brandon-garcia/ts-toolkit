import { Fn0, Fn1, Predicate } from "./fn";
export declare class Optional<T> {
    private value;
    private constructor();
    static of<T>(value: T): Optional<T>;
    static ofNullable<T>(value: T | null | undefined): Optional<T>;
    static empty<T>(): Optional<T>;
    static coalesce<T>(list: Array<Optional<T>>): Optional<T>;
    isPresent(): boolean;
    getValue(): T;
    filter(predicate: Predicate<T>): Optional<T>;
    map<R>(fn: Fn1<T, R>): Optional<R>;
    flatMap<R>(fn: Fn1<T, Optional<R>>): Optional<R>;
    orElse(defaultVal: T): T;
    orElseGet(fn: Fn0<T>): T;
    orElseThrow<E extends Error>(fn: Fn0<E>): T | never;
    ifPresent(fn: Fn1<T, void>): Optional<T>;
}
