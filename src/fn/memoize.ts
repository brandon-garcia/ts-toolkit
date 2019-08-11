import {Fn} from "./interface";

const getHasher = <T> (p: T): Fn<T, string> => {
  const typeCode = typeof p;
  if (typeCode === "number" || typeCode === "boolean" || typeCode === "string") {
    return (p) => p.toString();
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
