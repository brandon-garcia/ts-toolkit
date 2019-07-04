import {Callback, Consumer, Fn, FnUtils, Predicate, Supplier} from "../fn";
import {NonNull} from "../types/interface";
import {IEither} from "../either/interface";
import {INone, IOptional, ISome} from "./interface";

export class Optional<T> implements IOptional<T> {
  private constructor(private value: T | null | undefined) {
  }

  public static of<T>(value?: T | null | undefined): IOptional<NonNull<T>> {
    return (new Optional<T>(value) as unknown) as IOptional<NonNull<T>>;
  }

  public static some<T>(value: NonNull<T>): ISome<NonNull<T>> {
    return Optional.of(value) as ISome<NonNull<T>>;
  }

  public static none<T>(): INone<NonNull<T>> {
    return Optional.of<T>() as INone<NonNull<T>>;
  }

  public static liftList<T>(list: Array<IOptional<T>>): ISome<T[]> {
    return Optional.some(Optional.unboxList(list));
  }

  public static flatten<T>(value: IOptional<IOptional<T>>): IOptional<T> {
    return value.orElseGet(Optional.none).getValue();
  }

  public static unboxList<T>(list: Array<IOptional<T>>): T[] {
    return list
      .filter((maybeItem) => maybeItem.isPresent())
      .map((maybeItem) => maybeItem.getValue() as T);
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
    return this.value != null;
  }

  public isEmpty(): this is INone<T> {
    return !this.isPresent();
  }

  public getValue(): T | undefined {
    return this.value == null ? undefined : this.value;
  }

  public mapToProperty<F extends keyof T>(field: F): IOptional<NonNull<Required<T>[F]>> {
    return this.flatMap(FnUtils.compose(FnUtils.liftProperty(field), Optional.of));
  }

  public filter(predicate: Predicate<T>): IOptional<T> {
    if (this.value != null && predicate(this.value)) {
      return this;
    }
    this.value = null;
    return this;
  }

  public filterProperty<F extends keyof T>(field: F, predicate: Predicate<NonNull<T[F]>>): IOptional<T> {
    return this.filter((val) => val[field] != null ? predicate(val[field] as NonNull<T[F]>) : false);
  }

  public map<R>(fn: Fn<T, R>): IOptional<NonNull<R>> {
    if (this.value != null) {
      ((this as unknown) as Optional<R>).value = fn(this.value);
    }
    return (this as unknown) as IOptional<NonNull<R>>;
  }

  public flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R> {
    if (this.value != null) {
      return fn(this.value);
    }
    return (this as unknown) as IOptional<R>;
  }

  public orElse(defaultVal: NonNull<T>): ISome<T> {
    if (this.isEmpty()) {
      this.value = defaultVal;
    }
    return this as ISome<T>;
  }

  public orElseGet(fn: Supplier<NonNull<T>>): ISome<T> {
    if (this.isEmpty()) {
      this.value = fn();
    }
    return this as ISome<T>;
  }

  public orElseThrow<E extends Error>(fn: Supplier<NonNull<E>>): ISome<T> | never {
    if (this.isPresent()) {
      return this;
    }
    throw fn();
  }

  public try<R, E>(fn: Fn<T, R>): IOptional<IEither<R, E>> {
    return this.map(FnUtils.liftTry(fn))
  }

  public coalesce(other: IOptional<T>): IOptional<T> {
    if (this.isEmpty()) {
      return other;
    }
    return this;
  }

  public ifPresent(fn: Consumer<T>): IOptional<T> {
    if (this.value != null) {
      fn(this.value);
    }
    return this;
  }

  public ifEmpty(fn: Callback): IOptional<T> {
    if (this.value == null) {
      fn();
    }
    return this;
  }
}
