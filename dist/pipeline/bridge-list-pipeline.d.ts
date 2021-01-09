import { IListPipeline, IPipeline } from "./interface";
import { Comparator, Consumer, Fn, Predicate, Reducer } from "../fn/interface";
import { IOptional } from "../optional/interface";
export declare class BridgeListPipeline<T1, T2, T3> implements IListPipeline<T1, T3> {
    private readonly fn;
    private readonly pipeline;
    constructor(fn: Fn<T1[], T2[]>, pipeline: IListPipeline<T2, T3>);
    alsoDo(fn: Consumer<T3>): IListPipeline<T1, T3>;
    map<T4>(fn: Fn<T3, T4>): IListPipeline<T1, T4>;
    mapToProperty<F extends keyof T3>(field: F): IListPipeline<T1, T3[F]>;
    flatMap<T4>(fn: Fn<T3[], T4[]>): IListPipeline<T1, T4>;
    sort(fn: Comparator<T3>): IListPipeline<T1, T3>;
    filter(fn: Predicate<T3>): IListPipeline<T1, T3>;
    filterProperty<F extends keyof T3>(field: F, fn: Predicate<T3[F]>): IListPipeline<T1, T3>;
    reduce(fn: Reducer<T3>): IPipeline<T1[], T3>;
    toFirst(): IPipeline<T1[], IOptional<T3>>;
    get callable(): Fn<T1[], T3[]>;
    private toPipeline;
}
