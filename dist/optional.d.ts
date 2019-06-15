import { Callback, Consumer, Fn, Predicate, Supplier } from "./fn";
import { TypeGuard } from "./types";
interface IOptionBase<T> {
    toProperty<F extends keyof T>(field: F): IOptional<T[F]>;
    filter<S extends T>(predicate: TypeGuard<T, S>): IOptional<S>;
    filter(predicate: Predicate<T>): IOptional<T>;
    map<R>(fn: Fn<T, R>): IOptional<R>;
    flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R>;
    orElse(defaultVal: T): ISome<T>;
    orElseGet(fn: Supplier<T>): ISome<T>;
    orElseThrow<E extends Error>(fn: Supplier<E>): ISome<T> | never;
    ifPresent(fn: Consumer<T>): IOptional<T>;
    ifEmpty(fn: Callback): IOptional<T>;
}
interface ISome<T> extends IOptionBase<T> {
    isPresent(): true;
    isEmpty(): false;
    getValue(): T;
}
interface INone<T> extends IOptionBase<T> {
    isPresent(): false;
    isEmpty(): true;
    getValue(): undefined;
}
export interface IOptional<T> extends IOptionBase<T> {
    isPresent(): this is ISome<T>;
    isEmpty(): this is INone<T>;
    getValue(): T | undefined;
}
export declare class Optional<T> implements IOptional<T> {
    private value;
    private constructor();
    static of<T>(value?: T | null | undefined): IOptional<T>;
    static some<T>(value: T): ISome<T>;
    static none<T>(): INone<T>;
    static liftList<T>(list: Array<IOptional<T>>): ISome<T[]>;
    static flatten<T>(value: IOptional<IOptional<T>>): IOptional<T>;
    static unboxList<T>(list: Array<IOptional<T>>): T[];
    static coalesce<T>(list: Array<IOptional<T>>): IOptional<T>;
    isPresent(): this is ISome<T>;
    isEmpty(): this is INone<T>;
    getValue(): T | undefined;
    toProperty<F extends keyof T>(field: F): IOptional<T[F]>;
    filter(predicate: Predicate<T>): IOptional<T>;
    map<R>(fn: Fn<T, R>): IOptional<R>;
    flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R>;
    orElse(defaultVal: T): ISome<T>;
    orElseGet(fn: Supplier<T>): ISome<T>;
    orElseThrow<E extends Error>(fn: Supplier<E>): ISome<T> | never;
    ifPresent(fn: Consumer<T>): IOptional<T>;
    ifEmpty(fn: Callback): IOptional<T>;
}
export {};
