import {Comparator, Consumer, Fn, FnUtils, Predicate, Reducer, Supplier} from "../fn";
import {IOptional, Optional} from "../optional";
import {Pipeline} from "./pipeline";
import {IBoundListPipeline, IBoundPipeline, IListPipeline, IPipeline} from "./interface";

const getFirst = <T> (list: T[]): IOptional<T> => {
  if (list.length) {
    return Optional.some(list[0]);
  }
  return Optional.none();
};

class BridgeListPipeline<T1, T2, T3> implements IListPipeline<T1, T3> {

  public constructor(
    private readonly fn: Fn<T1[], T2[]>,
    private readonly pipeline: IListPipeline<T2, T3>,
  ) {
  }

  public alsoDo(fn: Consumer<T3>): IListPipeline<T1, T3> {
    return this.map(FnUtils.liftConsumer(fn));
  }

  public map<T4>(fn: Fn<T3, T4>): IListPipeline<T1, T4> {
    return new BridgeListPipeline(this.fn, this.pipeline.map(fn));
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

  public reduce(fn: Reducer<T3>): IPipeline<T1[], T3> {
    return this.toPipeline().map((list) => list.reduce(fn));
  }

  public toFirst(): IPipeline<T1[], IOptional<T3>> {
    return this.toPipeline().map(getFirst);
  }

  public apply(list: T1[]): T3[] {
    return this.pipeline.apply(this.fn(list));
  }

  public bind(list: T1[]): IBoundListPipeline<T3> {
    return new BoundListPipeline(list, this);
  }

  public toCallable(): Fn<T1[], T3[]> {
    return this.apply.bind(this);
  }

  public toPipeline(): IPipeline<T1[], T3[]> {
    return Pipeline.fromCallable(this.toCallable());
  }
}

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

  private constructor(private readonly fn: Fn<T1, T2>) {
  }

  public alsoDo(fn: Consumer<T2>): IListPipeline<T1, T2> {
    return this.map(FnUtils.liftConsumer(fn));
  }

  public map<T3>(fn: Fn<T2, T3>): IListPipeline<T1, T3> {
    return new ListPipeline(FnUtils.compose(this.fn, fn));
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

  public reduce(fn: Reducer<T2>): IPipeline<T1[], T2> {
    return this.toPipeline().map((list) => list.reduce(fn))
  }

  public toFirst(): IPipeline<T1[], IOptional<T2>> {
    return this.toPipeline().map(getFirst);
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

class EmptyListPipeline<T1> implements IListPipeline<T1, T1> {
  public alsoDo(fn: Consumer<T1>): IListPipeline<T1, T1> {
    return this.map(FnUtils.liftConsumer(fn));
  }

  public map<T2>(fn: Fn<T1, T2>): IListPipeline<T1, T2> {
    return ListPipeline.fromCallable(fn);
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

  public reduce(fn: Reducer<T1>): IPipeline<T1[], T1> {
    return this.toPipeline().map((list) => list.reduce(fn))
  }

  public toFirst(): IPipeline<T1[], IOptional<T1>> {
    return this.toPipeline().map(getFirst);
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

class BoundListPipeline<T1, T2> implements IBoundListPipeline<T2> {
  public constructor(
    private readonly list: T1[],
    private readonly pipeline: IListPipeline<T1, T2>,
  ) {
  }

  public alsoDo(fn: Consumer<T2>): IBoundListPipeline<T2> {
    return this.pipeline.alsoDo(fn).bind(this.list);
  }

  public map<T3>(fn: Fn<T2, T3>): IBoundListPipeline<T3> {
    return this.pipeline.map(fn).bind(this.list);
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
