export type NoArg<R = void> = () => R;
export type Unary<P1, R = void> = (param: P1) => R;
export type Bi<P1, P2, R = void> = (first: P1, second: P2) => R;
export type Tri<P1, P2, P3, R = void> = (first: P1, second: P2, third: P3) => R;

export type AsyncNoArg<R = void> = NoArg<Promise<R>>;
export type AsyncUnary<P1, R = void> = Unary<P1, Promise<R>>;
export type AsyncBi<P1, P2, R = void> = Bi<P1, P2, Promise<R>>;
export type AsyncTri<P1, P2, P3, R = void> = Tri<P1, P2, P3, Promise<R>>;

export type Consumer<P1> = Unary<P1, void>;
export type Supplier<R> = NoArg<R>;

