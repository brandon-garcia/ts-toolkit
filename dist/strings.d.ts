export declare const StringUtils: {
    isNumeric: (str: string) => boolean;
    stripWhitespace: (str: string) => string;
    stripNonNumeric: (str: string) => string;
    split: (delim: string) => (str: string) => string[];
    trim: (str: string) => string;
};
