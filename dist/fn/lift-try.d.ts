import { Fn } from "./interface";
import { IResult } from "../result";
export declare const liftTry: <T, R, E>(fn: Fn<T, R>) => Fn<T, IResult<R, E>>;
