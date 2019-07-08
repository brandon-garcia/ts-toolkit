import {IBoundPipeline, IPipeline} from "./interface";
import {Consumer, Fn, FnUtils} from "../fn";
import {BoundPipeline} from "./bound-pipeline";
import {Pipeline} from "./pipeline";

export class EmptyPipeline<T> implements IPipeline<T, T> {
  public alsoDo(fn: Consumer<T>): IPipeline<T, T> {
    return this.map(FnUtils.liftConsumer(fn));
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
    return this.map(FnUtils.liftProperty(field));
  }

  public toCallable(): Fn<T, T> {
    return this.apply.bind(this);
  }
}
