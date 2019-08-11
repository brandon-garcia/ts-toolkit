export declare type TypeGuard<KnownT = unknown, MaybeT extends KnownT = KnownT> = (p: KnownT) => p is MaybeT;
export declare type TypeGuardType<TG extends TypeGuard> = TG extends TypeGuard<unknown, infer T> ? T : never;
export declare type Nullable<T extends NonNullable<unknown>> = T | null | undefined;
export declare type Fields<T> = {
    [K in keyof T]: T[K] extends Function ? never : T[K];
};
export declare type Methods<T> = {
    [K in keyof T]: T[K] extends Function ? T[K] : never;
};
export declare type FieldNames<T> = Fields<T>[keyof T];
export declare type MethodNames<T> = Methods<T>[keyof T];
export declare type DeepReadonly<T> = T extends object ? {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
} : T;
