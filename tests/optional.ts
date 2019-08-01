import {Optional} from "../src/optional";

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

