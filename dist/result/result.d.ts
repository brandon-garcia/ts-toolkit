import { Consumer, Fn, Predicate, Supplier } from "../fn/interface";
import { IResult, IError, ISuccess } from "./interface";
export declare class Result<T, E> implements IResult<T, E> {
    private readonly flag;
    private readonly data;
    static success<T, E>(data: T): ISuccess<T, E>;
    static error<T, E>(error: E): IError<T, E>;
    static liftPromise<T>(promise: Promise<T>): Promise<IResult<T, unknown>>;
    static unboxPromise<T, E>(promise: Promise<IResult<T, E>>): Promise<T>;
    private constructor();
    private constructor();
    isSuccess(): this is ISuccess<T, E>;
    isError(): this is IError<T, E>;
    get value(): T | E;
    ifError(consumer: Consumer<E>): IResult<T, E>;
    ifSuccess(consumer: Consumer<T>): IResult<T, E>;
    ifErrorThrow(): ISuccess<T, E>;
    try<R>(fn: Fn<T, R>): IResult<R, E>;
    filter(predicate: Predicate<T>, errorFn: Supplier<E>): IResult<T, E>;
    map<R>(fn: Fn<T, R>): IResult<R, E>;
    flatMap<R>(fn: Fn<T, IResult<R, E>>): IResult<R, E>;
    flatMapAsync<R>(fn: Fn<T, Promise<IResult<R, E>>>): Promise<IResult<R, E>>;
    mapError<R>(fn: Fn<E, R>): IResult<T, R>;
    flatMapError<R>(fn: Fn<E, IResult<T, R>>): IResult<T, R>;
}
