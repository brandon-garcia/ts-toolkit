import {Fn} from "./interface";

export const matchCompose = <T, R, CaseType extends string|number|symbol> (matcher: Fn<T, CaseType>, cases: Record<CaseType, Fn<T, R>>) =>
  (param: T) => cases[ matcher(param) ](param);
