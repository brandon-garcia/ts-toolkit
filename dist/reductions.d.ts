export declare const NumberReducers: {
    max: (first: number, second: number) => number;
    min: (first: number, second: number) => number;
    sum: (first: number, second: number) => number;
    product: (first: number, second: number) => number;
};
export declare const BoolReducers: {
    and: (first: boolean, second: boolean) => boolean;
    or: (first: boolean, second: boolean) => boolean;
};
export declare const StringReducers: {
    makeConcatReducer: (separator: string) => (first: string, second: string) => string;
    concat: (first: string, second: string) => string;
};
