import { Callback, Consumer, Fn, Predicate, Supplier } from "./fn";
import { NonNull, TypeGuard } from "./types";
interface IOptionBase<T> {
    filter<S extends T>(predicate: TypeGuard<T, S>): IOptional<S>;
    filter(predicate: Predicate<T>): IOptional<T>;
    filterProperty<F extends keyof T>(field: F, predicate: Predicate<T[F]>): IOptional<T>;
    map<R>(fn: Fn<T, R>): IOptional<NonNull<R>>;
    mapToProperty<F extends keyof T>(field: F): IOptional<NonNull<T[F]>>;
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
    coalesce(other: IOptionBase<T>): ISome<T>;
}
interface INone<T> extends IOptionBase<T> {
    isPresent(): false;
    isEmpty(): true;
    getValue(): undefined;
    coalesce(other: IOptional<T>): IOptional<T>;
}
export interface IOptional<T> extends IOptionBase<T> {
    isPresent(): this is ISome<T>;
    isEmpty(): this is INone<T>;
    getValue(): T | undefined;
    coalesce(other: IOptional<T>): IOptional<T>;
}
export declare class Optional<T> implements IOptional<T> {
    private value;
    private constructor();
    static of<T>(value?: T | null | undefined): IOptional<NonNull<T>>;
    static some<T>(value: NonNull<T>): ISome<NonNull<T>>;
    static none<T>(): INone<NonNull<T>>;
    static liftList<T>(list: Array<IOptional<T>>): ISome<T[]>;
    static flatten<T>(value: IOptional<IOptional<T>>): IOptional<T>;
    static unboxList<T>(list: Array<IOptional<T>>): T[];
    static coalesce<T>(list: Array<IOptional<T>>): IOptional<T>;
    isPresent(): this is ISome<T>;
    isEmpty(): this is INone<T>;
    getValue(): T | undefined;
    mapToProperty<F extends keyof T>(field: F): IOptional<NonNull<Required<T>[F]>>;
    filter(predicate: Predicate<T>): IOptional<T>;
    filterProperty<F extends keyof T>(field: F, predicate: Predicate<NonNull<T[F]>>): IOptional<T>;
    map<R>(fn: Fn<T, R>): IOptional<NonNull<R>>;
    flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R>;
    orElse(defaultVal: NonNull<T>): ISome<T>;
    orElseGet(fn: Supplier<NonNull<T>>): ISome<T>;
    orElseThrow<E extends Error>(fn: Supplier<NonNull<E>>): ISome<T> | never;
    coalesce(other: IOptional<T>): IOptional<T>;
    ifPresent(fn: Consumer<T>): IOptional<T>;
    ifEmpty(fn: Callback): IOptional<T>;
}
export {};
