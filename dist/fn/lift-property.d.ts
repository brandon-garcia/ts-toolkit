export declare const liftProperty: <T, F extends keyof T>(field: F) => (param: T) => T[F];
