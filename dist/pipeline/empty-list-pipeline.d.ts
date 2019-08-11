import { IListPipeline, IPipeline } from "./interface";
import { Comparator, Consumer, Fn, Predicate, Reducer } from "../fn/interface";
import { IOptional } from "../optional/interface";
export declare class EmptyListPipeline<T1> implements IListPipeline<T1, T1> {
    alsoDo(fn: Consumer<T1>): IListPipeline<T1, T1>;
    map<T2>(fn: Fn<T1, T2>): IListPipeline<T1, T2>;
    mapToProperty<F extends keyof T1>(field: F): IListPipeline<T1, T1[F]>;
    flatMap<T2>(fn: Fn<T1[], T2[]>): IListPipeline<T1, T2>;
    sort(fn: Comparator<T1>): IListPipeline<T1, T1>;
    filter(fn: Predicate<T1>): IListPipeline<T1, T1>;
    filterProperty<F extends keyof T1>(field: F, fn: Predicate<T1[F]>): IListPipeline<T1, T1>;
    reduce(fn: Reducer<T1>): IPipeline<T1[], T1>;
    toFirst(): IPipeline<T1[], IOptional<T1>>;
    readonly callable: Fn<T1[], T1[]>;
    private toPipeline;
}
