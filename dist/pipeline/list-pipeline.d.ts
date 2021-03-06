import { Comparator, Consumer, Fn, Predicate, Reducer } from "../fn";
import { IOptional } from "../optional/interface";
import { IListPipeline, IPipeline } from "./interface";
export declare class ListPipeline<T1, T2> implements IListPipeline<T1, T2> {
    private fn;
    static identity<T>(): IListPipeline<T, T>;
    static fromCallable<T1, T2>(fn: Fn<T1, T2>): IListPipeline<T1, T2>;
    static liftCallable<T1, T2>(fn: Fn<T1[], T2[]>): IListPipeline<T1, T2>;
    static liftPipeline<T1, T2>(pipeline: IPipeline<T1[], T2[]>): IListPipeline<T1, T2>;
    private constructor();
    alsoDo(fn: Consumer<T2>): IListPipeline<T1, T2>;
    map<T3>(fn: Fn<T2, T3>): IListPipeline<T1, T3>;
    mapToProperty<F extends keyof T2>(field: F): IListPipeline<T1, T2[F]>;
    flatMap<T3>(fn: Fn<T2[], T3[]>): IListPipeline<T1, T3>;
    sort(fn: Comparator<T2>): IListPipeline<T1, T2>;
    filter(fn: Predicate<T2>): IListPipeline<T1, T2>;
    filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IListPipeline<T1, T2>;
    reduce(fn: Reducer<T2>): IPipeline<T1[], T2>;
    toFirst(): IPipeline<T1[], IOptional<T2>>;
    get callable(): Fn<T1[], T2[]>;
    private toPipeline;
}
