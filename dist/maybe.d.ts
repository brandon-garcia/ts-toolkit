import { Callback, Consumer, Fn, Predicate, Supplier } from "./fn";
interface IMaybeBase<T> {
    toProperty<F extends keyof T>(field: F): IMaybe<T[F]>;
    filter(predicate: Predicate<T>): IMaybe<T>;
    map<R>(fn: Fn<T, R>): IMaybe<R>;
    flatMap<R>(fn: Fn<T, IMaybe<R>>): IMaybe<R>;
    defaultTo(defaultVal: T): IMaybe<T>;
    defaultToSupplier(fn: Supplier<T>): IMaybe<T>;
    orElse(defaultVal: T): T;
    orElseGet(fn: Supplier<T>): T;
    orElseThrow<E extends Error>(fn: Supplier<E>): T | never;
    ifPresent(fn: Consumer<T>): IMaybe<T>;
    ifEmpty(fn: Callback): IMaybe<T>;
}
interface ISome<T> extends IMaybeBase<T> {
    isPresent(): true;
    isEmpty(): false;
    getValue(): T;
}
interface INone<T> extends IMaybeBase<T> {
    isPresent(): false;
    isEmpty(): true;
    getValue(): undefined;
}
export interface IMaybe<T> extends IMaybeBase<T> {
    isPresent(): this is ISome<T>;
    isEmpty(): this is INone<T>;
    getValue(): T | undefined;
}
export declare class Maybe<T> implements IMaybe<T> {
    private value;
    private constructor();
    static of<T>(value?: T | null | undefined): IMaybe<T>;
    static empty<T>(): INone<T>;
    static liftList<T>(list: Array<IMaybe<T>>): IMaybe<T[]>;
    static flatten<T>(value: IMaybe<IMaybe<T>>): IMaybe<T>;
    static unboxList<T>(list: Array<IMaybe<T>>): T[];
    static coalesce<T>(list: Array<IMaybe<T>>): IMaybe<T>;
    isPresent(): this is ISome<T>;
    isEmpty(): this is INone<T>;
    getValue(): T | undefined;
    toProperty<F extends keyof T>(field: F): IMaybe<T[F]>;
    filter(predicate: Predicate<T>): IMaybe<T>;
    map<R>(fn: Fn<T, R>): IMaybe<R>;
    flatMap<R>(fn: Fn<T, IMaybe<R>>): IMaybe<R>;
    defaultTo(defaultVal: T): IMaybe<T>;
    defaultToSupplier(fn: () => T): IMaybe<T>;
    orElse(defaultVal: T): T;
    orElseGet(fn: Supplier<T>): T;
    orElseThrow<E extends Error>(fn: Supplier<E>): T | never;
    ifPresent(fn: Consumer<T>): IMaybe<T>;
    ifEmpty(fn: Callback): IMaybe<T>;
}
export {};
