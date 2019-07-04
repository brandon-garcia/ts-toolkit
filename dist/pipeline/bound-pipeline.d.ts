import { IBoundPipeline, IPipeline } from "./interface";
import { Consumer, Fn, Predicate, Supplier } from "../fn";
import { IOptional } from "../optional";
export declare class BoundPipeline<T1, T2> implements IBoundPipeline<T2> {
    private readonly param;
    private pipeline;
    constructor(param: T1, pipeline: IPipeline<T1, T2>);
    alsoDo(fn: Consumer<T2>): IBoundPipeline<T2>;
    map<T3>(fn: Fn<T2, T3>): IBoundPipeline<T3>;
    mapToProperty<F extends keyof T2>(field: F): IBoundPipeline<T2[F]>;
    filter(fn: Predicate<T2>): IBoundPipeline<IOptional<T2>>;
    filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IBoundPipeline<IOptional<T2>>;
    apply(): T2;
    toCallable(): Supplier<T2>;
}
