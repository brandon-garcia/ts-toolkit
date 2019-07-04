import { IBoundPipeline, IPipeline } from "./interface";
import { Consumer, Fn, Predicate } from "../fn";
import { IOptional } from "../optional";
export declare class EmptyPipeline<T> implements IPipeline<T, T> {
    alsoDo(fn: Consumer<T>): IPipeline<T, T>;
    apply(param: T): T;
    bind(param: T): IBoundPipeline<T>;
    filter(fn: Predicate<T>): IPipeline<T, IOptional<T>>;
    filterProperty<F extends keyof T>(field: F, fn: Predicate<T[F]>): IPipeline<T, IOptional<T>>;
    map<T2>(fn: Fn<T, T2>): IPipeline<T, T2>;
    mapToProperty<F extends keyof T>(field: F): IPipeline<T, T[F]>;
    toCallable(): Fn<T, T>;
}
