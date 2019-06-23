import { Consumer, Fn } from "./fn";
export interface IEither<T, E> {
    flatMap<R>(fn: Fn<T, IEither<R, E>>): IEither<R, E>;
    getValue(): T | E;
    ifError(consumer: Consumer<E>): IEither<T, E>;
    ifSuccess(consumer: Consumer<T>): IEither<T, E>;
    isError(): this is IError<T, E>;
    isSuccess(): this is ISuccess<T, E>;
    map<R>(fn: Fn<T, R>): IEither<R, E>;
    try<R>(fn: Fn<T, R>): IEither<R, E>;
}
interface ISuccess<T, E> extends IEither<T, E> {
    getValue(): T;
}
interface IError<T, E> extends IEither<T, E> {
    getValue(): E;
}
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
export {};
