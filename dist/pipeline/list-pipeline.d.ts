import { Comparator, Consumer, Fn, Predicate, Reducer, Supplier } from "../fn";
import { IOptional } from "../optional";
import { IBoundListPipeline, IBoundPipeline, IListPipeline, IPipeline } from "./interface";
export declare class ListPipeline<T1, T2> implements IListPipeline<T1, T2> {
    private readonly fn;
    static identity<T>(): IListPipeline<T, T>;
    static fromCallable<T1, T2>(fn: Fn<T1, T2>): IListPipeline<T1, T2>;
    static liftCallable<T1, T2>(fn: Fn<T1[], T2[]>): IListPipeline<T1, T2>;
    static liftPipeline<T1, T2>(pipeline: IPipeline<T1[], T2[]>): IListPipeline<T1, T2>;
    private constructor();
    alsoDo(fn: Consumer<T2>): IListPipeline<T1, T2>;
    map<T3>(fn: Fn<T2, T3>): IListPipeline<T1, T3>;
    flatMap<T3>(fn: Fn<T2[], T3[]>): IListPipeline<T1, T3>;
    sort(fn: Comparator<T2>): IListPipeline<T1, T2>;
    filter(fn: Predicate<T2>): IListPipeline<T1, T2>;
    reduce(fn: Reducer<T2>): IPipeline<T1[], T2>;
    toFirst(): IPipeline<T1[], IOptional<T2>>;
    apply(list: T1[]): T2[];
    bind(list: T1[]): IBoundListPipeline<T2>;
    toCallable(): Fn<T1[], T2[]>;
    toPipeline(): IPipeline<T1[], T2[]>;
}
export declare class BoundListPipeline<T1, T2> implements IBoundListPipeline<T2> {
    private readonly list;
    private readonly pipeline;
    static of<T>(list: T[]): IBoundListPipeline<T>;
    constructor(list: T1[], pipeline: IListPipeline<T1, T2>);
    alsoDo(fn: Consumer<T2>): IBoundListPipeline<T2>;
    map<T3>(fn: Fn<T2, T3>): IBoundListPipeline<T3>;
    flatMap<T3>(fn: Fn<T2[], T3[]>): IBoundListPipeline<T3>;
    sort(fn: Comparator<T2>): IBoundListPipeline<T2>;
    filter(fn: Predicate<T2>): IBoundListPipeline<T2>;
    reduce(fn: Reducer<T2>): IBoundPipeline<T2>;
    toFirst(): IBoundPipeline<IOptional<T2>>;
    apply(): T2[];
    toCallable(): Supplier<T2[]>;
    toPipeline(): IBoundPipeline<T2[]>;
}
