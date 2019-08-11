import { Comparator, Consumer, Fn, Predicate, Reducer } from "../fn/interface";
import { IOptional } from "../optional/interface";
import { TypeGuard } from "../types/interface";
export interface IPipeline<T1, T2> {
    readonly callable: Fn<T1, T2>;
    alsoDo(fn: Consumer<T2>): IPipeline<T1, T2>;
    map<T3>(fn: Fn<T2, T3>): IPipeline<T1, T3>;
    mapToProperty<F extends keyof T2>(field: F): IPipeline<T1, T2[F]>;
}
export interface IListPipeline<T1, T2> {
    readonly callable: Fn<T1[], T2[]>;
    alsoDo(fn: Consumer<T2>): IListPipeline<T1, T2>;
    map<T3>(fn: Fn<T2, T3>): IListPipeline<T1, T3>;
    mapToProperty<F extends keyof T2>(field: F): IListPipeline<T1, T2[F]>;
    flatMap<T3>(fn: Fn<T2[], T3[]>): IListPipeline<T1, T3>;
    sort(fn: Comparator<T2>): IListPipeline<T1, T2>;
    reduce(fn: Reducer<T2>): IPipeline<T1[], T2>;
    filter<S2 extends T2>(fn: TypeGuard<T2, S2>): IListPipeline<T1, S2>;
    filter(fn: Predicate<T2>): IListPipeline<T1, T2>;
    filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IListPipeline<T1, T2>;
    toFirst(): IPipeline<T1[], IOptional<T2>>;
}
