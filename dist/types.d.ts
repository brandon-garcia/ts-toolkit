export declare const TypeUtils: {
    boolean: <T>(v: T) => v is (T & false) | (T & true);
    field: <T extends any, FName extends string, FType>(obj: T, field: FName, validator: (value: unknown) => value is FType) => obj is T & { [_ in FName]: FType; };
    optField: <T extends any, FName extends string, FType>(obj: T, field: FName, validator: (value: unknown) => value is FType) => obj is T & { [_ in FName]?: FType | undefined; };
    nonEmptyString: <T>(v: T) => v is T & string;
    nonNull: <T>(v: T | null | undefined) => v is T;
    number: <T>(v: T) => v is T & number;
    object: <T>(v: T) => v is T & object;
    string: <T>(v: T) => v is T & string;
    unknown: (v: unknown) => v is unknown;
};
//# sourceMappingURL=types.d.ts.map