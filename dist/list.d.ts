import { IOptional } from "./optional";
export declare const ListUtils: {
    getFirst: <T>(list: T[]) => IOptional<T>;
    head: <T_1>([first]: T_1[]) => T_1;
    tail: <T_2>([, ...rest]: T_2[]) => T_2[];
};
