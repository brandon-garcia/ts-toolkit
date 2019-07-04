import { Consumer, Fn, Predicate } from "../fn";
import { IBoundPipeline, IPipeline } from "./interface";
import { IOptional } from "../optional";
export declare class Pipeline<T1, T2> implements IPipeline<T1, T2> {
    private fn;
    static identity<T>(): IPipeline<T, T>;
    static bound<T>(param: T): IBoundPipeline<T>;
    static fromCallable<T1, T2>(fn: Fn<T1, T2>): IPipeline<T1, T2>;
    private constructor();
    alsoDo(fn: Consumer<T2>): IPipeline<T1, T2>;
    map<T3>(fn: Fn<T2, T3>): IPipeline<T1, T3>;
    mapToProperty<F extends keyof T2>(field: F): IPipeline<T1, T2[F]>;
    filter(fn: Predicate<T2>): IPipeline<T1, IOptional<T2>>;
    filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IPipeline<T1, IOptional<T2>>;
    apply(param: T1): T2;
    bind(param: T1): IBoundPipeline<T2>;
    toCallable(): Fn<T1, T2>;
}
