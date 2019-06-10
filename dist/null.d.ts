export declare const NullUtils: {
    coalesce: <T>(...options: (T | null | undefined)[]) => T | undefined;
    undefinedToNull: <T>(v: T | null | undefined) => T | null;
    nullToUndefined: <T>(v: T | null | undefined) => T | undefined;
};
