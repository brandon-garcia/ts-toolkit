import {Fn} from "../src/fn/interface";
import {Pipeline} from "../src/pipeline";
import {compose} from "../src/fn/compose";

test("compose/pipeline perf", () => {

  const fn1 = (n: number) => n * 2;
  const fn2 = (n: number) => n * 3;
  const fn3 = (n: number) => n * 4;
  const fn4 = (n: number) => n * 5;
  const fn5 = (n: number) => n * 6;
  const fn6 = (n: number) => n * 7;
  const fn7 = (n: number) => n * 8;
  const fn8 = (n: number) => n * 9;
  const fn9 = (n: number) => `n: "${n}"`;
  const fn10 = (s: string) => s.length;

  const viaCompose: Fn<number, number> = compose(fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8, fn9, fn10);
  const viaPipeline: Fn<number, number> = Pipeline.identity<number>()
    .map(fn1)
    .map(fn2)
    .map(fn3)
    .map(fn4)
    .map(fn5)
    .map(fn6)
    .map(fn7)
    .map(fn8)
    .map(fn9)
    .map(fn10)
    .toCallable();

  //const testFn = viaCompose;
  const testFn = viaPipeline;

  let previous = 0;
  for (let i = 0; i < 100000000; i++) {
    previous = testFn(i + previous.toString().length);
  }

  // baseline 3ms
  // compose: 21s 165 ms
  // pipeline: 33s 607 ms
});
