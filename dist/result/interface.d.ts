import { Consumer, Fn, Predicate, Supplier } from "../fn/interface";
export interface IResult<T, E> {
    readonly value: T | E;
    ifFailure(consumer: Consumer<E>): IResult<T, E>;
    ifSuccess(consumer: Consumer<T>): IResult<T, E>;
    ifFailureThrow(): ISuccess<T, E>;
    isFailure(): this is IFailure<T, E>;
    isSuccess(): this is ISuccess<T, E>;
    filter(predicate: Predicate<T>, errorFn: Supplier<E>): IResult<T, E>;
    map<R>(fn: Fn<T, R>): IResult<R, E>;
    flatMap<R>(fn: Fn<T, IResult<R, E>>): IResult<R, E>;
    try<R>(fn: Fn<T, R>): IResult<R, E>;
    mapFailure<R>(fn: Fn<E, R>): IResult<T, R>;
    flatMapFailure<R>(fn: Fn<E, IResult<T, R>>): IResult<T, R>;
}
export interface ISuccess<T, E> extends IResult<T, E> {
    readonly value: T;
    map<R>(fn: Fn<T, R>): ISuccess<R, E>;
    mapFailure<R>(fn: Fn<E, R>): ISuccess<T, R>;
    flatMapFailure<R>(fn: Fn<E, IResult<T, R>>): ISuccess<T, R>;
}
export interface IFailure<T, E> extends IResult<T, E> {
    readonly value: E;
    map<R>(fn: Fn<T, R>): IFailure<R, E>;
    mapFailure<R>(fn: Fn<E, R>): IFailure<T, R>;
    flatMapFailure<R>(fn: Fn<E, IResult<T, R>>): IResult<T, R>;
}
