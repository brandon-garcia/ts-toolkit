export declare const createPartialFactory: <T extends object, FixedArgs extends keyof T>(common: { [F in FixedArgs]: T[F]; }) => (remaining: { [F_1 in Exclude<keyof T, FixedArgs>]: T[F_1]; }) => T;
