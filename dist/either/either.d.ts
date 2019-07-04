import { IEither, IError, ISuccess } from "./interface";
import { Consumer, Fn } from "../fn";
export declare class Either<T, E> implements IEither<T, E> {
    private flag;
    private data;
    static success<T, E>(data: T): ISuccess<T, E>;
    static error<T, E>(error: E): IError<T, E>;
    private constructor();
    private constructor();
    isSuccess(): this is ISuccess<T, E>;
    isError(): this is IError<T, E>;
    getValue(): T | E;
    ifError(consumer: Consumer<E>): IEither<T, E>;
    ifSuccess(consumer: Consumer<T>): IEither<T, E>;
    try<R>(fn: Fn<T, R>): IEither<R, E>;
    flatMap<R>(fn: Fn<T, IEither<R, E>>): IEither<R, E>;
    map<R>(fn: Fn<T, R>): IEither<R, E>;
}
