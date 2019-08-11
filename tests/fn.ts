import {compose, Fn} from "../src/fn";

test("compose", () => {
  const param = "hello world";
  const lengthFn = (p: string) => p.length;
  const stringifyFn = (p: number) => p.toString();

  const fn2: Fn<string, string> = compose(
    lengthFn,    // 11
    stringifyFn, // "11"
  );

  expect(fn2(param)).toBe("11");

  const fn3 = compose(
    lengthFn,    // 11
    stringifyFn, // "11"
    lengthFn,    // 2
  );

  expect(fn3(param)).toBe(2);

  const fn4 = compose(
    lengthFn,
    stringifyFn,
    lengthFn,    // 2
    stringifyFn, // "2"
  );

  expect(fn4(param)).toBe("2");

  const fn5 = compose(
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,    // 1
  );

  expect(fn5(param)).toBe(1);

  const fn6 = compose(
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn, // "1"
  );

  expect(fn6(param)).toBe("1");

  const fn7 = compose(
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,    // 1
  );

  expect(fn7(param)).toBe(1);

  const fn8 = compose(
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
  );

  expect(fn8(param)).toBe("1");

  const fn9 = compose(
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,
  );

  expect(fn9(param)).toBe(1);

  const fn10 = compose(
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
    lengthFn,
    stringifyFn,
  );

  expect(fn10(param)).toBe("1");
});
