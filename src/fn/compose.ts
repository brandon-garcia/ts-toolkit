import {Fn} from "./interface";

export const compose = <T1, T2, T3 = T2, T4 = T3, T5 = T4, T6 = T5, T7 = T6, T8 = T7, T9 = T8, T10 = T9, T11 = T10> (
  f1: Fn<T1, T2>,
  f2: Fn<T2, T3>,
  f3?: Fn<T3, T4>,
  f4?: Fn<T4, T5>,
  f5?: Fn<T5, T6>,
  f6?: Fn<T6, T7>,
  f7?: Fn<T7, T8>,
  f8?: Fn<T8, T9>,
  f9?: Fn<T9, T10>,
  f10?: Fn<T10, T11>,
): Fn<T1, T11> => {
  if (f3) {
    if (f4) {
      if (f5) {
        if (f6) {
          if (f7) {
            if (f8) {
              if (f9) {
                if (f10) {
                  return (p) => f10(f9(f8(f7(f6(f5(f4(f3(f2(f1(p))))))))));
                }
                return (p) => f9(f8(f7(f6(f5(f4(f3(f2(f1(p))))))))) as any;
              }
              return (p) => f8(f7(f6(f5(f4(f3(f2(f1(p)))))))) as any;
            }
            return (p) => f7(f6(f5(f4(f3(f2(f1(p))))))) as any;
          }
          return (p) => f6(f5(f4(f3(f2(f1(p)))))) as any;
        }
        return (p) => f5(f4(f3(f2(f1(p))))) as any;
      }
      return (p) => f4(f3(f2(f1(p)))) as any;
    }
    return (p) => f3(f2(f1(p))) as any;
  }
  return (p) => f2(f1(p)) as any;
};

