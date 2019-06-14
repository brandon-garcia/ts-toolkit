import {Callback, Consumer, Fn, Predicate, Supplier} from "./fn";

interface IMaybeBase<T> {
  toProperty<F extends keyof T>(field: F): IMaybe<T[F]>;

  filter(predicate: Predicate<T>): IMaybe<T>;
  map<R>(fn: Fn<T, R>): IMaybe<R>;
  flatMap<R>(fn: Fn<T, IMaybe<R>>): IMaybe<R>;

  defaultTo(defaultVal: T): IMaybe<T>;
  defaultToSupplier(fn: Supplier<T>): IMaybe<T>;

  orElse(defaultVal: T): T;
  orElseGet(fn: Supplier<T>): T;
  orElseThrow<E extends Error>(fn: Supplier<E>): T | never;

  ifPresent(fn: Consumer<T>): IMaybe<T>;
  ifEmpty(fn: Callback): IMaybe<T>;
}

interface ISome<T> extends IMaybeBase<T> {
  isPresent(): true;
  isEmpty(): false;
  getValue(): T;
}

interface INone<T> extends IMaybeBase<T> {
  isPresent(): false;
  isEmpty(): true;
  getValue(): undefined;
}

export interface IMaybe<T> extends IMaybeBase<T> {
  isPresent(): this is ISome<T>;
  isEmpty(): this is INone<T>
  getValue(): T | undefined ;
}

export class Maybe<T> implements IMaybe<T> {
  private constructor(private value: T | null | undefined) {
  }

  public static of<T>(value?: T | null | undefined): IMaybe<T> {
    return new Maybe<T>(value);
  }

  public static empty<T>(): INone<T> {
    return Maybe.of<T>() as INone<T>;
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

  public isPresent(): this is ISome<T> {
    return this.value != null;
  }

  public isEmpty(): this is INone<T> {
    return !this.isPresent();
  }

  public getValue(): T | undefined {
    return this.value == null ? undefined : this.value;
  }

  public toProperty<F extends keyof T>(field: F): IMaybe<T[F]> {
    if (this.value != null) {
      return Maybe.of(this.value[field]);
    }
    return Maybe.empty();
  }

  public filter(predicate: Predicate<T>): IMaybe<T> {
    if (this.value != null && predicate(this.value)) {
      return this;
    }
    return Maybe.empty<T>();
  }

  public map<R>(fn: Fn<T, R>): IMaybe<R> {
    if (this.value != null) {
      const result = fn(this.value);
      return Maybe.of(result);
    }
    return Maybe.empty<R>();
  }

  public flatMap<R>(fn: Fn<T, IMaybe<R>>): IMaybe<R> {
    if (this.value != null) {
      return fn(this.value);
    }
    return Maybe.empty<R>();
  }

  public defaultTo(defaultVal: T): IMaybe<T> {
    if (this.value == null) {
      return Maybe.of(defaultVal);
    }
    return this;
  }

  public defaultToSupplier(fn: () => T): IMaybe<T> {
    if (this.value == null) {
      return Maybe.of(fn());
    }
    return this;
  }

  public orElse(defaultVal: T): T {
    if (this.value == null) {
      return defaultVal;
    }
    return this.value;
  }

  public orElseGet(fn: Supplier<T>): T {
    if (this.value == null) {
      return fn();
    }
    return this.value;
  }

  public orElseThrow<E extends Error>(fn: Supplier<E>): T | never {
    if (this.value == null) {
      throw fn();
    }
    return this.value;
  }

  public ifPresent(fn: Consumer<T>): IMaybe<T> {
    if (this.value != null) {
      fn(this.value);
    }
    return this;
  }

  public ifEmpty(fn: Callback): IMaybe<T> {
    if (this.value == null) {
      fn();
    }
    return this;
  }
}
