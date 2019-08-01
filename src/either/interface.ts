import {Consumer, Fn} from "../fn/interface";

export interface IEither<T, E> {
  flatMap<R>(fn: Fn<T, IEither<R, E>>): IEither<R, E>;
  readonly value: T|E;
  ifError(consumer: Consumer<E>): IEither<T, E>;
  ifSuccess(consumer: Consumer<T>): IEither<T, E>;
  isError(): this is IError<T, E>;
  isSuccess(): this is ISuccess<T, E>;
  map<R>(fn: Fn<T, R>): IEither<R, E>;
  try<R>(fn: Fn<T, R>): IEither<R, E>;
}

export interface ISuccess<T, E> extends IEither<T, E> {
  readonly value: T;
}

export interface IError<T, E> extends IEither<T, E> {
  readonly value: E;
}

