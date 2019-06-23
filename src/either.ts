import {Consumer, Fn, FnUtils} from "./fn";

export interface IEither<T, E> {
  flatMap<R>(fn: Fn<T, IEither<R, E>>): IEither<R, E>;
  getValue(): T|E;
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

export class Either<T, E> implements IEither<T, E> {
  public static success<T, E>(data: T): ISuccess<T, E> {
    return new Either<T, E>(true, data) as ISuccess<T, E>;
  }

  public static error<T, E>(error: E): IError<T, E> {
    return new Either<T, E>(false, error) as IError<T, E>;
  }

  private constructor(flag: true, data: T)
  private constructor(flag: false, data: E)
  private constructor(private flag: boolean, private data: T|E) {
  }

  public isSuccess(): this is ISuccess<T, E> {
    return this.flag;
  }

  public isError(): this is IError<T, E> {
    return !this.flag;
  }

  public getValue(): T | E {
    return this.data;
  }

  public ifError(consumer: Consumer<E>): IEither<T, E> {
    if (!this.flag) {
      consumer(this.data as E);
    }
    return this;
  }

  public ifSuccess(consumer: Consumer<T>): IEither<T, E> {
    if (this.flag) {
      consumer(this.data as T);
    }
    return this;
  }

  public try<R>(fn: Fn<T, R>): IEither<R, E> {
    return this.flatMap(FnUtils.liftTry(fn));
  }

  public flatMap<R>(fn: Fn<T, IEither<R, E>>): IEither<R, E> {
    if (this.flag) {
      return fn(this.data as T);
    }
    return (this as unknown) as IEither<R, E>;
  }

  public map<R>(fn: Fn<T, R>): IEither<R, E> {
    if (this.flag) {
      return Either.success<R, E>(fn(this.data as T));
    }
    return (this as unknown) as IEither<R, E>;
  }
}
