import { IBoundListPipeline, IBoundPipeline, IListPipeline } from "./interface";
import { Comparator, Consumer, Fn, Predicate, Reducer, Supplier } from "../fn";
import { IOptional } from "../optional/interface";
export declare class BoundListPipeline<T1, T2> implements IBoundListPipeline<T2> {
    private readonly list;
    private pipeline;
    constructor(list: T1[], pipeline: IListPipeline<T1, T2>);
    alsoDo(fn: Consumer<T2>): IBoundListPipeline<T2>;
    map<T3>(fn: Fn<T2, T3>): IBoundListPipeline<T3>;
    mapToProperty<F extends keyof T2>(field: F): IBoundListPipeline<T2[F]>;
    flatMap<T3>(fn: Fn<T2[], T3[]>): IBoundListPipeline<T3>;
    sort(fn: Comparator<T2>): IBoundListPipeline<T2>;
    filter(fn: Predicate<T2>): IBoundListPipeline<T2>;
    filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IBoundListPipeline<T2>;
    reduce(fn: Reducer<T2>): IBoundPipeline<T2>;
    toFirst(): IBoundPipeline<IOptional<T2>>;
    apply(): T2[];
    toCallable(): Supplier<T2[]>;
    toPipeline(): IBoundPipeline<T2[]>;
}
