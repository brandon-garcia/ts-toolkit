export declare const StringUtils: {
    isAlphaNumeric: (str: string) => boolean;
    isNumeric: (str: string) => boolean;
    stripWhitespace: (str: string) => string;
    stripNonNumeric: (str: string) => string;
    split: (delim: string) => (str: string) => string[];
    trim: (str: string) => string;
};
