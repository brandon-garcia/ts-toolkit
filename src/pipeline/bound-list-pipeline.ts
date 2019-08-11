import {IBoundListPipeline, IBoundPipeline, IListPipeline} from "./interface";
import {Comparator, Consumer, Fn, Predicate, Reducer, Supplier} from "../fn/interface";
import {IOptional} from "../optional/interface";
import {liftProperty} from "../fn/lift-property";

export class BoundListPipeline<T1, T2> implements IBoundListPipeline<T2> {
  public constructor(
    private readonly list: T1[],
    private pipeline: IListPipeline<T1, T2>,
  ) {
  }

  public alsoDo(fn: Consumer<T2>): IBoundListPipeline<T2> {
    this.pipeline = this.pipeline.alsoDo(fn);
    return this;
  }

  public map<T3>(fn: Fn<T2, T3>): IBoundListPipeline<T3> {
    ((this as unknown) as BoundListPipeline<T1, T3>).pipeline = this.pipeline.map(fn);
    return (this as unknown) as IBoundListPipeline<T3>;
  }

  public mapToProperty<F extends keyof T2>(field: F): IBoundListPipeline<T2[F]> {
    return this.map(liftProperty(field));
  }

  public flatMap<T3>(fn: Fn<T2[], T3[]>): IBoundListPipeline<T3> {
    return this.pipeline.flatMap(fn).bind(this.list);
  }

  public sort(fn: Comparator<T2>): IBoundListPipeline<T2> {
    return this.pipeline.sort(fn).bind(this.list);
  }

  public filter(fn: Predicate<T2>): IBoundListPipeline<T2> {
    return this.pipeline.filter(fn).bind(this.list);
  }

  public filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IBoundListPipeline<T2> {
    return this.pipeline.filterProperty(field, fn).bind(this.list);
  }

  public reduce(fn: Reducer<T2>): IBoundPipeline<T2> {
    return this.pipeline.reduce(fn).bind(this.list);
  }

  public toFirst(): IBoundPipeline<IOptional<T2>> {
    return this.pipeline.toFirst().bind(this.list);
  }

  public apply(): T2[] {
    return this.pipeline.apply(this.list);
  }

  public toCallable(): Supplier<T2[]> {
    return this.apply.bind(this);
  }

  public toPipeline(): IBoundPipeline<T2[]> {
    return this.pipeline.toPipeline().bind(this.list);
  }
}
