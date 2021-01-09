import { IResult, IError, ISuccess } from "./interface";
import { Consumer, Fn } from "../fn/interface";
export declare class Result<T, E> implements IResult<T, E> {
    private readonly flag;
    private readonly data;
    static success<T, E>(data: T): ISuccess<T, E>;
    static error<T, E>(error: E): IError<T, E>;
    private constructor();
    private constructor();
    isSuccess(): this is ISuccess<T, E>;
    isError(): this is IError<T, E>;
    get value(): T | E;
    ifError(consumer: Consumer<E>): IResult<T, E>;
    ifSuccess(consumer: Consumer<T>): IResult<T, E>;
    try<R>(fn: Fn<T, R>): IResult<R, E>;
    flatMap<R>(fn: Fn<T, IResult<R, E>>): IResult<R, E>;
    map<R>(fn: Fn<T, R>): IResult<R, E>;
    mapError<R>(fn: Fn<E, R>): IResult<T, R>;
    flatMapError<R>(fn: Fn<E, IResult<T, R>>): IResult<T, R>;
}
