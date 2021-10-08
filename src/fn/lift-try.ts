import {Fn} from "./interface";
import {Result, IResult} from "../result";

export const liftTry = <T, R, E> (fn: Fn<T, R>): Fn<T, IResult<R, E>> =>
  (param: T) => {
    let result: R;
    try {
      result = fn(param);
    } catch (err) {
      return Result.failure<R, E>(err);
    }
    return Result.success<R, E>(result);
  };
