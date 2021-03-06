import {IListPipeline, IPipeline} from "./interface";
import {Comparator, Consumer, Fn, Predicate, Reducer} from "../fn/interface";
import {IOptional} from "../optional/interface";
import {Pipeline} from "./pipeline";
import {ListUtils} from "../list";
import {liftConsumer} from "../fn/lift-consumer";
import {liftProperty} from "../fn/lift-property";

export class BridgeListPipeline<T1, T2, T3> implements IListPipeline<T1, T3> {

  public constructor(
    private readonly fn: Fn<T1[], T2[]>,
    private readonly pipeline: IListPipeline<T2, T3>,
  ) {
  }

  public alsoDo(fn: Consumer<T3>): IListPipeline<T1, T3> {
    return this.map(liftConsumer(fn));
  }

  public map<T4>(fn: Fn<T3, T4>): IListPipeline<T1, T4> {
    return new BridgeListPipeline(this.fn, this.pipeline.map(fn));
  }

  public mapToProperty<F extends keyof T3>(field: F): IListPipeline<T1, T3[F]> {
    return this.map(liftProperty(field));
  }

  public flatMap<T4>(fn: Fn<T3[], T4[]>): IListPipeline<T1, T4> {
    return new BridgeListPipeline(this.fn, this.pipeline.flatMap(fn));
  }

  public sort(fn: Comparator<T3>): IListPipeline<T1, T3> {
    return new BridgeListPipeline(this.fn, this.pipeline.sort(fn));
  }

  public filter(fn: Predicate<T3>): IListPipeline<T1, T3> {
    return new BridgeListPipeline(this.fn, this.pipeline.filter(fn));
  }

  public filterProperty<F extends keyof T3>(field: F, fn: Predicate<T3[F]>): IListPipeline<T1, T3> {
    return new BridgeListPipeline(this.fn, this.pipeline.filterProperty(field, fn));
  }

  public reduce(fn: Reducer<T3>): IPipeline<T1[], T3> {
    return this.toPipeline().map((list) => list.reduce(fn));
  }

  public toFirst(): IPipeline<T1[], IOptional<T3>> {
    return this.toPipeline().map(ListUtils.getFirst);
  }

  public get callable(): Fn<T1[], T3[]> {
    return (list: T1[]) => this.pipeline.callable(this.fn(list));
  }

  private toPipeline(): IPipeline<T1[], T3[]> {
    return Pipeline.fromCallable(this.callable);
  }
}
