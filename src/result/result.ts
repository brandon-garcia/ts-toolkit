import {Consumer, Fn, Predicate, Supplier} from "../fn/interface";
import {liftTry} from "../fn/lift-try";
import {IResult, IFailure, ISuccess} from "./interface";

export class Result<T, E> implements IResult<T, E> {
  public static success<T, E>(data: T): ISuccess<T, E> {
    return new Result<T, E>(true, data) as ISuccess<T, E>;
  }

  public static failure<T, E>(error: E): IFailure<T, E> {
    return new Result<T, E>(false, error) as IFailure<T, E>;
  }

  private constructor(flag: true, data: T)
  private constructor(flag: false, data: E)
  private constructor(private readonly flag: boolean, private readonly data: T|E) {
  }

  public isSuccess(): this is ISuccess<T, E> {
    return this.flag;
  }

  public isFailure(): this is IFailure<T, E> {
    return !this.flag;
  }

  public get value(): T | E {
    return this.data;
  }

  public ifFailure(consumer: Consumer<E>): IResult<T, E> {
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

  public ifFailureThrow(): ISuccess<T, E> {
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
        return Result.failure(errorFn());
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

  public mapFailure<R>(fn: Fn<E, R>): IResult<T, R> {
    if (this.flag) {
      return (this as unknown) as IResult<T, R>;
    }
    return Result.failure(fn(this.data as E));
  }

  public flatMapFailure<R>(fn: Fn<E, IResult<T, R>>): IResult<T, R> {
    if (this.flag) {
      return (this as unknown) as IResult<T, R>;
    }
    return fn(this.data as E);
  }
}
