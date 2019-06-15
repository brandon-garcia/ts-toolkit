import {Comparator, Consumer, Fn, Predicate, Reducer, Supplier} from "../fn";
import {IOptional} from "../optional";
import {TypeGuard} from "../types";

export interface IPipeline<T1, T2> {
  alsoDo(fn: Consumer<T2>): IPipeline<T1, T2>;
  map<T3>(fn: Fn<T2, T3>): IPipeline<T1, T3>;
  mapToProperty<F extends keyof T2>(field: F): IPipeline<T1, T2[F]>;

  filter<S2 extends T2>(fn: TypeGuard<T2, S2>): IPipeline<T1, IOptional<S2>>
  filter(fn: Predicate<T2>): IPipeline<T1, IOptional<T2>>;

  filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IPipeline<T1, IOptional<T2>>;

  apply(param: T1): T2;
  bind(param: T1): IBoundPipeline<T2>;
  toCallable(): Fn<T1, T2>;
}

export interface IBoundPipeline<T1> {
  alsoDo(fn: Consumer<T1>): IBoundPipeline<T1>;
  map<T2>(fn: Fn<T1, T2>): IBoundPipeline<T2>;
  mapToProperty<F extends keyof T1>(field: F): IBoundPipeline<T1[F]>;

  filter<S1 extends T1>(fn: TypeGuard<T1, S1>): IBoundPipeline<IOptional<S1>>;
  filter(fn: Predicate<T1>): IBoundPipeline<IOptional<T1>>;

  filterProperty<F extends keyof T1>(field: F, fn: Predicate<T1[F]>): IBoundPipeline<IOptional<T1>>;

  apply(): T1;
  toCallable(): Supplier<T1>;
}

export interface IListPipeline<T1, T2> {
  alsoDo(fn: Consumer<T2>): IListPipeline<T1, T2>;
  map<T3>(fn: Fn<T2, T3>): IListPipeline<T1, T3>;
  mapToProperty<F extends keyof T2>(field: F): IListPipeline<T1, T2[F]>;
  flatMap<T3>(fn: Fn<T2[], T3[]>): IListPipeline<T1, T3>;
  sort(fn: Comparator<T2>): IListPipeline<T1, T2>;
  reduce(fn: Reducer<T2>): IPipeline<T1[], T2>;

  filter<S2 extends T2>(fn: TypeGuard<T2, S2>): IListPipeline<T1, S2>;
  filter(fn: Predicate<T2>): IListPipeline<T1, T2>;

  filterProperty<F extends keyof T2>(field: F, fn: Predicate<T2[F]>): IListPipeline<T1, T2>;

  apply(list: T1[]): T2[];
  bind(list: T1[]): IBoundListPipeline<T2>;
  toCallable(): Fn<T1[], T2[]>;
  toFirst(): IPipeline<T1[], IOptional<T2>>;
  toPipeline(): IPipeline<T1[], T2[]>;
}

export interface IBoundListPipeline<T1> {
  alsoDo(fn: Consumer<T1>): IBoundListPipeline<T1>;
  map<T2>(fn: Fn<T1, T2>): IBoundListPipeline<T2>;
  mapToProperty<F extends keyof T1>(field: F): IBoundListPipeline<T1[F]>;
  flatMap<T2>(fn: Fn<T1[], T2[]>): IBoundListPipeline<T2>;
  sort(fn: Comparator<T1>): IBoundListPipeline<T1>;
  reduce(fn: Reducer<T1>): IBoundPipeline<T1>;

  filter<S1 extends T1>(fn: TypeGuard<T1, S1>): IBoundListPipeline<S1>;
  filter(fn: Predicate<T1>): IBoundListPipeline<T1>;

  filterProperty<F extends keyof T1>(field: F, fn: Predicate<T1[F]>): IBoundListPipeline<T1>;

  apply(): T1[];
  toCallable(): Supplier<T1[]>;
  toFirst(): IBoundPipeline<IOptional<T1>>;
  toPipeline(): IBoundPipeline<T1[]>;
}
