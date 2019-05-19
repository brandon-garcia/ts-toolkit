export declare type Fn0<R> = () => R;
export declare type Fn1<P1, R> = (p1: P1) => R;
export declare type Fn2<P1, P2, R> = (p1: P1, p2: P2) => R;
export declare type Fn3<P1, P2, P3, R> = (p1: P1, p2: P2, p3: P3) => R;
export declare type AsyncFn0<R> = Fn0<Promise<R>>;
export declare type AsyncFn1<P1, R> = Fn1<P1, Promise<R>>;
export declare type AsyncFn2<P1, P2, R> = Fn2<P1, P2, Promise<R>>;
export declare type AsyncFn3<P1, P2, P3, R> = Fn3<P1, P2, P3, Promise<R>>;
export declare type Consumer<T> = Fn1<T, void>;
export declare type Supplier<T> = Fn0<T>;
export declare type Predicate<T> = Fn1<T, boolean>;
export declare const FnUtils: {
    compose: <T1, T2, T3>(first: Fn1<T1, T2>, second: Fn1<T2, T3>) => Fn1<T1, T3>;
    ifElse: <R>(expr: boolean, onTrue: Fn0<R>, onFalse: Fn0<R>) => R;
};
//# sourceMappingURL=fn.d.ts.map