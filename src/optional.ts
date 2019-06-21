import {Callback, Consumer, Fn, FnUtils, Predicate, Supplier} from "./fn";
import {NonNull, TypeGuard} from "./types";

interface IOptionBase<T> {
  filter<S extends T>(predicate: TypeGuard<T, S>): IOptional<S>;
  filter(predicate: Predicate<T>): IOptional<T>;

  filterProperty<F extends keyof T>(field: F, predicate: Predicate<T[F]>): IOptional<T>;

  map<R>(fn: Fn<T, R>): IOptional<NonNull<R>>;
  mapToProperty<F extends keyof T>(field: F): IOptional<NonNull<T[F]>>;
  flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R>;

  orElse(defaultVal: T): ISome<T>;
  orElseGet(fn: Supplier<T>): ISome<T>;
  orElseThrow<E extends Error>(fn: Supplier<E>): ISome<T> | never;

  ifPresent(fn: Consumer<T>): IOptional<T>;
  ifEmpty(fn: Callback): IOptional<T>;
}

interface ISome<T> extends IOptionBase<T> {
  isPresent(): true;
  isEmpty(): false;
  getValue(): T;

  coalesce(other: IOptionBase<T>): ISome<T>
}

interface INone<T> extends IOptionBase<T> {
  isPresent(): false;
  isEmpty(): true;
  getValue(): undefined;

  coalesce(other: IOptional<T>): IOptional<T>;
}

export interface IOptional<T> extends IOptionBase<T> {
  isPresent(): this is ISome<T>;
  isEmpty(): this is INone<T>
  getValue(): T | undefined;

  coalesce(other: IOptional<T>): IOptional<T>;
}

export class Optional<T> implements IOptional<T> {
  private constructor(private value: T | null | undefined) {
  }

  public static of<T>(value?: T | null | undefined): IOptional<NonNull<T>> {
    return (new Optional<T>(value) as any) as IOptional<NonNull<T>>;
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
    return Optional.none<T>();
  }

  public filterProperty<F extends keyof T>(field: F, predicate: Predicate<NonNull<T[F]>>): IOptional<T> {
    return this.filter((val) => val[field] != null ? predicate(val[field] as NonNull<T[F]>) : false);
  }

  public map<R>(fn: Fn<T, R>): IOptional<NonNull<R>> {
    if (this.value != null) {
      return Optional.of( fn(this.value) );
    }
    return Optional.none<R>();
  }

  public flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R> {
    if (this.value != null) {
      return fn(this.value);
    }
    return Optional.none<R>();
  }

  public orElse(defaultVal: NonNull<T>): ISome<T> {
    if (this.isPresent()) {
      return this;
    }
    return Optional.some(defaultVal);
  }

  public orElseGet(fn: Supplier<NonNull<T>>): ISome<T> {
    if (this.isPresent()) {
      return this;
    }
    return Optional.some(fn());
  }

  public orElseThrow<E extends Error>(fn: Supplier<NonNull<E>>): ISome<T> | never {
    if (this.isPresent()) {
      return this;
    }
    throw fn();
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
