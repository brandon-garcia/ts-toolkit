import { Fn, Fn2, Fn3, Fn4, Fn5, Fn6, Fn7, Fn8, Supplier } from "../fn/interface";
export interface IApplicator0<R> {
    toCallable(): Supplier<R>;
}
export interface IApplicator1<T1, R> {
    left(param: T1): IApplicator0<R>;
    right(param: T1): IApplicator0<R>;
    toCallable(): Fn<T1, R>;
}
export interface IApplicator2<T1, T2, R> {
    left(param: T1): IApplicator1<T2, R>;
    right(param: T2): IApplicator1<T1, R>;
    toCallable(): Fn2<T1, T2, R>;
}
export interface IApplicator3<T1, T2, T3, R> {
    left(param: T1): IApplicator2<T2, T3, R>;
    right(param: T3): IApplicator2<T1, T2, R>;
    toCallable(): Fn3<T1, T2, T3, R>;
}
export interface IApplicator4<T1, T2, T3, T4, R> {
    left(param: T1): IApplicator3<T2, T3, T4, R>;
    right(param: T4): IApplicator3<T1, T2, T3, R>;
    toCallable(): Fn4<T1, T2, T3, T4, R>;
}
export interface IApplicator4<T1, T2, T3, T4, R> {
    left(param: T1): IApplicator3<T2, T3, T4, R>;
    right(param: T4): IApplicator3<T1, T2, T3, R>;
    toCallable(): Fn4<T1, T2, T3, T4, R>;
}
export interface IApplicator5<T1, T2, T3, T4, T5, R> {
    left(param: T1): IApplicator4<T2, T3, T4, T5, R>;
    right(param: T4): IApplicator4<T1, T2, T3, T4, R>;
    toCallable(): Fn5<T1, T2, T3, T4, T5, R>;
}
export interface IApplicator6<T1, T2, T3, T4, T5, T6, R> {
    left(param: T1): IApplicator5<T2, T3, T4, T5, T6, R>;
    right(param: T4): IApplicator5<T1, T2, T3, T4, T5, R>;
    toCallable(): Fn6<T1, T2, T3, T4, T5, T6, R>;
}
export interface IApplicator7<T1, T2, T3, T4, T5, T6, T7, R> {
    left(param: T1): IApplicator6<T2, T3, T4, T5, T6, T7, R>;
    right(param: T4): IApplicator6<T1, T2, T3, T4, T5, T6, R>;
    toCallable(): Fn7<T1, T2, T3, T4, T5, T6, T7, R>;
}
export interface IApplicator8<T1, T2, T3, T4, T5, T6, T7, T8, R> {
    left(param: T1): IApplicator7<T2, T3, T4, T5, T6, T7, T8, R>;
    right(param: T4): IApplicator7<T1, T2, T3, T4, T5, T6, T7, R>;
    toCallable(): Fn8<T1, T2, T3, T4, T5, T6, T7, T8, R>;
}
