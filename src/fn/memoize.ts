import {Fn} from "./interface";
import {TypeUtils} from "../types";

const getHasher = <T> (p: T): Fn<T, string> => {
  if (TypeUtils.number(p) || TypeUtils.boolean(p) || TypeUtils.string(p)) {
    return (p) => (p as any).toString();
  }
  return JSON.stringify;
};

export const memoize = <T, R> (fn: Fn<T, R>): Fn<T, R> => {
  const cache: any = {};
  let hasher: Fn<T, string>;
  return (p) => {
    if (hasher == null) {
      hasher = getHasher(p);
    }
    const hashCode = hasher(p);
    if (!(hashCode in cache)) {
      cache[hashCode] = fn(p);
    }
    return cache[p];
  }
};
