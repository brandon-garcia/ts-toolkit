import {FnUtils, Reducer} from "./fn";

export type TypeGuard<KnownT, MaybeT extends KnownT> = (p: KnownT) => p is MaybeT;

export type NonNull<T> = T extends null | undefined ? Exclude<T, null | undefined> : T;

export type Fields<T> = {
  [K in keyof T]: T[K] extends Function ? never : T[K];
}

export type Methods<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : never;
}

export type FieldNames<T> = Fields<T>[keyof T];
export type MethodNames<T> = Methods<T>[keyof T];

const hasField = <T extends any, FName extends string, FType> (
  obj: T,
  field: FName,
  validator: TypeGuard<unknown, FType>,
): obj is T & Record<FName, FType> =>
  field in obj && validator(obj[field]);

const validateOptionalField = <T extends any, FName extends string, FType> (
  obj: T,
  field: FName,
  validator: TypeGuard<unknown, FType>,
): obj is T & Partial<Record<FName, FType>> =>
  !(field in obj) || obj[field] == null || validator(obj[field]);

const isNumber = <T> (v: T): v is T & number =>
  typeof v === "number";

const isString = <T> (v: T): v is T & string =>
  typeof v === "string";

const isObject = <T> (v: T): v is T & object =>
  typeof v === "object";

const isBoolean = <T> (v: T): v is T & boolean =>
  typeof v === "boolean";

const isNonNull = <T> (v: T|undefined|null): v is T =>
  v != null;

const isNull = <T> (v: T|undefined|null): v is null =>
  v === null;

const isUndefined = <T> (v: T|undefined|null): v is undefined =>
  v === undefined;

const isSymbol = <T> (v: T): v is T & symbol =>
  typeof v === "symbol";

const isFunction = <T> (v: T): v is T & Function =>
  typeof v === "function";

const isUnknown = (v: unknown): v is unknown =>
  true;

const isNonEmptyString = <T> (v: T): v is T & string =>
  isString(v) && v.length > 0;

const composeTypeGuard = <KnownT, MaybeT extends KnownT> (
  reducer: Reducer<boolean>,
  predicates: TypeGuard<KnownT, MaybeT>[],
): TypeGuard<KnownT, MaybeT> =>
  (v: KnownT): v is MaybeT =>
    predicates
      .map(FnUtils.bindInvoker(v))
      .reduce(reducer);

export const TypeUtils = {
  boolean: isBoolean,
  composeTypeGuard,
  field: hasField,
  function: isFunction,
  nonEmptyString: isNonEmptyString,
  nonNull: isNonNull,
  null: isNull,
  undefined: isUndefined,
  number: isNumber,
  object: isObject,
  optField: validateOptionalField,
  string: isString,
  symbol: isSymbol,
  unknown: isUnknown,
};
