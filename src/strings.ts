
const regexNumeric = /^\d+$/.compile();

const getSplitter = (delim: string) =>
  (str: string) => str.split(delim);

const trim = (str: string) => str.trim();

export const StringUtils = {
  isNumeric: (str: string) => str.length > 0 && regexNumeric.test(str),
  stripWhitespace: (str: string) => str.replace(/\s/g, ""),
  stripNonNumeric: (str: string) => str.replace(/\D/g, ""),
  split: getSplitter,
  trim,
};
