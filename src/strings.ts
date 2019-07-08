const regexNumeric = /^\d+$/.compile();
const regexAlphaNumeric = /^[0-9a-zA-Z]+$/.compile();

const getSplitter = (delim: string) =>
  (str: string) => str.split(delim);

const trim = (str: string) => str.trim();

const isNumeric = (str: string) => str.length > 0 && regexNumeric.test(str);

const isAlphaNumeric = (str: string) => str.length > 0 && regexAlphaNumeric.test(str);

export const StringUtils = {
  isAlphaNumeric,
  isNumeric,
  stripWhitespace: (str: string) => str.replace(/\s/g, ""),
  stripNonNumeric: (str: string) => str.replace(/\D/g, ""),
  split: getSplitter,
  trim,
};
