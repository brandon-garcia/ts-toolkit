import { Consumer } from "./interface";
export declare const liftConsumer: <T>(fn: import("./interface").Fn<T, void>) => (param: T) => T;
