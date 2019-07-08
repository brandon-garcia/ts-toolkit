import {FnUtils, Reducer} from "../fn";
import {TypeGuard, TypeGuardType} from "./interface";

type ResolvedSchema<T extends Record<string, TypeGuard<unknown, unknown>>> = {
  [F in keyof T]: TypeGuardType<T[F]>
};

const hasField = <T extends any, FName extends string, FType> (
  obj: T,
  field: FName,
  validator: TypeGuard<unknown, FType>,
): obj is T & Record<FName, FType> =>
  isObject(obj) &&
  field in obj &&
  isNonNull(obj[field]) &&
  validator(obj[field]);

const hasFields = <T extends unknown, Schema extends Record<string, TypeGuard<unknown, unknown>>> (
  obj: T,
  schema: Schema
): obj is T & ResolvedSchema<Schema> => {
  for (const fieldName in schema) {
    if (schema.hasOwnProperty(fieldName) && isFunction(schema[fieldName])) {
      if (!hasField(obj, fieldName, schema[fieldName])) {
        return false;
      }
    }
  }
  return true;
};

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
  v != null && typeof v === "object";

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
  fields: hasFields,
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
