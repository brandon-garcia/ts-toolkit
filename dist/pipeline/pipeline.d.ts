import { Consumer, Fn, Predicate } from "../fn";
import { IBoundPipeline, IPipeline } from "./interface";
import { IMaybe } from "../maybe";
export declare class Pipeline<T1, T2> implements IPipeline<T1, T2> {
    private readonly fn;
    static identity<T>(): IPipeline<T, T>;
    static fromCallable<T1, T2>(fn: Fn<T1, T2>): IPipeline<T1, T2>;
    private constructor();
    alsoDo(fn: Consumer<T2>): IPipeline<T1, T2>;
    map<T3>(fn: Fn<T2, T3>): IPipeline<T1, T3>;
    filter(fn: Predicate<T2>): IPipeline<T1, IMaybe<T2>>;
    apply(param: T1): T2;
    bind(param: T1): IBoundPipeline<T2>;
    toCallable(): Fn<T1, T2>;
}
