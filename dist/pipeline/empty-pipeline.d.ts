import { IPipeline } from "./interface";
import { Consumer, Fn } from "../fn";
export declare class EmptyPipeline<T> implements IPipeline<T, T> {
    alsoDo(fn: Consumer<T>): IPipeline<T, T>;
    map<T2>(fn: Fn<T, T2>): IPipeline<T, T2>;
    mapToProperty<F extends keyof T>(field: F): IPipeline<T, T[F]>;
    get callable(): Fn<T, T>;
}
