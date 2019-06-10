import { Comparator, Consumer, Fn1, Predicate, Reducer } from "../fn";
import { IOptional } from "../optional";
import { IBoundListPipeline, IListPipeline, IPipeline } from "./interface";
export declare class ListPipeline<T1, T2> implements IListPipeline<T1, T2> {
    private readonly fn;
    static fromCallable<T1, T2>(fn: Fn1<T1, T2>): IListPipeline<T1, T2>;
    static liftCallable<T1, T2>(fn: Fn1<T1[], T2[]>): IListPipeline<T1, T2>;
    static liftPipeline<T1, T2>(pipeline: IPipeline<T1[], T2[]>): IListPipeline<T1, T2>;
    private constructor();
    alsoDo(fn: Consumer<T2>): IListPipeline<T1, T2>;
    map<T3>(fn: Fn1<T2, T3>): IListPipeline<T1, T3>;
    flatMap<T3>(fn: Fn1<T2[], T3[]>): IListPipeline<T1, T3>;
    sort(fn: Comparator<T2>): IListPipeline<T1, T2>;
    filter(fn: Predicate<T2>): IListPipeline<T1, T2>;
    reduce(fn: Reducer<T2>): IPipeline<T1[], T2>;
    toFirst(): IPipeline<T1[], IOptional<T2>>;
    apply(list: T1[]): T2[];
    bind(list: T1[]): IBoundListPipeline<T2>;
    toCallable(): Fn1<T1[], T2[]>;
    toPipeline(): IPipeline<T1[], T2[]>;
}
