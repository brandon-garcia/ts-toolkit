import { IError } from "./interface";
export declare const isError: <T>(error: T) => error is T & IError;
export declare const normalizeError: (error: unknown, defaultMessage?: string | undefined) => IError;
