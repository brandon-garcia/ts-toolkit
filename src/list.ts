
const head = <T> ([first]: T[]) => first;
const tail = <T> ([, ...rest]: T[]) => rest;

export const ListUtils = {
  head,
  tail,
};
