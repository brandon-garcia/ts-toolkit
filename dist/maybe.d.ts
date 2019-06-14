import { Fn0, Fn1, Predicate, Supplier } from "./fn";
export interface IMaybe<T> {
    isPresent(): boolean;
    getValue(): T | undefined;
    toProperty<F extends keyof T>(field: F): IMaybe<T[F]>;
    filter(predicate: Predicate<T>): IMaybe<T>;
    map<R>(fn: Fn1<T, R>): IMaybe<R>;
    flatMap<R>(fn: Fn1<T, IMaybe<R>>): IMaybe<R>;
    defaultTo(defaultVal: T): IMaybe<T>;
    defaultToSupplier(fn: Supplier<T>): IMaybe<T>;
    orElse(defaultVal: T): T;
    orElseGet(fn: Fn0<T>): T;
    orElseThrow<E extends Error>(fn: Fn0<E>): T | never;
    ifPresent(fn: Fn1<T, void>): IMaybe<T>;
}
export declare class Maybe<T> implements IMaybe<T> {
    private value;
    private constructor();
    static of<T>(value: T): IMaybe<T>;
    static ofNullable<T>(value?: T | null | undefined): IMaybe<T>;
    static empty<T>(): IMaybe<T>;
    static liftList<T>(list: Array<IMaybe<T>>): IMaybe<T[]>;
    static flatten<T>(value: IMaybe<IMaybe<T>>): IMaybe<T>;
    static unboxList<T>(list: Array<IMaybe<T>>): T[];
    static coalesce<T>(list: Array<IMaybe<T>>): IMaybe<T>;
    isPresent(): boolean;
    getValue(): T | undefined;
    toProperty<F extends keyof T>(field: F): IMaybe<T[F]>;
    filter(predicate: Predicate<T>): IMaybe<T>;
    map<R>(fn: Fn1<T, R>): IMaybe<R>;
    flatMap<R>(fn: Fn1<T, IMaybe<R>>): IMaybe<R>;
    defaultTo(defaultVal: T): IMaybe<T>;
    defaultToSupplier(fn: () => T): IMaybe<T>;
    orElse(defaultVal: T): T;
    orElseGet(fn: Fn0<T>): T;
    orElseThrow<E extends Error>(fn: Fn0<E>): T | never;
    ifPresent(fn: Fn1<T, void>): IMaybe<T>;
}
