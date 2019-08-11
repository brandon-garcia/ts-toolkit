import {Fn} from "./interface";

export const liftParam = <T, R> (val: T) =>
  (fn: Fn<T, R>) => fn(val);
