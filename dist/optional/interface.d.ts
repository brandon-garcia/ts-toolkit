import { Callback, Consumer, Fn, Predicate, Supplier } from "../fn/interface";
import { NonNull, TypeGuard } from "../types/interface";
import { IEither } from "../either/interface";
export interface IOptionalBase<T> {
    filter<S extends T>(predicate: TypeGuard<T, S>): IOptional<S>;
    filter(predicate: Predicate<T>): IOptional<T>;
    filterProperty<F extends keyof T>(field: F, predicate: Predicate<T[F]>): IOptional<T>;
    map<R>(fn: Fn<T, R>): IOptional<NonNull<R>>;
    try<R, E>(fn: Fn<T, R>): IOptional<IEither<R, E>>;
    mapToProperty<F extends keyof T>(field: F): IOptional<NonNull<T[F]>>;
    flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R>;
    orElse(defaultVal: T): ISome<T>;
    orElseGet(fn: Supplier<T>): ISome<T>;
    orElseThrow<E extends Error>(fn: Supplier<E>): ISome<T> | never;
    ifPresent(fn: Consumer<T>): IOptional<T>;
    ifEmpty(fn: Callback): IOptional<T>;
}
export interface ISome<T> extends IOptionalBase<T> {
    isPresent(): true;
    isEmpty(): false;
    getValue(): T;
    coalesce(other: IOptionalBase<T>): ISome<T>;
}
export interface INone<T> extends IOptionalBase<T> {
    isPresent(): false;
    isEmpty(): true;
    getValue(): undefined;
    coalesce(other: IOptional<T>): IOptional<T>;
}
export interface IOptional<T> extends IOptionalBase<T> {
    isPresent(): this is ISome<T>;
    isEmpty(): this is INone<T>;
    getValue(): T | undefined;
    coalesce(other: IOptional<T>): IOptional<T>;
}