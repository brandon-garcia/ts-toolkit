import {Fn} from "./interface";
import {Either, IEither} from "../either";

export const liftTry = <T, R, E> (fn: Fn<T, R>): Fn<T, IEither<R, E>> =>
  (param: T) => {
    let result: R;
    try {
      result = fn(param);
    } catch (err) {
      return Either.error<R, E>(err);
    }
    return Either.success<R, E>(result);
  };
