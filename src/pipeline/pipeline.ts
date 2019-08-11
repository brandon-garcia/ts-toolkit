import {Consumer, Fn} from "../fn";
import {IBoundPipeline, IPipeline} from "./interface";
import {BoundPipeline} from "./bound-pipeline";
import {EmptyPipeline} from "./empty-pipeline";
import {compose} from "../fn/compose";
import {liftConsumer} from "../fn/lift-consumer";
import {liftProperty} from "../fn/lift-property";

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
    return this.map(liftConsumer(fn));
  }

  public map<T3>(fn: Fn<T2, T3>): IPipeline<T1, T3> {
    ((this as unknown) as Pipeline<T1, T3>).fn = compose(this.fn, fn);
    return (this as unknown) as IPipeline<T1, T3>;
  }

  public mapToProperty<F extends keyof T2>(field: F): IPipeline<T1, T2[F]> {
    return this.map(liftProperty(field));
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
