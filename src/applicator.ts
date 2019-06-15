import {Fn, Fn2, Fn3, Fn4, Supplier} from "./fn";

interface IApplicator0<R> {
  toCallable(): Supplier<R>;
}

interface IApplicator1<T1, R> {
  left(param: T1): IApplicator0<R>;
  right(param: T1): IApplicator0<R>;
  toCallable(): Fn<T1, R>;
}

interface IApplicator2<T1, T2, R> {
  left(param: T1): IApplicator1<T2, R>;
  right(param: T2): IApplicator1<T1, R>;
  toCallable(): Fn2<T1, T2, R>;
}

interface IApplicator3<T1, T2, T3, R> {
  left(param: T1): IApplicator2<T2, T3, R>;
  right(param: T3): IApplicator2<T1, T2, R>;
  toCallable(): Fn3<T1, T2, T3, R>;
}

interface IApplicator4<T1, T2, T3, T4, R> {
  left(param: T1): IApplicator3<T2, T3, T4, R>;
  right(param: T4): IApplicator3<T1, T2, T3, R>;
  toCallable(): Fn4<T1, T2, T3, T4, R>;
}

export class Applicator {
  public static from1<T1, R>(fn: Fn<T1, R>): IApplicator1<T1, R> {
    return new Applicator(fn) as IApplicator1<T1, R>;

  }

  public static from2<T1, T2, R>(fn: Fn2<T1, T2, R>): IApplicator2<T1, T2, R> {
    return new Applicator(fn) as IApplicator2<T1, T2, R>;
  }

  public static from3<T1, T2, T3, R>(fn: Fn3<T1, T2, T3, R>): IApplicator3<T1, T2, T3, R> {
    return new Applicator(fn) as IApplicator3<T1, T2, T3, R>;
  }

  public static from4<T1, T2, T3, T4, R>(fn: Fn4<T1, T2, T3, T4, R>): IApplicator4<T1, T2, T3, T4, R> {
    return new Applicator(fn) as IApplicator4<T1, T2, T3, T4, R>;
  }

  private constructor(private readonly fn: (...args: any[]) => any) {
  }

  public left(param: any): this {
    return new Applicator((...params: any[]) => this.fn(param, ...params)) as this;
  }

  public right(param: any): this {
    return new Applicator((...params: any[]) => this.fn(...params, param)) as this
  }

  public toCallable(): (...args: any[]) => any {
    return this.fn;
  }
}
