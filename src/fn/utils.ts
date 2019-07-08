import {IOptional, Optional} from "../optional";
import {Either, IEither} from "../either";
import {Consumer, Fn, Fn2, Fn3, Fn4, Reducer, Supplier} from "./interface";

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

const partialFactory = <T extends object, Provided extends Partial<T>> (common: Provided) =>
  (remaining: Exclude<T, Provided>): T => ({
    ...common,
    ...remaining,
  });

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
  partialFactory,
};

