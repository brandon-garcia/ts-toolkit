import {Pipeline} from "../src/pipeline";

test("Pipeline", () => {
  const fn = Pipeline.identity<number>()
    .map((n) => ({ value: n }))
    .mapToProperty("value")
    .callable;

  expect(fn(1)).toBe(1);
});
