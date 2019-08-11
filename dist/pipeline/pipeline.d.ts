import { Consumer, Fn } from "../fn";
import { IPipeline } from "./interface";
export declare class Pipeline<T1, T2> implements IPipeline<T1, T2> {
    static identity<T>(): IPipeline<T, T>;
    static fromCallable<T1, T2>(fn: Fn<T1, T2>): IPipeline<T1, T2>;
    private fnList;
    private fnCount;
    private constructor();
    alsoDo(fn: Consumer<T2>): IPipeline<T1, T2>;
    map<T3>(fn: Fn<T2, T3>): IPipeline<T1, T3>;
    mapToProperty<F extends keyof T2>(field: F): IPipeline<T1, T2[F]>;
    readonly callable: Fn<T1, T2>;
}
