export declare const NullUtils: {
    coalesce: <T>(...options: (T | null | undefined)[]) => T | undefined;
    undefinedToNull: <T_1>(v: T_1 | null | undefined) => T_1 | null;
    nullToUndefined: <T_2>(v: T_2 | null | undefined) => T_2 | undefined;
};
