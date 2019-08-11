import { Fn } from "./interface";
export declare const matchCompose: <T, R, CaseType extends string | number | symbol>(matcher: Fn<T, CaseType>, cases: Record<CaseType, Fn<T, R>>) => (param: T) => R;
