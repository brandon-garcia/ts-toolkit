import {Comparator, Consumer, Fn, FnUtils, Predicate, Reducer} from "../fn";
import {IOptional} from "../optional/interface";
import {Pipeline} from "./pipeline";
import {IBoundListPipeline, IListPipeline, IPipeline} from "./interface";
import {BridgeListPipeline} from "./bridge-list-pipeline";
import {EmptyListPipeline} from "./empty-list-pipeline";
import {BoundListPipeline} from "./bound-list-pipeline";
import {ListUtils} from "../list";

export class ListPipeline<T1, T2> implements IListPipeline<T1, T2> {
  public static identity<T>(): IListPipeline<T, T> {
    return new EmptyListPipeline();
  }

  public static bound<T>(list: T[]): IBoundListPipeline<T> {
    return new BoundListPipeline(list, ListPipeline.identity());
  }

  public static fromCallable<T1, T2>(fn: Fn<T1, T2>): IListPipeline<T1, T2> {
    return new ListPipeline(fn);
  }

  public static liftCallable<T1, T2>(fn: Fn<T1[], T2[]>): IListPipeline<T1, T2> {
    return new BridgeListPipeline(fn, ListPipeline.identity());
  }

  public static liftPipeline<T1, T2>(pipeline: IPipeline<T1[], T2[]>): IListPipeline<T1, T2> {
    return ListPipeline.liftCallable(pipeline.toCallable());
  }

  private constructor(private fn: Fn<T1, T2>) {
  }

  public alsoDo(fn: Consumer<T2>): IListPipeline<T1, T2> {
    return this.map(FnUtils.liftConsumer(fn));
  }

  public map<T3>(fn: Fn<T2, T3>): IListPipeline<T1, T3> {
    ((this as unknown) as ListPipeline<T1, T3>).fn = FnUtils.compose(this.fn, fn);
    return (this as unknown) as IListPipeline<T1, T3>;
  }

  public mapToProperty<F extends keyof T2>(field: F): IListPipeline<T1, T2[F]> {
    return this.map(FnUtils.liftProperty(field));
  }

  public flatMap<T3>(fn: Fn<T2[], T3[]>): IListPipeline<T1, T3> {
    return new BridgeListPipeline(this.toCallable(), ListPipeline.liftCallable(fn));
  }

  public sort(fn: Comparator<T2>): IListPipeline<T1, T2> {
    return this.flatMap((list) => list.sort(fn));
  }

  public filter(fn: Predicate<T2>): IListPipeline<T1, T2> {
    return this.flatMap((list) => list.filter(fn));
  }

  public filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IListPipeline<T1, T2> {
    return this.filter(FnUtils.compose(FnUtils.liftProperty(field), fn))
  }

  public reduce(fn: Reducer<T2>): IPipeline<T1[], T2> {
    return this.toPipeline().map((list) => list.reduce(fn))
  }

  public toFirst(): IPipeline<T1[], IOptional<T2>> {
    return this.toPipeline().map(ListUtils.getFirst);
  }

  public apply(list: T1[]): T2[] {
    return list.map(this.fn);
  }

  public bind(list: T1[]): IBoundListPipeline<T2> {
    return new BoundListPipeline(list, this);
  }

  public toCallable(): Fn<T1[], T2[]> {
    return this.apply.bind(this);
  }

  public toPipeline(): IPipeline<T1[], T2[]> {
    return Pipeline.fromCallable(this.toCallable());
  }
}
