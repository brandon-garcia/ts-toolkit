export declare type Class<T> = new (...args: any[]) => T;
export declare type Keys<T extends object> = keyof T;
export declare type Methods<T extends object> = {
    [K in Keys<T>]: T[K] extends Function ? K : never;
}[Keys<T>];
export declare type Fields<T extends object> = {
    [K in Keys<T>]: T[K] extends Function ? never : K;
}[Keys<T>];
export declare type Field<T extends object, K extends Fields<T>> = T[K];
export declare type Method<T extends object, K extends Methods<T>> = T[K];
//# sourceMappingURL=util.d.ts.map