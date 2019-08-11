
export const liftProperty = <T, F extends keyof T> (field: F) =>
  (param: T) => param[field];
