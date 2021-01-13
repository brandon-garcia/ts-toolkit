import {Consumer, Fn, Predicate, Supplier} from "../fn/interface";
import {liftTry} from "../fn/lift-try";
import {IResult, IError, ISuccess} from "./interface";

export class Result<T, E> implements IResult<T, E> {
  public static success<T, E>(data: T): ISuccess<T, E> {
    return new Result<T, E>(true, data) as ISuccess<T, E>;
  }

  public static error<T, E>(error: E): IError<T, E> {
    return new Result<T, E>(false, error) as IError<T, E>;
  }

  public static liftPromise<T>(promise: Promise<T>): Promise<IResult<T, unknown>> {
    return promise.then(
      (data) => Result.success(data),
      (error) => Result.error(error),
    );
  }

  public static unboxPromise<T, E>(promise: Promise<IResult<T, E>>): Promise<T> {
    return promise.then((result) =>
      result
        .ifErrorThrow()
        .value);
  }

  private constructor(flag: true, data: T)
  private constructor(flag: false, data: E)
  private constructor(private readonly flag: boolean, private readonly data: T|E) {
  }

  public isSuccess(): this is ISuccess<T, E> {
    return this.flag;
  }

  public isError(): this is IError<T, E> {
    return !this.flag;
  }

  public get value(): T | E {
    return this.data;
  }

  public ifError(consumer: Consumer<E>): IResult<T, E> {
    if (!this.flag) {
      consumer(this.data as E);
    }
    return this;
  }

  public ifSuccess(consumer: Consumer<T>): IResult<T, E> {
    if (this.flag) {
      consumer(this.data as T);
    }
    return this;
  }

  public ifErrorThrow(): ISuccess<T, E> {
    if (!this.flag) {
      throw this.data;
    }
    return this as ISuccess<T, E>;
  }

  public try<R>(fn: Fn<T, R>): IResult<R, E> {
    return this.flatMap(liftTry(fn));
  }

  public filter(predicate: Predicate<T>, errorFn: Supplier<E>): IResult<T, E> {
    if (this.flag) {
      if (!predicate(this.value as T)) {
        return Result.error(errorFn());
      }
    }
    return this;
  }

  public map<R>(fn: Fn<T, R>): IResult<R, E> {
    if (this.flag) {
      return Result.success(fn(this.data as T));
    }
    return (this as unknown) as IResult<R, E>;
  }

  public flatMap<R>(fn: Fn<T, IResult<R, E>>): IResult<R, E> {
    if (this.flag) {
      return fn(this.data as T);
    }
    return (this as unknown) as IResult<R, E>;
  }

  public flatMapAsync<R>(fn: Fn<T, Promise<IResult<R, E>>>): Promise<IResult<R, E>> {
    if (this.flag) {
      const data = this.data as T;
      return fn(data);
    }
    return Promise.resolve(Result.error(this.data as E));
  }

  public mapError<R>(fn: Fn<E, R>): IResult<T, R> {
    if (this.flag) {
      return (this as unknown) as IResult<T, R>;
    }
    return Result.error(fn(this.data as E));
  }

  public flatMapError<R>(fn: Fn<E, IResult<T, R>>): IResult<T, R> {
    if (this.flag) {
      return (this as unknown) as IResult<T, R>;
    }
    return fn(this.data as E);
  }
}
