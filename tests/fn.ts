import {Fn, FnUtils} from "../src/fn";

test("FnUtils.compose", () => {
  const fn: Fn<number, string> = FnUtils.compose(
    (n: number) => n * 2,
    (n: number) => n * 3,
    (n: number) => n * 4,
    (n: number) => n * 5,
    (n: number) => n * 6,
    (n: number) => n * 7,
    (n: number) => n * 8,
    (n: number) => n * 9,
    (n : number) => `n: "${n}"`,
  );

  expect(fn(1)).toBe('n: "362880"');
});
