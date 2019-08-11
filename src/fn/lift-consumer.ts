import {Consumer} from "./interface";

export const liftConsumer = <T> (fn: Consumer<T>) =>
  (param: T) => {
    fn(param);
    return param;
  };
