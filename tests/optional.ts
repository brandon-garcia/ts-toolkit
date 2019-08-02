import {Optional, IOptional, ISome} from "../src/optional";
import {TypeUtils} from "../src/types/utils";

const onlyPositive = (p: number) =>
  p > 0 ? p : undefined;

const onlyObjectWithId = (p: { id: number }) =>
  onlyPositive(p.id) != null ? p : null;

const onlyUndefined = (p: undefined) => 1;

const onlyTrue = (p: true) => 1;


test("optional: nullable mapper compile test", () => {
  Optional.some(1)
    .map(onlyPositive)
    .map(onlyPositive);
});

test("optional: value type compile test", () => {
  onlyPositive(Optional.some(1).value);

  onlyPositive(Optional.of(onlyPositive(1))
    .orElse(1)
    .value);

  onlyObjectWithId(Optional.of({ id: 1 })
    .map(onlyObjectWithId)
    .orElse({ id: 2 })
    .value);

  onlyUndefined(Optional.none<number>()
    .ifEmpty(() => {})
    .ifPresent(() => {})
    .filter(() => false)
    .map(onlyPositive)
    .value);

  onlyPositive(Optional.some(true)
    .ifEmpty(() => {})
    .ifPresent(() => {})
    .map<true>(() => true)
    .map(onlyTrue)
    .orElse(undefined)
    .orElseGet(() => undefined)
    .value);
});

test("optional.filter typeguard compile test", () => {
  const o = Optional.some(4 as number|string);

  const v: number|undefined = o
    .filter(TypeUtils.number)
    .value;

  expect(v).toBe(4);
});

test("none.coalesce", () => {
  const o1: IOptional<number> = Optional.none<number>();
  const o2: ISome<number> = Optional.some(1);
  const o3: ISome<number> = o1.coalesce(o2);

  expect(o3.value).toBe(1);
});

test("none.orElseThrow", () => {
  const o1 = Optional.none<number>();
  let threwError = false;

  try {
    o1.orElseThrow(() => new Error("hello"));
  } catch (e) {
    threwError = true;
  }

  expect(threwError).toBe(true);
});

test("some.orElseThrow", () => {
  const o1 = Optional.some(1);
  let threwError = false;

  try {
    o1.orElseThrow(() => new Error("hello"));
  } catch (e) {
    threwError = true;
  }

  expect(threwError).toBe(false);
});

test("none.orElseGet", () => {
  const o1 = Optional.none<number>();
  const o2 = o1.orElseGet(() => 1);
  expect(o2.value).toBe(1);
});

test("some.coalesce", () => {
  const o1 = Optional.some<number>(1);
  const o2 = Optional.none<number>();
  const o3 = o1.coalesce(o2);
  expect(o3.value).toBe(1);
});

test("some.flatMap", () => {
  expect(
    Optional.some(1)
      .flatMap((v) => Optional.some(v + 1))
      .value
  ).toBe(2);
});

test("none.flatMap", () => {
  expect(
    Optional.none<number>()
      .flatMap((v) => Optional.some(1))
      .isPresent()
  ).toBe(false);
});

test("none.orElse", () => {
  expect(
    Optional.none<number>()
      .orElse(1)
      .value
  ).toBe(1);
});

test("some.mapToProperty", () => {
  expect(
    Optional.some({ data: 1 })
      .mapToProperty("data")
      .value
  ).toBe(1);
});

test("none.mapToProperty", () => {
  expect(
    Optional.none<{data: number}>()
      .mapToProperty("data")
      .isPresent()
  ).toBe(false);
});

test("Optional.coalesce empty list", () => {
  expect(
    Optional.coalesce<number>([])
      .isPresent()
  ).toBe(false);
});

test("Optional.coalesce 3 items", () => {
  expect(
    Optional.coalesce<number>([
      Optional.none<number>(),
      Optional.some(1 as number),
      Optional.some(2 as number),
    ])
    .value
  ).toBe(1);
});

test("Optional.unboxList", () => {
  const list = Optional.unboxList<number>([
    Optional.none<number>(),
    Optional.some<number>(1),
    Optional.none<number>(),
    Optional.some<number>(2),
    Optional.some<number>(3),
    Optional.none<number>(),
    Optional.some<number>(4),
    Optional.some<number>(5),
  ]);

  expect(list.length).toBe(5);
  for (let i = 0; i < list.length; i++) {
    expect(list[i]).toBe(i+1);
  }
});
