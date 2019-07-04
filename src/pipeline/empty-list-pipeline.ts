import {IBoundListPipeline, IListPipeline, IPipeline} from "./interface";
import {Comparator, Consumer, Fn, FnUtils, Predicate, Reducer} from "../fn";
import {IOptional} from "../optional/interface";
import {Pipeline} from "./pipeline";
import {ListPipeline} from "./list-pipeline";
import {BoundListPipeline} from "./bound-list-pipeline";
import {ListUtils} from "../list";

export class EmptyListPipeline<T1> implements IListPipeline<T1, T1> {
  public alsoDo(fn: Consumer<T1>): IListPipeline<T1, T1> {
    return this.map(FnUtils.liftConsumer(fn));
  }

  public map<T2>(fn: Fn<T1, T2>): IListPipeline<T1, T2> {
    return ListPipeline.fromCallable(fn);
  }

  public mapToProperty<F extends keyof T1>(field: F): IListPipeline<T1, T1[F]> {
    return this.map(FnUtils.liftProperty(field));
  }

  public flatMap<T2>(fn: Fn<T1[], T2[]>): IListPipeline<T1, T2> {
    return ListPipeline.liftCallable(fn);
  }

  public sort(fn: Comparator<T1>): IListPipeline<T1, T1> {
    return this.flatMap((list) => list.sort(fn));
  }

  public filter(fn: Predicate<T1>): IListPipeline<T1, T1> {
    return this.flatMap((list) => list.filter(fn));
  }

  public filterProperty<F extends keyof T1>(field: F, fn: Predicate<T1[F]>): IListPipeline<T1, T1> {
    return this.filter(FnUtils.compose(FnUtils.liftProperty(field), fn))
  }

  public reduce(fn: Reducer<T1>): IPipeline<T1[], T1> {
    return this.toPipeline().map((list) => list.reduce(fn))
  }

  public toFirst(): IPipeline<T1[], IOptional<T1>> {
    return this.toPipeline().map(ListUtils.getFirst);
  }

  public apply(list: T1[]): T1[] {
    return list;
  }

  public bind(list: T1[]): IBoundListPipeline<T1> {
    return new BoundListPipeline(list, this);
  }

  public toCallable(): Fn<T1[], T1[]> {
    return this.apply.bind(this);
  }

  public toPipeline(): IPipeline<T1[], T1[]> {
    return Pipeline.fromCallable(this.toCallable());
  }
}
