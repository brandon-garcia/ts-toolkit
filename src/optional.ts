import {Fn0, Fn1, Predicate} from "./fn";

export interface IOptional<T> {
  isPresent(): boolean;
  getValue(): T;
  getNullableValue(): T|null;
  toProperty<F extends keyof T>(field: F): IOptional<T[F]>;
  filter(predicate: Predicate<T>): IOptional<T>;
  map<R>(fn: Fn1<T, R>): IOptional<R>;
  flatMap<R>(fn: Fn1<T, IOptional<R>>): IOptional<R>;
  orElse(defaultVal: T): T;
  orElseGet(fn: Fn0<T>): T;
  orElseThrow<E extends Error>(fn: Fn0<E>): T | never;
  ifPresent(fn: Fn1<T, void>): IOptional<T>;
}

export class Optional<T> implements IOptional<T> {
  private constructor(private value: T) {
  }

  public static of<T>(value: T): IOptional<T> {
    return new Optional<T>(value);
  }

  public static ofNullable<T>(value: T | null | undefined): IOptional<T> {
    return value != null ? Optional.of<T>(value) : Optional.empty<T>();
  }

  public static empty<T>(): IOptional<T> {
    return Optional.ofNullable<T>(null);
  }

  public static liftList<T>(list: Array<IOptional<T>>): IOptional<T[]> {
    return Optional.of(Optional.unboxList(list));
  }

  public static flatten<T>(value: IOptional<IOptional<T>>): IOptional<T> {
    return value.orElseGet(Optional.empty);
  }

  public static unboxList<T>(list: Array<IOptional<T>>): T[] {
    return list
      .filter((maybeItem) => maybeItem.isPresent())
      .map((maybeItem) => maybeItem.getValue());
  }

  public static coalesce<T>(list: Array<IOptional<T>>): IOptional<T> {
    for (let i = 0; i < list.length; ++i) {
      if (list[i].isPresent()) {
        return list[i];
      }
    }
    return Optional.empty<T>();
  }

  public isPresent(): boolean {
    return this.value != null;
  }

  public getValue(): T {
    return this.orElseThrow(() => new Error('value must be nonnull'));
  }

  public getNullableValue(): T | null {
    if (this.value == null) {
      return null;
    }
    return this.value;
  }

  public toProperty<F extends keyof T>(field: F): IOptional<T[F]> {
    if (this.value != null) {
      return Optional.ofNullable(this.value[field]);
    }
    return Optional.empty();
  }

  public filter(predicate: Predicate<T>): IOptional<T> {
    if (this.value != null && predicate(this.value)) {
      return this;
    }
    return Optional.empty<T>();
  }

  public map<R>(fn: Fn1<T, R>): IOptional<R> {
    if (this.value != null) {
      const result = fn(this.value);
      return Optional.ofNullable(result);
    }
    return Optional.empty<R>();
  }

  public flatMap<R>(fn: Fn1<T, IOptional<R>>): IOptional<R> {
    if (this.value != null) {
      return fn(this.value);
    }
    return Optional.empty<R>();
  }

  public orElse(defaultVal: T): T {
    if (this.value == null) {
      return defaultVal;
    }
    return this.value;
  }

  public orElseGet(fn: Fn0<T>): T {
    if (this.value == null) {
      return fn();
    }
    return this.value;
  }

  public orElseThrow<E extends Error>(fn: Fn0<E>): T | never {
    if (this.value == null) {
      throw fn();
    }
    return this.value;
  }

  public ifPresent(fn: Fn1<T, void>): IOptional<T> {
    if (this.value != null) {
      fn(this.value);
    }
    return this;
  }
}
