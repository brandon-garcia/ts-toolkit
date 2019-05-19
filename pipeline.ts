import {Fn1, FnUtils} from "./fn";

export class Pipeline<T1, T2> {
  private constructor(private readonly fn: Fn1<T1, T2>) {
  }

  public static of<T1, T2>(fn: Fn1<T1, T2>) {
    return new Pipeline(fn);
  }

  public pipe<T3>(fn: Fn1<T2, T3>): Pipeline<T1, T3> {
    return Pipeline.of(FnUtils.compose(this.fn, fn));
  }

  public toCallable(): Fn1<T1, T2> {
    return this.fn;
  }
}
