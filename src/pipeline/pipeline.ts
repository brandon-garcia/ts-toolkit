import {compose, Consumer, Fn} from "../fn";
import {IPipeline} from "./interface";
import {EmptyPipeline} from "./empty-pipeline";
import {liftConsumer} from "../fn/lift-consumer";
import {liftProperty} from "../fn/lift-property";

export class Pipeline<T1, T2> implements IPipeline<T1, T2> {
  public static identity<T>(): IPipeline<T, T> {
    return new EmptyPipeline();
  }

  public static fromCallable<T1, T2>(fn: Fn<T1, T2>): IPipeline<T1, T2> {
    return new Pipeline(fn);
  }

  private fnList: Array<Fn<any, any>>;
  private fnCount: number;

  private constructor(fn: Fn<T1, T2>) {
    this.fnList = [fn];
    this.fnCount = 0;
  }

  public alsoDo(fn: Consumer<T2>): IPipeline<T1, T2> {
    return this.map(liftConsumer(fn));
  }

  public map<T3>(fn: Fn<T2, T3>): IPipeline<T1, T3> {
    this.fnList.push(fn);
    this.fnCount++;
    if (this.fnCount > 9) {
      this.fnList = [ this.callable ];
      this.fnCount = 1;
    }
    return (this as unknown) as IPipeline<T1, T3>;
  }

  public mapToProperty<F extends keyof T2>(field: F): IPipeline<T1, T2[F]> {
    return this.map(liftProperty(field));
  }

  public get callable(): Fn<T1, T2> {
    if (this.fnList.length > 1) {
      return (compose as any)(...this.fnList);
    }
    return this.fnList[0];
  }
}
