import { Consumer, Fn, Predicate, Supplier } from "../fn/interface";
export interface IResult<T, E> {
    readonly value: T | E;
    ifError(consumer: Consumer<E>): IResult<T, E>;
    ifSuccess(consumer: Consumer<T>): IResult<T, E>;
    ifErrorThrow(): ISuccess<T, E>;
    isError(): this is IError<T, E>;
    isSuccess(): this is ISuccess<T, E>;
    filter(predicate: Predicate<T>, errorFn: Supplier<E>): IResult<T, E>;
    map<R>(fn: Fn<T, R>): IResult<R, E>;
    flatMap<R>(fn: Fn<T, IResult<R, E>>): IResult<R, E>;
    try<R>(fn: Fn<T, R>): IResult<R, E>;
    mapError<R>(fn: Fn<E, R>): IResult<T, R>;
    flatMapError<R>(fn: Fn<E, IResult<T, R>>): IResult<T, R>;
}
export interface ISuccess<T, E> extends IResult<T, E> {
    readonly value: T;
    map<R>(fn: Fn<T, R>): ISuccess<R, E>;
    mapError<R>(fn: Fn<E, R>): ISuccess<T, R>;
    flatMapError<R>(fn: Fn<E, IResult<T, R>>): ISuccess<T, R>;
}
export interface IError<T, E> extends IResult<T, E> {
    readonly value: E;
    map<R>(fn: Fn<T, R>): IError<R, E>;
    mapError<R>(fn: Fn<E, R>): IError<T, R>;
    flatMapError<R>(fn: Fn<E, IResult<T, R>>): IResult<T, R>;
}
