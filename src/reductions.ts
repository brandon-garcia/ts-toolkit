
export const NumberReducers = {
  max: (first: number, second: number) => Math.max(first, second),
  min: (first: number, second: number) => Math.min(first, second),
  sum: (first: number, second: number) => first + second,
  product: (first: number, second: number) => first * second,
};

export const BoolReducers = {
  and: (first: boolean, second: boolean) => first && second,
  or: (first: boolean, second: boolean) => first || second,
};

export const StringReducers = {
  makeConcatReducer: (separator: string) => (first: string, second: string) => first + separator + second,
  concat: (first: string, second: string) => first + second,
};
