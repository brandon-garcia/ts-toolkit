import { Reducer } from "../fn";
import { TypeGuard, TypeGuardType } from "./interface";
declare type ResolvedSchema<T extends Record<string, TypeGuard<unknown, unknown>>> = {
    [F in keyof T]: TypeGuardType<T[F]>;
};
export declare const TypeUtils: {
    boolean: <T>(v: T) => v is (T & false) | (T & true);
    composeTypeGuard: <KnownT, MaybeT extends KnownT>(reducer: Reducer<boolean>, predicates: TypeGuard<KnownT, MaybeT>[]) => TypeGuard<KnownT, MaybeT>;
    field: <T_1 extends unknown, FName extends string, FType extends KnownFType, KnownFType = unknown>(obj: T_1, field: FName, validator: TypeGuard<KnownFType, FType>) => obj is T_1 & Record<FName, FType>;
    fields: <T_2 extends unknown, Schema extends Record<string, TypeGuard<unknown, unknown>>>(obj: T_2, schema: Schema) => obj is T_2 & ResolvedSchema<Schema>;
    function: <T_3>(v: T_3) => v is T_3 & Function;
    nonEmptyString: <T_4>(v: T_4) => v is T_4 & string;
    nonNull: <T_5>(v: T_5 | null | undefined) => v is T_5;
    null: <T_6>(v: T_6 | null | undefined) => v is null;
    undefined: <T_7>(v: T_7 | null | undefined) => v is undefined;
    number: <T_8>(v: T_8) => v is T_8 & number;
    object: <T_9>(v: T_9) => v is T_9 & object;
    optField: <T_10 extends unknown, FName_1 extends string, FType_1>(obj: T_10, field: FName_1, validator: TypeGuard<unknown, FType_1>) => obj is T_10 & Partial<Record<FName_1, FType_1>>;
    string: <T_11>(v: T_11) => v is T_11 & string;
    symbol: <T_12>(v: T_12) => v is T_12 & symbol;
    unknown: (v: unknown) => v is unknown;
    array: <T_13, A>(v: T_13, itemValidator: TypeGuard<unknown, A>) => v is T_13 & A[];
    stringArray: <T_14>(v: T_14) => v is T_14 & string[];
    numberArray: <T_15>(v: T_15) => v is T_15 & number[];
};
export {};
