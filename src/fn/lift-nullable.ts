import {Fn} from "./interface";
import {Nullable} from "../types";
import {IOptional, Optional} from "../optional";

export const liftNullable = <T, R> (fn: Fn<T, Nullable<R>>): Fn<T, IOptional<R>> =>
  (param: T) => Optional.of(fn(param));
