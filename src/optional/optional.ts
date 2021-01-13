import {Callback, Consumer, Fn, Predicate, Supplier} from "../fn/interface";
import {Result, IResult} from "../result";
import {INone, IOptional, ISome} from "./interface";
import {Nullable} from "../types/interface";
import {compose} from "../fn/compose";
import {liftProperty} from "../fn/lift-property";
import {liftTry} from "../fn/lift-try";

export class Optional<T> implements IOptional<T> {
  private constructor(private readonly data: Nullable<T>) {
  }

  public static of<T>(value?: Nullable<T>): IOptional<T> {
    return (new Optional<T>(value) as unknown) as IOptional<T>;
  }

  public static some<T>(value: NonNullable<T>): ISome<T> {
    return Optional.of(value) as ISome<T>;
  }

  public static none<T>(): INone<T> {
    return Optional.of<T>(undefined) as INone<T>;
  }

  public static liftList<T>(list: Array<IOptional<T>>): ISome<T[]> {
    return Optional.some(Optional.unboxList(list));
  }

  public static flatten<T>(value: IOptional<IOptional<T>>): IOptional<T> {
    return value.orElseGet(Optional.none).value;
  }

  public static unboxList<T>(list: Array<IOptional<T>>): T[] {
    return list
      .filter((maybeItem) => maybeItem.isPresent())
      .map((maybeItem) => maybeItem.value as T);
  }

  public static coalesce<T>(list: Array<IOptional<T>>): IOptional<T> {
    for (const item of list) {
      if (item.isPresent()) {
        return item;
      }
    }
    return Optional.none<T>();
  }

  public isPresent(): this is ISome<T> {
    return this.data != null;
  }

  public isEmpty(): this is INone<T> {
    return !this.isPresent();
  }

  public get value(): T | undefined {
    return this.data == null ? undefined : this.data;
  }

  public mapToProperty<F extends keyof T>(field: F): IOptional<Required<T>[F]> {
    return this.flatMap(compose(liftProperty(field), Optional.of));
  }

  public filter(predicate: Predicate<T>): IOptional<T> {
    if (this.data != null && predicate(this.data)) {
      return this;
    }
    return Optional.none();
  }

  public filterProperty<F extends keyof T>(field: F, predicate: Predicate<NonNullable<T[F]>>): IOptional<T> {
    return this.filter((val) => val[field] != null ? predicate(val[field] as NonNullable<T[F]>) : false);
  }

  public map<R>(fn: Fn<T, Nullable<R>>): IOptional<R> {
    if (this.data != null) {
      return Optional.of(fn(this.data));
    }
    return this as any;
  }

  public flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R> {
    if (this.data != null) {
      return fn(this.data);
    }
    return (this as unknown) as IOptional<R>;
  }

  public mapAsync<R>(fn: Fn<T, Promise<Nullable<R>>>): Promise<IOptional<R>> {
    if (this.data != null) {
      return fn(this.data).then((data) => Optional.of(data));
    }
    return Promise.resolve((this as unknown) as IOptional<R>);
  }

  public orElse(defaultVal: null|undefined): INone<T>
  public orElse(defaultVal: NonNullable<T>): ISome<T>
  public orElse(defaultVal: Nullable<T>): IOptional<T> {
    if (this.isEmpty()) {
      return Optional.of(defaultVal);
    }
    return this;
  }

  public orElseGet(fn: Supplier<null|undefined>): INone<T>
  public orElseGet(fn: Supplier<NonNullable<T>>): ISome<T>
  public orElseGet(fn: Supplier<Nullable<T>>): IOptional<T> {
    if (this.isEmpty()) {
      return Optional.of(fn());
    }
    return this;
  }

  public orElseThrow<E extends Error>(fn: Supplier<NonNullable<E>>): ISome<T> | never {
    if (this.isPresent()) {
      return this;
    }
    throw fn();
  }

  public try<R, E>(fn: Fn<T, R>): IOptional<IResult<R, E>> {
    return this.map(liftTry(fn))
  }

  public coalesce(other: ISome<T>): ISome<T>;
  public coalesce(other: IOptional<T>): IOptional<T> {
    if (this.isEmpty()) {
      return other;
    }
    return this;
  }

  public ifPresent(fn: Consumer<T>): IOptional<T> {
    if (this.data != null) {
      fn(this.data);
    }
    return this;
  }

  public ifEmpty(fn: Callback): IOptional<T> {
    if (this.data == null) {
      fn();
    }
    return this;
  }

  public toResult<E>(fn: Supplier<E>): IResult<T, E> {
    if (this.data == null) {
      return Result.error(fn());
    }
    return Result.success(this.data);
  }
}
