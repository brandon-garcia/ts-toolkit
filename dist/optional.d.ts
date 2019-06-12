import { Fn0, Fn1, Predicate, Supplier } from "./fn";
export interface IOptional<T> {
    isPresent(): boolean;
    getValue(): T | undefined;
    toProperty<F extends keyof T>(field: F): IOptional<T[F]>;
    filter(predicate: Predicate<T>): IOptional<T>;
    map<R>(fn: Fn1<T, R>): IOptional<R>;
    flatMap<R>(fn: Fn1<T, IOptional<R>>): IOptional<R>;
    defaultTo(defaultVal: T): IOptional<T>;
    defaultToSupplier(fn: Supplier<T>): IOptional<T>;
    orElse(defaultVal: T): T;
    orElseGet(fn: Fn0<T>): T;
    orElseThrow<E extends Error>(fn: Fn0<E>): T | never;
    ifPresent(fn: Fn1<T, void>): IOptional<T>;
}
export declare class Optional<T> implements IOptional<T> {
    private value;
    private constructor();
    static of<T>(value: T): IOptional<T>;
    static ofNullable<T>(value?: T | null | undefined): IOptional<T>;
    static empty<T>(): IOptional<T>;
    static liftList<T>(list: Array<IOptional<T>>): IOptional<T[]>;
    static flatten<T>(value: IOptional<IOptional<T>>): IOptional<T>;
    static unboxList<T>(list: Array<IOptional<T>>): T[];
    static coalesce<T>(list: Array<IOptional<T>>): IOptional<T>;
    isPresent(): boolean;
    getValue(): T | undefined;
    toProperty<F extends keyof T>(field: F): IOptional<T[F]>;
    filter(predicate: Predicate<T>): IOptional<T>;
    map<R>(fn: Fn1<T, R>): IOptional<R>;
    flatMap<R>(fn: Fn1<T, IOptional<R>>): IOptional<R>;
    defaultTo(defaultVal: T): IOptional<T>;
    defaultToSupplier(fn: () => T): IOptional<T>;
    orElse(defaultVal: T): T;
    orElseGet(fn: Fn0<T>): T;
    orElseThrow<E extends Error>(fn: Fn0<E>): T | never;
    ifPresent(fn: Fn1<T, void>): IOptional<T>;
}
