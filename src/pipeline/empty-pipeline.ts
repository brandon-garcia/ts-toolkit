import {IBoundPipeline, IPipeline} from "./interface";
import {Consumer, Fn} from "../fn";
import {BoundPipeline} from "./bound-pipeline";
import {Pipeline} from "./pipeline";
import {liftConsumer} from "../fn/lift-consumer";
import {liftProperty} from "../fn/lift-property";

export class EmptyPipeline<T> implements IPipeline<T, T> {
  public alsoDo(fn: Consumer<T>): IPipeline<T, T> {
    return this.map(liftConsumer(fn));
  }

  public apply(param: T): T {
    return param;
  }

  public bind(param: T): IBoundPipeline<T> {
    return new BoundPipeline(param, this);
  }

  public map<T2>(fn: Fn<T, T2>): IPipeline<T, T2> {
    return Pipeline.fromCallable(fn);
  }

  public mapToProperty<F extends keyof T>(field: F): IPipeline<T, T[F]> {
    return this.map(liftProperty(field));
  }

  public toCallable(): Fn<T, T> {
    return this.apply.bind(this);
  }
}
