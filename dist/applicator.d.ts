import { Fn, Fn2, Fn3, Fn4, Fn5, Fn6, Fn7, Fn8, Supplier } from "./fn";
interface IApplicator0<R> {
    toCallable(): Supplier<R>;
}
interface IApplicator1<T1, R> {
    left(param: T1): IApplicator0<R>;
    right(param: T1): IApplicator0<R>;
    toCallable(): Fn<T1, R>;
}
interface IApplicator2<T1, T2, R> {
    left(param: T1): IApplicator1<T2, R>;
    right(param: T2): IApplicator1<T1, R>;
    toCallable(): Fn2<T1, T2, R>;
}
interface IApplicator3<T1, T2, T3, R> {
    left(param: T1): IApplicator2<T2, T3, R>;
    right(param: T3): IApplicator2<T1, T2, R>;
    toCallable(): Fn3<T1, T2, T3, R>;
}
interface IApplicator4<T1, T2, T3, T4, R> {
    left(param: T1): IApplicator3<T2, T3, T4, R>;
    right(param: T4): IApplicator3<T1, T2, T3, R>;
    toCallable(): Fn4<T1, T2, T3, T4, R>;
}
interface IApplicator4<T1, T2, T3, T4, R> {
    left(param: T1): IApplicator3<T2, T3, T4, R>;
    right(param: T4): IApplicator3<T1, T2, T3, R>;
    toCallable(): Fn4<T1, T2, T3, T4, R>;
}
interface IApplicator5<T1, T2, T3, T4, T5, R> {
    left(param: T1): IApplicator4<T2, T3, T4, T5, R>;
    right(param: T4): IApplicator4<T1, T2, T3, T4, R>;
    toCallable(): Fn5<T1, T2, T3, T4, T5, R>;
}
interface IApplicator6<T1, T2, T3, T4, T5, T6, R> {
    left(param: T1): IApplicator5<T2, T3, T4, T5, T6, R>;
    right(param: T4): IApplicator5<T1, T2, T3, T4, T5, R>;
    toCallable(): Fn6<T1, T2, T3, T4, T5, T6, R>;
}
interface IApplicator7<T1, T2, T3, T4, T5, T6, T7, R> {
    left(param: T1): IApplicator6<T2, T3, T4, T5, T6, T7, R>;
    right(param: T4): IApplicator6<T1, T2, T3, T4, T5, T6, R>;
    toCallable(): Fn7<T1, T2, T3, T4, T5, T6, T7, R>;
}
interface IApplicator8<T1, T2, T3, T4, T5, T6, T7, T8, R> {
    left(param: T1): IApplicator7<T2, T3, T4, T5, T6, T7, T8, R>;
    right(param: T4): IApplicator7<T1, T2, T3, T4, T5, T6, T7, R>;
    toCallable(): Fn8<T1, T2, T3, T4, T5, T6, T7, T8, R>;
}
export declare class Applicator {
    private readonly fn;
    static from0<R>(fn: Supplier<R>): IApplicator0<R>;
    static from1<T1, R>(fn: Fn<T1, R>): IApplicator1<T1, R>;
    static from2<T1, T2, R>(fn: Fn2<T1, T2, R>): IApplicator2<T1, T2, R>;
    static from3<T1, T2, T3, R>(fn: Fn3<T1, T2, T3, R>): IApplicator3<T1, T2, T3, R>;
    static from4<T1, T2, T3, T4, R>(fn: Fn4<T1, T2, T3, T4, R>): IApplicator4<T1, T2, T3, T4, R>;
    static from5<T1, T2, T3, T4, T5, R>(fn: Fn5<T1, T2, T3, T4, T5, R>): IApplicator5<T1, T2, T3, T4, T5, R>;
    static from6<T1, T2, T3, T4, T5, T6, R>(fn: Fn6<T1, T2, T3, T4, T5, T6, R>): IApplicator6<T1, T2, T3, T4, T5, T6, R>;
    static from7<T1, T2, T3, T4, T5, T6, T7, R>(fn: Fn7<T1, T2, T3, T4, T5, T6, T7, R>): IApplicator7<T1, T2, T3, T4, T5, T6, T7, R>;
    static from8<T1, T2, T3, T4, T5, T6, T7, T8, R>(fn: Fn8<T1, T2, T3, T4, T5, T6, T7, T8, R>): IApplicator8<T1, T2, T3, T4, T5, T6, T7, T8, R>;
    private constructor();
    left(param: any): this;
    right(param: any): this;
    toCallable(): (...args: any[]) => any;
}
export {};
