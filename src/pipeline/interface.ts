import {Comparator, Consumer, Fn0, Fn1, Predicate, Reducer} from "../fn";
import {IOptional} from "../optional";

export interface IPipeline<T1, T2> {
  alsoDo(fn: Consumer<T2>): IPipeline<T1, T2>;
  map<T3>(fn: Fn1<T2, T3>): IPipeline<T1, T3>;
  filter(fn: Predicate<T2>): IPipeline<T1, IOptional<T2>>;

  apply(param: T1): T2;
  bind(param: T1): IBoundPipeline<T2>;
  toCallable(): Fn1<T1, T2>;
}

export interface IBoundPipeline<T1> {
  alsoDo(fn: Consumer<T1>): IBoundPipeline<T1>;
  map<T2>(fn: Fn1<T1, T2>): IBoundPipeline<T2>;
  filter(fn: Predicate<T1>): IBoundPipeline<IOptional<T1>>;

  apply(): T1;
  toCallable(): Fn0<T1>;
}

export interface IListPipeline<T1, T2> {
  alsoDo(fn: Consumer<T2>): IListPipeline<T1, T2>;
  map<T3>(fn: Fn1<T2, T3>): IListPipeline<T1, T3>;
  flatMap<T3>(fn: Fn1<T2[], T3[]>): IListPipeline<T1, T3>;
  sort(fn: Comparator<T2>): IListPipeline<T1, T2>;
  filter(fn: Predicate<T2>): IListPipeline<T1, T2>;
  reduce(fn: Reducer<T2>): IPipeline<T1[], T2>;

  apply(list: T1[]): T2[];
  bind(list: T1[]): IBoundListPipeline<T2>;
  toCallable(): Fn1<T1[], T2[]>;
  toFirst(): IPipeline<T1[], IOptional<T2>>;
  toPipeline(): IPipeline<T1[], T2[]>;
}

export interface IBoundListPipeline<T1> {
  alsoDo(fn: Consumer<T1>): IBoundListPipeline<T1>;
  map<T2>(fn: Fn1<T1, T2>): IBoundListPipeline<T2>;
  flatMap<T2>(fn: Fn1<T1[], T2[]>): IBoundListPipeline<T2>;
  sort(fn: Comparator<T1>): IBoundListPipeline<T1>;
  filter(fn: Predicate<T1>): IBoundListPipeline<T1>;
  reduce(fn: Reducer<T1>): IBoundPipeline<T1>;

  apply(): T1[];
  toCallable(): Fn0<T1[]>;
  toFirst(): IBoundPipeline<IOptional<T1>>;
  toPipeline(): IBoundPipeline<T1[]>;
}