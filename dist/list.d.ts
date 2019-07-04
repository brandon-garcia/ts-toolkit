import { IOptional } from "./optional";
export declare const ListUtils: {
    getFirst: <T>(list: T[]) => IOptional<T>;
    head: <T>([first]: T[]) => T;
    tail: <T>([, ...rest]: T[]) => T[];
};
