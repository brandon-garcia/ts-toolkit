import {Fn0, Fn1, Predicate} from "./fn";

export class Optional<T> {
  private constructor(private value: T) {
  };

  public static of<T>(value: T): Optional<T> {
    return new Optional<T>(value);
  }

  public static ofNullable<T>(value: T | null | undefined): Optional<T> {
    return value != null ? Optional.of<T>(value) : Optional.empty<T>();
  }

  public static empty<T>(): Optional<T> {
    return Optional.ofNullable<T>(null);
  }

  public static coalesce<T>(list: Array<Optional<T>>): Optional<T> {
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

  public filter(predicate: Predicate<T>): Optional<T> {
    if (this.value != null && predicate(this.value)) {
      return this;
    }
    return Optional.empty<T>();
  }

  public map<R>(fn: Fn1<T, R>): Optional<R> {
    if (this.value != null) {
      const result = fn(this.value);
      return Optional.ofNullable(result);
    }
    return Optional.empty<R>();
  }

  public flatMap<R>(fn: Fn1<T, Optional<R>>): Optional<R> {
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

  public ifPresent(fn: Fn1<T, void>): Optional<T> {
    if (this.value != null) {
      fn(this.value);
    }
    return this;
  }
}
