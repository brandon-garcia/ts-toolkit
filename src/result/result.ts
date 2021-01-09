import {IResult, IError, ISuccess} from "./interface";
import {Consumer, Fn} from "../fn/interface";
import {liftTry} from "../fn/lift-try";

export class Result<T, E> implements IResult<T, E> {
  public static success<T, E>(data: T): ISuccess<T, E> {
    return new Result<T, E>(true, data) as ISuccess<T, E>;
  }

  public static error<T, E>(error: E): IError<T, E> {
    return new Result<T, E>(false, error) as IError<T, E>;
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

  public try<R>(fn: Fn<T, R>): IResult<R, E> {
    return this.flatMap(liftTry(fn));
  }

  public flatMap<R>(fn: Fn<T, IResult<R, E>>): IResult<R, E> {
    if (this.flag) {
      return fn(this.data as T);
    }
    return (this as unknown) as IResult<R, E>;
  }

  public map<R>(fn: Fn<T, R>): IResult<R, E> {
    if (this.flag) {
      return Result.success(fn(this.data as T));
    }
    return (this as unknown) as IResult<R, E>;
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
