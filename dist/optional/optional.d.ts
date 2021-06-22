import { Callback, Consumer, Fn, Predicate, Supplier } from "../fn/interface";
import { IResult } from "../result";
import { INone, IOptional, ISome } from "./interface";
import { Nullable } from "../types/interface";
export declare class Optional<T> implements IOptional<T> {
    private readonly data;
    private constructor();
    static of<T>(value?: Nullable<T>): IOptional<T>;
    static some<T>(value: NonNullable<T>): ISome<T>;
    static none<T>(): INone<T>;
    static liftList<T>(list: Array<IOptional<T>>): ISome<T[]>;
    static flatten<T>(value: IOptional<IOptional<T>>): IOptional<T>;
    static unboxList<T>(list: Array<IOptional<T>>): T[];
    static coalesce<T>(list: Array<IOptional<T>>): IOptional<T>;
    isPresent(): this is ISome<T>;
    isEmpty(): this is INone<T>;
    get value(): T | undefined;
    mapToProperty<F extends keyof T>(field: F): IOptional<Required<T>[F]>;
    filter(predicate: Predicate<T>): IOptional<T>;
    filterProperty<F extends keyof T>(field: F, predicate: Predicate<NonNullable<T[F]>>): IOptional<T>;
    map<R>(fn: Fn<T, Nullable<R>>): IOptional<R>;
    flatMap<R>(fn: Fn<T, IOptional<R>>): IOptional<R>;
    orElse(defaultVal: null | undefined): INone<T>;
    orElse(defaultVal: NonNullable<T>): ISome<T>;
    orElseGet(fn: Supplier<null | undefined>): INone<T>;
    orElseGet(fn: Supplier<NonNullable<T>>): ISome<T>;
    orElseThrow<E extends Error>(fn: Supplier<NonNullable<E>>): ISome<T> | never;
    try<R, E>(fn: Fn<T, R>): IOptional<IResult<R, E>>;
    coalesce(other: ISome<T>): ISome<T>;
    ifPresent(fn: Consumer<T>): IOptional<T>;
    ifEmpty(fn: Callback): IOptional<T>;
    toResult<E>(fn: Supplier<E>): IResult<T, E>;
}
