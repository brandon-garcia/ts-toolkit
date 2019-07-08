
export type TypeGuard<KnownT, MaybeT extends KnownT> = (p: KnownT) => p is MaybeT;
export type TypeGuardType<TG extends TypeGuard<unknown, unknown>> = TG extends TypeGuard<unknown, infer T> ? T : never;

export type NonNull<T> = T extends null | undefined ? Exclude<T, null | undefined> : T;

export type Fields<T> = {
  [K in keyof T]: T[K] extends Function ? never : T[K];
}

export type Methods<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : never;
}

export type FieldNames<T> = Fields<T>[keyof T];
export type MethodNames<T> = Methods<T>[keyof T];

export type DeepReadonly<T> =  T extends object ? {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
} : T;
