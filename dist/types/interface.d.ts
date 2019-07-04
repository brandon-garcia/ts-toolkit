export declare type TypeGuard<KnownT, MaybeT extends KnownT> = (p: KnownT) => p is MaybeT;
export declare type NonNull<T> = T extends null | undefined ? Exclude<T, null | undefined> : T;
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
