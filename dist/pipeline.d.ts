import { Fn1 } from "./fn";
export declare class Pipeline<T1, T2> {
    private readonly fn;
    private constructor();
    static of<T1, T2>(fn: Fn1<T1, T2>): Pipeline<T1, T2>;
    pipe<T3>(fn: Fn1<T2, T3>): Pipeline<T1, T3>;
    toCallable(): Fn1<T1, T2>;
}
