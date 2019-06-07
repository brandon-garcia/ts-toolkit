import { Fn1, Predicate } from "../fn";
import { IBoundPipeline, IPipeline } from "./interface";
import { IOptional } from "../optional";
export declare class Pipeline<T1, T2> implements IPipeline<T1, T2> {
    private readonly fn;
    static fromCallable<T1, T2>(fn: Fn1<T1, T2>): IPipeline<T1, T2>;
    private constructor();
    alsoDo(fn: Fn1<T2, void>): IPipeline<T1, T2>;
    map<T3>(fn: Fn1<T2, T3>): IPipeline<T1, T3>;
    filter(fn: Predicate<T2>): IPipeline<T1, IOptional<T2>>;
    apply(param: T1): T2;
    bind(param: T1): IBoundPipeline<T2>;
    toCallable(): Fn1<T1, T2>;
}
