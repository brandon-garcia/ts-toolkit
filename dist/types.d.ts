export declare type TypeGuard<KnownT, MaybeT extends KnownT> = (p: KnownT) => p is MaybeT;
export declare type Fields<T> = {
    [K in keyof T]: T[K] extends Function ? never : T[K];
};
export declare type Methods<T> = {
    [K in keyof T]: T[K] extends Function ? T[K] : never;
};
export declare type FieldNames<T> = Fields<T>[keyof T];
export declare type MethodNames<T> = Methods<T>[keyof T];
export declare const TypeUtils: {
    boolean: <T>(v: T) => v is (T & false) | (T & true);
    composeTypeGuard: <KnownT, MaybeT extends KnownT>(reducer: import("./fn").Fn2<boolean, boolean, boolean>, predicates: TypeGuard<KnownT, MaybeT>[]) => TypeGuard<KnownT, MaybeT>;
    field: <T extends any, FName extends string, FType>(obj: T, field: FName, validator: TypeGuard<unknown, FType>) => obj is T & Record<FName, FType>;
    function: <T>(v: T) => v is T & Function;
    nonEmptyString: <T>(v: T) => v is T & string;
    nonNull: <T>(v: T | null | undefined) => v is T;
    null: <T>(v: T | null | undefined) => v is null;
    number: <T>(v: T) => v is T & number;
    object: <T>(v: T) => v is T & object;
    optField: <T extends any, FName extends string, FType>(obj: T, field: FName, validator: TypeGuard<unknown, FType>) => obj is T & Partial<Record<FName, FType>>;
    string: <T>(v: T) => v is T & string;
    symbol: <T>(v: T) => v is T & symbol;
    unknown: (v: unknown) => v is unknown;
};
