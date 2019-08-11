import {TypeUtils} from "../src/types";

test("TypeUtils.boolean", () => {
  expect(TypeUtils.boolean(false)).toBe(true);
});

test("TypeUtils.number", () => {
  expect(TypeUtils.number(1)).toBe(true);
});

test("TypeUtils.object", () => {
  expect(TypeUtils.object({})).toBe(true);
});

test("TypeUtils.string", () => {
  expect(TypeUtils.string("")).toBe(true);
});

test("TypeUtils.null", () => {
  expect(TypeUtils.null(null)).toBe(true);
});

test("TypeUtils.undefined", () => {
  expect(TypeUtils.undefined(undefined)).toBe(true);
});

test("TypeUtils.unknown", () => {
  expect(TypeUtils.unknown("")).toBe(true);
});
