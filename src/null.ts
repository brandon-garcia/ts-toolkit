const coalesce = <T> (...options: Array<T|null|undefined>): T | undefined => {
  for (let v of options) {
    if (v != null) {
      return v;
    }
  }
  return undefined;
};

const undefinedToNull = <T> (v: T|null|undefined): T | null =>
  v != null ? v : null;

const nullToUndefined = <T> (v: T|null|undefined): T | undefined =>
  v != null ? v : undefined;

export const NullUtils = {
  coalesce,
  undefinedToNull,
  nullToUndefined,
};
