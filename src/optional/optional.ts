import {Callback, Consumer, Fn, FnUtils, Predicate, Supplier} from "../fn";
import {IEither} from "../either/interface";
import {INone, IOptional, ISome} from "./interface";
import {Nullable} from "../types/interface";

export class Optional<T> implements IOptional<T> {
  private constructor(private value: Nullable<T>) {
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

  public mapToProperty<F extends keyof T>(field: F): IOptional<Required<T>[F]> {
    return this.flatMap(FnUtils.compose(FnUtils.liftProperty(field), Optional.of));
  }

  public filter(predicate: Predicate<T>): IOptional<T> {
    if (this.value != null && predicate(this.value)) {
      return this;
    }
    this.value = null;
    return this;
  }

  public filterProperty<F extends keyof T>(field: F, predicate: Predicate<NonNullable<T[F]>>): IOptional<T> {
    return this.filter((val) => val[field] != null ? predicate(val[field] as NonNullable<T[F]>) : false);
  }

  public map<R>(fn: Fn<T, Nullable<R>>): IOptional<R> {
    if (this.value != null) {
      ((this as unknown) as Optional<R>).value = fn(this.value);
    }
    return this as any;
  }

  public flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R> {
    if (this.value != null) {
      return fn(this.value);
    }
    return (this as unknown) as IOptional<R>;
  }

  public orElse(defaultVal: NonNullable<T>): ISome<T> {
    if (this.isEmpty()) {
      this.value = defaultVal;
    }
    return this as ISome<T>;
  }

  public orElseGet(fn: Supplier<NonNullable<T>>): ISome<T> {
    if (this.isEmpty()) {
      this.value = fn();
    }
    return this as ISome<T>;
  }

  public orElseThrow<E extends Error>(fn: Supplier<NonNullable<E>>): ISome<T> | never {
    if (this.isPresent()) {
      return this;
    }
    throw fn();
  }

  public try<R, E>(fn: Fn<T, R>): IOptional<IEither<R, E>> {
    return this.map(FnUtils.liftTry(fn))
  }

  public coalesce(other: ISome<T>): ISome<T>;
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

const v = undefined;
const o = Optional.of(v);
