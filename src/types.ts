
const hasField = <T extends any, FName extends string, FType> (
  obj: T,
  field: FName,
  validator: (value: unknown) => value is FType,
): obj is T & { [_ in FName]: FType } => {
  return field in obj && validator(obj[field]);
};

const validateOptionalField = <T extends any, FName extends string, FType> (
  obj: T,
  field: FName,
  validator: (value: unknown) => value is FType,
): obj is T & { [_ in FName]?: FType } => {
  return !(field in obj) || validator(obj[field])
};

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

const isUnknown = (v: unknown): v is unknown =>
  true;

const isNonEmptyString = <T> (v: T): v is T & string =>
  isString(v) && v.length > 0;

export const TypeUtils = {
  boolean: isBoolean,
  field: hasField,
  optField: validateOptionalField,
  nonEmptyString: isNonEmptyString,
  nonNull: isNonNull,
  number: isNumber,
  object: isObject,
  string: isString,
  unknown: isUnknown,
};
