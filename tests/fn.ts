import {compose, createPartialFactory, Fn, memoize} from "../src/fn";
import {Pipeline} from "../src/pipeline";

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

test("createPartialFactory", () => {
  type FullType = {
    a: boolean;
    b: string;
    c: number;
  }

  const fixed = { b: "hello" };
  const remaining = { a: true, c: 1 };

  const factory = createPartialFactory<FullType, "b">(fixed);
  const object: FullType = factory(remaining);

  expect(object.a).toBe(true);
  expect(object.b).toBe("hello");
  expect(object.c).toBe(1);
});

test("memoize", () => {
  const lengthFn = (p: string) => p.length;
  const stringifyFn = (p: number) => p.toString();

  let pipeline = Pipeline.identity<string>();
  for (let i = 0; i < 1000; i++) {
    pipeline = pipeline
      .map(lengthFn)
      .map(stringifyFn);
  }

  const unmemoized = pipeline.callable;
  const memoized = memoize(unmemoized);

  const param = "hello";
  expect(unmemoized(param)).toBe(memoized(param));
});
