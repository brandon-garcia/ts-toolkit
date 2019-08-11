import { Fn } from "./interface";
export declare const liftParam: <T, R>(val: T) => (fn: Fn<T, R>) => R;
