import {Fn0, Fn1, Predicate, Supplier} from "./fn";

export interface IMaybe<T> {
  isPresent(): boolean;

  getValue(): T | undefined ;

  toProperty<F extends keyof T>(field: F): IMaybe<T[F]>;

  filter(predicate: Predicate<T>): IMaybe<T>;
  map<R>(fn: Fn1<T, R>): IMaybe<R>;
  flatMap<R>(fn: Fn1<T, IMaybe<R>>): IMaybe<R>;

  defaultTo(defaultVal: T): IMaybe<T>;
  defaultToSupplier(fn: Supplier<T>): IMaybe<T>;

  orElse(defaultVal: T): T;
  orElseGet(fn: Fn0<T>): T;
  orElseThrow<E extends Error>(fn: Fn0<E>): T | never;

  ifPresent(fn: Fn1<T, void>): IMaybe<T>;
}

export class Maybe<T> implements IMaybe<T> {
  private constructor(private value: T) {
  }

  public static of<T>(value: T): IMaybe<T> {
    return new Maybe<T>(value);
  }

  public static ofNullable<T>(value?: T | null | undefined): IMaybe<T> {
    return value != null ? Maybe.of<T>(value) : Maybe.empty<T>();
  }

  public static empty<T>(): IMaybe<T> {
    return Maybe.ofNullable<T>();
  }

  public static liftList<T>(list: Array<IMaybe<T>>): IMaybe<T[]> {
    return Maybe.of(Maybe.unboxList(list));
  }

  public static flatten<T>(value: IMaybe<IMaybe<T>>): IMaybe<T> {
    return value.orElseGet(Maybe.empty);
  }

  public static unboxList<T>(list: Array<IMaybe<T>>): T[] {
    return list
      .filter((maybeItem) => maybeItem.isPresent())
      .map((maybeItem) => maybeItem.getValue() as T);
  }

  public static coalesce<T>(list: Array<IMaybe<T>>): IMaybe<T> {
    for (let i = 0; i < list.length; ++i) {
      if (list[i].isPresent()) {
        return list[i];
      }
    }
    return Maybe.empty<T>();
  }

  public isPresent(): boolean {
    return this.value != null;
  }

  public getValue(): T | undefined {
    return this.value;
  }

  public toProperty<F extends keyof T>(field: F): IMaybe<T[F]> {
    if (this.value != null) {
      return Maybe.ofNullable(this.value[field]);
    }
    return Maybe.empty();
  }

  public filter(predicate: Predicate<T>): IMaybe<T> {
    if (this.value != null && predicate(this.value)) {
      return this;
    }
    return Maybe.empty<T>();
  }

  public map<R>(fn: Fn1<T, R>): IMaybe<R> {
    if (this.value != null) {
      const result = fn(this.value);
      return Maybe.ofNullable(result);
    }
    return Maybe.empty<R>();
  }

  public flatMap<R>(fn: Fn1<T, IMaybe<R>>): IMaybe<R> {
    if (this.value != null) {
      return fn(this.value);
    }
    return Maybe.empty<R>();
  }

  public defaultTo(defaultVal: T): IMaybe<T> {
    if (this.value == null) {
      return Maybe.ofNullable(defaultVal);
    }
    return this;
  }

  public defaultToSupplier(fn: () => T): IMaybe<T> {
    if (this.value == null) {
      return Maybe.ofNullable(fn());
    }
    return this;
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

  public ifPresent(fn: Fn1<T, void>): IMaybe<T> {
    if (this.value != null) {
      fn(this.value);
    }
    return this;
  }
}
