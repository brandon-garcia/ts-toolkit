import { Fn } from "./interface";
import { Nullable } from "../types";
import { IOptional } from "../optional";
export declare const liftNullable: <T, R>(fn: Fn<T, Nullable<R>>) => Fn<T, IOptional<R>>;
