export type Fn0<R> = () => R;
export type Fn<P1, R> = (p1: P1) => R;
export type Fn2<P1, P2, R> = (p1: P1, p2: P2) => R;
export type Fn3<P1, P2, P3, R> = (p1: P1, p2: P2, p3: P3) => R;
export type Fn4<P1, P2, P3, P4, R> = (p1: P1, p2: P2, p3: P3, p4: P4) => R;
export type Fn5<P1, P2, P3, P4, P5, R> = (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R;
export type Fn6<P1, P2, P3, P4, P5, P6, R> = (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R;
export type Fn7<P1, P2, P3, P4, P5, P6, P7, R> = (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R;
export type Fn8<P1, P2, P3, P4, P5, P6, P7, P8, R> = (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R;

export type AsyncFn0<R> = Fn0<Promise<R>>;
export type AsyncFn<P1, R> = Fn<P1, Promise<R>>;
export type AsyncFn2<P1, P2, R> = Fn2<P1, P2, Promise<R>>;
export type AsyncFn3<P1, P2, P3, R> = Fn3<P1, P2, P3, Promise<R>>;
export type AsyncFn4<P1, P2, P3, P4, R> = Fn4<P1, P2, P3, P4, Promise<R>>;
export type AsyncFn5<P1, P2, P3, P4, P5, R> = Fn5<P1, P2, P3, P4, P5, Promise<R>>;
export type AsyncFn6<P1, P2, P3, P4, P5, P6, R> = Fn6<P1, P2, P3, P4, P5, P6, Promise<R>>;
export type AsyncFn7<P1, P2, P3, P4, P5, P6, P7, R> = Fn7<P1, P2, P3, P4, P5, P6, P7, Promise<R>>;
export type AsyncFn8<P1, P2, P3, P4, P5, P6, P7, P8, R> = Fn8<P1, P2, P3, P4, P5, P6, P7, P8, Promise<R>>;

export type Consumer<T> = Fn<T, void>;
export type Supplier<T> = Fn0<T>;
export type Predicate<T> = Fn<T, boolean>;
export type Reducer<T> = Fn2<T, T, T>;
export type Comparator<T> = Fn2<T, T, -1|0|1>;
export type Callback = Fn0<void>;

