import {Consumer, Fn, FnUtils, Predicate, Supplier} from "../fn";
import {IBoundPipeline, IPipeline} from "./interface";
import {IOptional, Optional} from "../optional";

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

  private constructor(private readonly fn: Fn<T1, T2>) {
  }

  public alsoDo(fn: Consumer<T2>): IPipeline<T1, T2> {
    return this.map(FnUtils.liftConsumer(fn));
  }

  public map<T3>(fn: Fn<T2, T3>): IPipeline<T1, T3> {
    return Pipeline.fromCallable(FnUtils.compose(this.fn, fn));
  }

  public mapToProperty<F extends keyof T2>(field: F): IPipeline<T1, T2[F]> {
    return this.map(FnUtils.liftProperty(field));
  }

  public filter(fn: Predicate<T2>): IPipeline<T1, IOptional<T2>> {
    return this.map((val) => Optional.of(val).filter(fn));
  }

  public filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IPipeline<T1, IOptional<T2>> {
    return this.map((val) => Optional.of(val).filterProperty(field, fn));
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

class EmptyPipeline<T> implements IPipeline<T, T> {
  public alsoDo(fn: Consumer<T>): IPipeline<T, T> {
    return this.map(FnUtils.liftConsumer(fn));
  }

  public apply(param: T): T {
    return param;
  }

  public bind(param: T): IBoundPipeline<T> {
    return new BoundPipeline(param, this);
  }

  public filter(fn: Predicate<T>): IPipeline<T, IOptional<T>> {
    return this.map((val) => Optional.of(val).filter(fn));
  }

  public filterProperty<F extends keyof T>(field: F, fn: Predicate<T[F]>): IPipeline<T, IOptional<T>> {
    return this.map((val) => Optional.of(val).filterProperty(field, fn));
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

class BoundPipeline<T1, T2> implements IBoundPipeline<T2> {
  public constructor(
    private readonly param: T1,
    private readonly pipeline: IPipeline<T1, T2>,
  ) {
  }

  public alsoDo(fn: Consumer<T2>): IBoundPipeline<T2> {
    return this.pipeline.alsoDo(fn).bind(this.param);
  }

  public map<T3>(fn: Fn<T2, T3>): IBoundPipeline<T3> {
    return this.pipeline.map(fn).bind(this.param);
  }

  public mapToProperty<F extends keyof T2>(field: F): IBoundPipeline<T2[F]> {
    return this.map(FnUtils.liftProperty(field));
  }

  public filter(fn: Predicate<T2>): IBoundPipeline<IOptional<T2>> {
    return this.map((val) => Optional.of(val).filter(fn));
  }

  public filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IBoundPipeline<IOptional<T2>> {
    return this.map((val) => Optional.of(val).filterProperty(field, fn));
  }

  public apply(): T2 {
    return this.pipeline.apply(this.param);
  }

  public toCallable(): Supplier<T2> {
    return this.apply.bind(this);
  }
}
