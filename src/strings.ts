
const regexNumeric = /^\d+$/.compile();

export const StringUtils = {
  isNumeric: (str: string) => str.length > 0 && regexNumeric.test(str),
  stripWhitespace: (str: string) => str.replace(/\s/, ""),
  stripNonNumeric: (str: string) => str.replace(/\D/, ""),
};
