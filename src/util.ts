export type Class<T> = new (...args: any[]) => T;
export type Keys<T extends object> = keyof T;

export type Methods<T extends object> = {
  [K in Keys<T>]: T[K] extends Function ? K : never
}[Keys<T>];

export type Fields<T extends object> = {
  [K in Keys<T>]: T[K] extends Function ? never : K
}[Keys<T>];

export type Field<T extends object, K extends Fields<T>> = T[K];
export type Method<T extends object, K extends Methods<T>> = T[K];
