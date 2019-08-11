import { Fn } from "./interface";
export declare const memoize: <T, R>(fn: Fn<T, R>) => Fn<T, R>;
