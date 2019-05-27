import {FnUtils, Reducer} from "./fn";

export type TypeGuard<KnownT, MaybeT extends KnownT> = (p: KnownT) => p is MaybeT;

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
  !(field in obj) || validator(obj[field]);

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
  number: isNumber,
  object: isObject,
  optField: validateOptionalField,
  string: isString,
  symbol: isSymbol,
  unknown: isUnknown,
};
