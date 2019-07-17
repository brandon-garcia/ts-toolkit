import {Optional} from "../src/optional";

const onlyPositive = (p: number) =>
  p > 0 ? p : undefined;

const onlyObjectWithId = (p: { id: number }) =>
  onlyPositive(p.id) != null ? p : null;

const onlyUndefined = (p: undefined) => 1;


test("optional: nullable mapper compile test", () => {
  Optional.some(1)
    .map(onlyPositive)
    .map(onlyPositive);
});

test("optional: getValue type compile test", () => {
  onlyPositive(Optional.some(1).getValue());

  onlyPositive(Optional.of(onlyPositive(1))
    .orElse(1)
    .getValue());

  onlyObjectWithId(Optional.of({ id: 1 })
    .map(onlyObjectWithId)
    .orElse({ id: 2 })
    .getValue());

  onlyUndefined(Optional.none<number>()
    .map(onlyPositive)
    .getValue());
});

