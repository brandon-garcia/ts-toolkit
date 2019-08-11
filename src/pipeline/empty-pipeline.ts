import {IPipeline} from "./interface";
import {Consumer, Fn} from "../fn";
import {Pipeline} from "./pipeline";
import {liftConsumer} from "../fn/lift-consumer";
import {liftProperty} from "../fn/lift-property";

export class EmptyPipeline<T> implements IPipeline<T, T> {
  public alsoDo(fn: Consumer<T>): IPipeline<T, T> {
    return this.map(liftConsumer(fn));
  }

  public map<T2>(fn: Fn<T, T2>): IPipeline<T, T2> {
    return Pipeline.fromCallable(fn);
  }

  public mapToProperty<F extends keyof T>(field: F): IPipeline<T, T[F]> {
    return this.map(liftProperty(field));
  }

  public get callable(): Fn<T, T> {
    return (param: T) => param;
  }
}
