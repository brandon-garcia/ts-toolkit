import {Consumer, Fn0, Fn1, FnUtils} from "../fn";
import {IBoundPipeline, IPipeline} from "./interface";

export class Pipeline<T1, T2> implements IPipeline<T1, T2> {
  public static fromCallable<T1, T2>(fn: Fn1<T1, T2>): IPipeline<T1, T2> {
    return new Pipeline(fn);
  }

  private constructor(private readonly fn: Fn1<T1, T2>) {
  }

  public alsoDo(fn: Fn1<T2, void>): IPipeline<T1, T2> {
    return this.map((param: T2) => {
      fn(param);
      return param;
    });
  }

  public map<T3>(fn: Fn1<T2, T3>): IPipeline<T1, T3> {
    return new Pipeline(FnUtils.compose(this.fn, fn));
  }

  public apply(param: T1): T2 {
    return this.fn(param);
  }

  public bind(param: T1): IBoundPipeline<T2> {
    return new BoundPipeline(param, this);
  }

  public toCallable(): Fn1<T1, T2> {
    return this.fn;
  }
}

class BoundPipeline<T1, T2> implements IBoundPipeline<T2> {
  public constructor(
    private readonly param: T1,
    private readonly pipeline: IPipeline<T1, T2>,
  ) {
  }

  public alsoDo(fn: Consumer<T2>): IBoundPipeline<T2> {
    return this.pipeline.alsoDo(fn).bind(this.param);
  }

  public map<T3>(fn: Fn1<T2, T3>): IBoundPipeline<T3> {
    return this.pipeline.map(fn).bind(this.param);
  }

  public apply(): T2 {
    return this.pipeline.apply(this.param);
  }

  public toCallable(): Fn0<T2> {
    return this.apply.bind(this);
  }
}
