import {IOptional, Optional} from "../optional";
import {Either, IEither} from "../either";
import {Consumer, Fn, Fn2, Fn3, Fn4, Reducer, Supplier} from "./interface";
import {Nullable} from "../types";

const bindInvoker = <T, R> (val: T) =>
  (fn: Fn<T, R>) => fn(val);

const ifElse = <R> (expr: boolean, onTrue: Supplier<R>, onFalse: Supplier<R>): R =>
  expr ? onTrue() : onFalse();

const compose = <T1, T2, T3 = T2, T4 = T3, T5 = T4, T6 = T5, T7 = T6, T8 = T7, T9 = T8, T10 = T9, T11 = T10> (
  f1: Fn<T1, T2>,
  f2: Fn<T2, T3>,
  f3?: Fn<T3, T4>,
  f4?: Fn<T4, T5>,
  f5?: Fn<T5, T6>,
  f6?: Fn<T6, T7>,
  f7?: Fn<T7, T8>,
  f8?: Fn<T8, T9>,
  f9?: Fn<T9, T10>,
  f10?: Fn<T10, T11>,
): Fn<T1, T11> => {
  if (f3) {
    if (f4) {
      if (f5) {
        if (f6) {
          if (f7) {
            if (f8) {
              if (f9) {
                if (f10) {
                  return (p) => f10(f9(f8(f7(f6(f5(f4(f3(f2(f1(p))))))))));
                }
                return (p) => f9(f8(f7(f6(f5(f4(f3(f2(f1(p))))))))) as any;
              }
              return (p) => f8(f7(f6(f5(f4(f3(f2(f1(p)))))))) as any;
            }
            return (p) => f7(f6(f5(f4(f3(f2(f1(p))))))) as any;
          }
          return (p) => f6(f5(f4(f3(f2(f1(p)))))) as any;
        }
        return (p) => f5(f4(f3(f2(f1(p))))) as any;
      }
      return (p) => f4(f3(f2(f1(p)))) as any;
    }
    return (p) => f3(f2(f1(p))) as any;
  }
  return (p) => f2(f1(p)) as any;
};

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

const liftNullable = <T, R> (fn: Fn<T, Nullable<R>>): Fn<T, IOptional<R>> =>
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

