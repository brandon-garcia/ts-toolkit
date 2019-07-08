import {Consumer, Fn, FnUtils} from "../fn";
import {IBoundPipeline, IPipeline} from "./interface";
import {BoundPipeline} from "./bound-pipeline";
import {EmptyPipeline} from "./empty-pipeline";

export class Pipeline<T1, T2> implements IPipeline<T1, T2> {
  public static identity<T>(): IPipeline<T, T> {
    return new EmptyPipeline();
  }

  public static bound<T>(param: T): IBoundPipeline<T> {
    return new BoundPipeline(param, Pipeline.identity());
  }

  public static fromCallable<T1, T2>(fn: Fn<T1, T2>): IPipeline<T1, T2> {
    return new Pipeline(fn);
  }

  private constructor(private fn: Fn<T1, T2>) {
  }

  public alsoDo(fn: Consumer<T2>): IPipeline<T1, T2> {
    return this.map(FnUtils.liftConsumer(fn));
  }

  public map<T3>(fn: Fn<T2, T3>): IPipeline<T1, T3> {
    ((this as unknown) as Pipeline<T1, T3>).fn = FnUtils.compose(this.fn, fn);
    return (this as unknown) as IPipeline<T1, T3>;
  }

  public mapToProperty<F extends keyof T2>(field: F): IPipeline<T1, T2[F]> {
    return this.map(FnUtils.liftProperty(field));
  }

  public apply(param: T1): T2 {
    return this.fn(param);
  }

  public bind(param: T1): IBoundPipeline<T2> {
    return new BoundPipeline(param, this);
  }

  public toCallable(): Fn<T1, T2> {
    return this.fn;
  }
}
