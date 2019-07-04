import { Fn, Fn2, Fn3, Fn4, Fn5, Fn6, Fn7, Fn8, Supplier } from "../fn/interface";
import { IApplicator0, IApplicator1, IApplicator2, IApplicator3, IApplicator4, IApplicator5, IApplicator6, IApplicator7, IApplicator8 } from "./interface";
export declare class Applicator {
    private fn;
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
