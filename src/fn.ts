import {IOptional, Optional} from "./optional";
import {Either, IEither} from "./either";

export type Fn0<R> = () => R;
export type Fn<P1, R> = (p1: P1) => R;
export type Fn2<P1, P2, R> = (p1: P1, p2: P2) => R;
export type Fn3<P1, P2, P3, R> = (p1: P1, p2: P2, p3: P3) => R;
export type Fn4<P1, P2, P3, P4, R> = (p1: P1, p2: P2, p3: P3, p4: P4) => R;
export type Fn5<P1, P2, P3, P4, P5, R> = (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R;
export type Fn6<P1, P2, P3, P4, P5, P6, R> = (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R;
export type Fn7<P1, P2, P3, P4, P5, P6, P7, R> = (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R;
export type Fn8<P1, P2, P3, P4, P5, P6, P7, P8, R> = (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R;

export type AsyncFn0<R> = Fn0<Promise<R>>;
export type AsyncFn<P1, R> = Fn<P1, Promise<R>>;
export type AsyncFn2<P1, P2, R> = Fn2<P1, P2, Promise<R>>;
export type AsyncFn3<P1, P2, P3, R> = Fn3<P1, P2, P3, Promise<R>>;
export type AsyncFn4<P1, P2, P3, P4, R> = Fn4<P1, P2, P3, P4, Promise<R>>;
export type AsyncFn5<P1, P2, P3, P4, P5, R> = Fn5<P1, P2, P3, P4, P5, Promise<R>>;
export type AsyncFn6<P1, P2, P3, P4, P5, P6, R> = Fn6<P1, P2, P3, P4, P5, P6, Promise<R>>;
export type AsyncFn7<P1, P2, P3, P4, P5, P6, P7, R> = Fn7<P1, P2, P3, P4, P5, P6, P7, Promise<R>>;
export type AsyncFn8<P1, P2, P3, P4, P5, P6, P7, P8, R> = Fn8<P1, P2, P3, P4, P5, P6, P7, P8, Promise<R>>;

export type Consumer<T> = Fn<T, void>;
export type Supplier<T> = Fn0<T>;
export type Predicate<T> = Fn<T, boolean>;
export type Reducer<T> = Fn2<T, T, T>;
export type Comparator<T> = Fn2<T, T, -1|0|1>;
export type Callback = Fn0<void>;

const bindInvoker = <T, R> (val: T) =>
  (fn: Fn<T, R>) => fn(val);

const ifElse = <R> (expr: boolean, onTrue: Supplier<R>, onFalse: Supplier<R>): R =>
  expr ? onTrue() : onFalse();

const compose = <T1, T2, T3> (first: Fn<T1, T2>, second: Fn<T2, T3>): Fn<T1, T3> =>
  (param: T1) => second(first(param));

const makeBatchReducer = <T, R> (reducer: Reducer<R>, operations: Fn<T, R>[]): Fn<T, R> =>
  (v: T) => operations
    .map(FnUtils.bindInvoker(v))
    .reduce(reducer);

const partial1 = <T1, R> (p1: T1, fn: Fn<T1, R>) =>
  () => fn(p1);

const partial2 = <T1, T2, R> (p1: T1, fn: Fn2<T1, T2, R>) =>
  (p2: T2) => fn(p1, p2);

const partial3 = <T1, T2, T3, R> (p1: T1, fn: Fn3<T1, T2, T3, R>) =>
  (p2: T2, p3: T3) => fn(p1, p2, p3);

const partial4 = <T1, T2, T3, T4, R> (p1: T1, fn: Fn4<T1, T2, T3, T4, R>) =>
  (p2: T2, p3: T3, p4: T4) => fn(p1, p2, p3, p4);

const doBefore = <F extends (...args: any[]) => any> (fn: F, op: (...args: Parameters<F>) => void) =>
  (...args: Parameters<F>): ReturnType<F> => {
    op(...args);
    return fn(...args);
  };

const doAfter = <F extends (...args: any[]) => any> (fn: F, op: (retval: ReturnType<F>) => void) =>
  (...args: Parameters<F>): ReturnType<F> => {
    const retval = fn(...args);
    op(retval);
    return retval;
  };

const liftConsumer = <T> (fn: Consumer<T>) =>
  (param: T) => {
    fn(param);
    return param;
  };

const liftProperty = <T, F extends keyof T> (field: F) =>
  (param: T) => param[field];

const matchCompose = <T, R, CaseType extends string|number|symbol> (matcher: Fn<T, CaseType>, cases: Record<CaseType, Fn<T, R>>) =>
  (param: T) => cases[ matcher(param) ](param);

const liftNullable = <T, R> (fn: Fn<T, R| null | undefined>): Fn<T, IOptional<R>> =>
  (param: T) => Optional.of(fn(param));

const liftTry = <T, R, E> (fn: Fn<T, R>): Fn<T, IEither<R, E>> =>
  (param: T) => {
    let result: R;
    try {
      result = fn(param);
    } catch (err) {
      return Either.error<R, E>(err);
    }
    return Either.success<R, E>(result);
  };

export const FnUtils = {
  bindInvoker,
  compose,
  doAfter,
  doBefore,
  ifElse,
  liftConsumer,
  liftNullable,
  liftProperty,
  makeBatchReducer,
  matchCompose,
  partial1,
  partial2,
  partial3,
  partial4,
  liftTry,
};

