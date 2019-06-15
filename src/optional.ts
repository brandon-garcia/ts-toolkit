import {Callback, Consumer, Fn, Predicate, Supplier} from "./fn";

interface IOptionBase<T> {
  toProperty<F extends keyof T>(field: F): IOptional<T[F]>;

  filter(predicate: Predicate<T>): IOptional<T>;
  map<R>(fn: Fn<T, R>): IOptional<R>;
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
}

interface INone<T> extends IOptionBase<T> {
  isPresent(): false;
  isEmpty(): true;
  getValue(): undefined;
}

export interface IOptional<T> extends IOptionBase<T> {
  isPresent(): this is ISome<T>;
  isEmpty(): this is INone<T>
  getValue(): T | undefined ;
}

export class Optional<T> implements IOptional<T> {
  private constructor(private value: T | null | undefined) {
  }

  public static of<T>(value?: T | null | undefined): IOptional<T> {
    return new Optional<T>(value);
  }

  public static some<T>(value: T): ISome<T> {
    return Optional.of(value) as ISome<T>;
  }

  public static none<T>(): INone<T> {
    return Optional.of<T>() as INone<T>;
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
    for (let i = 0; i < list.length; ++i) {
      if (list[i].isPresent()) {
        return list[i];
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

  public toProperty<F extends keyof T>(field: F): IOptional<T[F]> {
    if (this.value != null) {
      return Optional.of(this.value[field]);
    }
    return Optional.none();
  }

  public filter(predicate: Predicate<T>): IOptional<T> {
    if (this.value != null && predicate(this.value)) {
      return this;
    }
    return Optional.none<T>();
  }

  public map<R>(fn: Fn<T, R>): IOptional<R> {
    if (this.value != null) {
      const result = fn(this.value);
      return Optional.of(result);
    }
    return Optional.none<R>();
  }

  public flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R> {
    if (this.value != null) {
      return fn(this.value);
    }
    return Optional.none<R>();
  }

  public orElse(defaultVal: T): ISome<T> {
    if (this.isPresent()) {
      return this;
    }
    return Optional.some(defaultVal);
  }

  public orElseGet(fn: Supplier<T>): ISome<T> {
    if (this.isPresent()) {
      return this;
    }
    return Optional.some(fn());
  }

  public orElseThrow<E extends Error>(fn: Supplier<E>): ISome<T> | never {
    if (this.isPresent()) {
      return this;
    }
    throw fn();
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
