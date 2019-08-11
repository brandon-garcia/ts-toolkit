import {IOptional, Optional} from "../optional";
import {Fn, Fn2, Fn3, Fn4, Reducer, Supplier} from "./interface";
import {Nullable} from "../types";
import {compose} from "./compose";
import {liftConsumer} from "./lift-consumer";
import {liftProperty} from "./lift-property";
import {liftTry} from "./lift-try";
import {liftParam} from "./lift-param";

const ifElse = <R> (expr: boolean, onTrue: Supplier<R>, onFalse: Supplier<R>): R =>
  expr ? onTrue() : onFalse();

const makeBatchReducer = <T, R> (reducer: Reducer<R>, operations: Fn<T, R>[]): Fn<T, R> =>
  (v: T) => operations
    .map(liftParam(v))
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

const matchCompose = <T, R, CaseType extends string|number|symbol> (matcher: Fn<T, CaseType>, cases: Record<CaseType, Fn<T, R>>) =>
  (param: T) => cases[ matcher(param) ](param);

const liftNullable = <T, R> (fn: Fn<T, Nullable<R>>): Fn<T, IOptional<R>> =>
  (param: T) => Optional.of(fn(param));

const partialFactory = <T extends object, Provided extends Partial<T>> (common: Provided) =>
  (remaining: Exclude<T, Provided>): T => ({
    ...common,
    ...remaining,
  });

export const FnUtils = {
  compose,
  doAfter,
  doBefore,
  ifElse,
  liftConsumer,
  liftNullable,
  liftParam,
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

