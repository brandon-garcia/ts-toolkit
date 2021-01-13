import { Callback, Consumer, Fn, Predicate, Supplier } from "../fn/interface";
import { IError, IResult, ISuccess } from "../result/interface";
import { Nullable, TypeGuard } from "../types/interface";
export interface IOptionalBase<T> {
    filter<S extends T>(predicate: TypeGuard<T, S>): IOptional<S>;
    filter(predicate: Predicate<T>): IOptional<T>;
    filterProperty<F extends keyof T>(field: F, predicate: Predicate<T[F]>): IOptional<T>;
    map<R>(fn: Fn<T, Nullable<R>>): IOptional<R>;
    mapAsync<R>(fn: Fn<T, Promise<Nullable<R>>>): Promise<IOptional<R>>;
    try<R, E>(fn: Fn<T, R>): IOptional<IResult<R, E>>;
    mapToProperty<F extends keyof T>(field: F): IOptional<T[F]>;
    flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R>;
    orElse(defaultVal: NonNullable<T>): ISome<T>;
    orElse(defaultVal: Nullable<T>): IOptional<T>;
    orElseGet(fn: Supplier<NonNullable<T>>): ISome<T>;
    orElseGet(fn: Supplier<Nullable<T>>): IOptional<T>;
    orElseThrow<E extends Error>(fn: Supplier<E>): ISome<T> | never;
    ifPresent(fn: Consumer<T>): IOptional<T>;
    ifEmpty(fn: Callback): IOptional<T>;
    toResult<E>(fn: Supplier<E>): IResult<T, E>;
}
export interface ISome<T> extends IOptionalBase<T> {
    isPresent(): true;
    isEmpty(): false;
    readonly value: T;
    ifPresent(fn: Consumer<T>): ISome<T>;
    ifEmpty(fn: Callback): ISome<T>;
    map<R>(fn: Fn<T, NonNullable<R>>): ISome<R>;
    map<R>(fn: Fn<T, Nullable<R>>): IOptional<R>;
    mapAsync<R>(fn: Fn<T, Promise<Nullable<R>>>): Promise<IOptional<R>>;
    mapAsync<R>(fn: Fn<T, Promise<NonNullable<R>>>): Promise<ISome<R>>;
    orElse(defaultVal: undefined | null): ISome<T>;
    orElse(defaultVal: NonNullable<T>): ISome<T>;
    orElse(defaultVal: Nullable<T>): ISome<T>;
    orElseGet(fn: Supplier<undefined | null>): ISome<T>;
    orElseGet(fn: Supplier<NonNullable<T>>): ISome<T>;
    orElseGet(fn: Supplier<Nullable<T>>): ISome<T>;
    orElseThrow<E extends Error>(fn: Supplier<E>): ISome<T>;
    coalesce(other: IOptionalBase<T>): ISome<T>;
    toResult<E>(fn: Supplier<E>): ISuccess<T, E>;
}
export interface INone<T> extends IOptionalBase<T> {
    isPresent(): false;
    isEmpty(): true;
    readonly value: undefined;
    filter<S extends T>(predicate: TypeGuard<T, S>): INone<S>;
    filter(predicate: Predicate<T>): INone<T>;
    ifPresent(fn: Consumer<T>): INone<T>;
    ifEmpty(fn: Callback): INone<T>;
    map<R>(fn: Fn<T, Nullable<R>>): INone<R>;
    mapAsync<R>(fn: Fn<T, Promise<Nullable<R>>>): Promise<INone<R>>;
    mapAsync<R>(fn: Fn<T, Promise<NonNullable<R>>>): Promise<INone<R>>;
    mapToProperty<F extends keyof T>(field: F): INone<T[F]>;
    coalesce(other: ISome<T>): ISome<T>;
    coalesce(other: INone<T>): INone<T>;
    coalesce(other: IOptional<T>): IOptional<T>;
    toResult<E>(fn: Supplier<E>): IError<T, E>;
}
export interface IOptional<T> extends IOptionalBase<T> {
    isPresent(): this is ISome<T>;
    isEmpty(): this is INone<T>;
    readonly value: T | undefined;
    coalesce(other: ISome<T>): ISome<T>;
    coalesce(other: IOptional<T>): IOptional<T>;
}
