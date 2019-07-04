import {IOptional, Optional} from "./optional";

const head = <T> ([first]: T[]) => first;
const tail = <T> ([, ...rest]: T[]) => rest;

const getFirst = <T>(list: T[]): IOptional<T> => {
  if (list.length) {
    return Optional.of(list[0]);
  }
  return Optional.none();
};

export const ListUtils = {
  getFirst,
  head,
  tail,
};
