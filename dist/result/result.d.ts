import { Consumer, Fn, Predicate, Supplier } from "../fn/interface";
import { IResult, IFailure, ISuccess } from "./interface";
export declare class Result<T, E> implements IResult<T, E> {
    private readonly flag;
    private readonly data;
    static success<T, E>(data: T): ISuccess<T, E>;
    static failure<T, E>(error: E): IFailure<T, E>;
    private constructor();
    private constructor();
    isSuccess(): this is ISuccess<T, E>;
    isFailure(): this is IFailure<T, E>;
    get value(): T | E;
    ifFailure(consumer: Consumer<E>): IResult<T, E>;
    ifSuccess(consumer: Consumer<T>): IResult<T, E>;
    ifFailureThrow(): ISuccess<T, E>;
    try<R>(fn: Fn<T, R>): IResult<R, E>;
    filter(predicate: Predicate<T>, errorFn: Supplier<E>): IResult<T, E>;
    map<R>(fn: Fn<T, R>): IResult<R, E>;
    flatMap<R>(fn: Fn<T, IResult<R, E>>): IResult<R, E>;
    mapFailure<R>(fn: Fn<E, R>): IResult<T, R>;
    flatMapFailure<R>(fn: Fn<E, IResult<T, R>>): IResult<T, R>;
}
