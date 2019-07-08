import {IBoundPipeline, IPipeline} from "./interface";
import {Consumer, Fn, FnUtils, Supplier} from "../fn";

export class BoundPipeline<T1, T2> implements IBoundPipeline<T2> {
  public constructor(
    private readonly param: T1,
    private pipeline: IPipeline<T1, T2>,
  ) {
  }

  public alsoDo(fn: Consumer<T2>): IBoundPipeline<T2> {
    this.pipeline = this.pipeline.alsoDo(fn);
    return this;
  }

  public map<T3>(fn: Fn<T2, T3>): IBoundPipeline<T3> {
    ((this as unknown) as BoundPipeline<T1, T3>).pipeline = this.pipeline.map(fn);
    return (this as unknown) as IBoundPipeline<T3>;
  }

  public mapToProperty<F extends keyof T2>(field: F): IBoundPipeline<T2[F]> {
    return this.map(FnUtils.liftProperty(field));
  }

  public apply(): T2 {
    return this.pipeline.apply(this.param);
  }

  public toCallable(): Supplier<T2> {
    return this.apply.bind(this);
  }
}
