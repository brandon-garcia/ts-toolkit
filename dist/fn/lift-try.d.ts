import { Fn } from "./interface";
import { IEither } from "../either";
export declare const liftTry: <T, R, E>(fn: Fn<T, R>) => Fn<T, IEither<R, E>>;
