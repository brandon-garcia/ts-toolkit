# ts-toolkit
Helper Code For Typescript Projects (not fully documented, see code for a better understanding of available features).

### Function type aliases

```
type Fn0<R> = () => R;
type Fn<P1, R> = (p1: P1) => R
// Fn2
// Fn3
// Fn4
// Fn5
// Fn6
// Fn7
// Fn8

type Consumer<T> = Fn<T, void>;
type Supplier<T> = Fn0<T>;
type Predicate<T> = Fn<T, boolean>;
type Reducer<T> = Fn2<T, T, T>;
type Comparator<T> = Fn2<T, T, -1|0|1>;
type Callback = Fn0<void>;
```

### compose

Can compose up to 10 functions

```
import {Fn, compose} from "@bcg-ts/ts-toolkit";

const fn1: Fn<number, string> = (val: number) => val.toString();
const fn2: Fn<string, number> = (val: string) => val.length;
const fn3: Fn<number, number> = compose(fn1, fn2);
```

### TypeUtils

```
import {TypeUtils} from "@bcg-ts/ts-toolkit";

TypeUtils.boolean(false); // true
TypeUtils.boolean(1); // false
// TypeUtils.function( ... )
// TypeUtils.nonNull( ... )
// TypeUtils.nonEmptyString( ... )
// TypeUtils.null( ... )
// TypeUtils.undefined( ... )
// TypeUtils.number( ... )
// TypeUtils.object( ... )
// TypeUtils.string( ... )
// TypeUtils.symbol( ... )
// TypeUtils.unknown ( ... )

TypeUtils.field({ value: 1 }, "value", TypeUtils.number) // true
```

### Pipeline

uses "compose" internally to avoid intermediate values

```
import {Fn, Pipeline} from "@bcg-ts/ts-toolkit";

const numDigits: Fn<number, number> = Pipeline
  .identity<number>()
  .map((val) => val.toString())
  .map((str) => str.length)
  .callable;

const numDigitsStr: Fn<number, string> = Pipeline
  .fromCallable(numDigits)
  .map((val) => val.toString())
  .callable;
```

### Optional

```
import {Optional} from "@bcg-ts/ts-toolkit";

const result: number = Optional.some(1) // number
  .map((val) => val + 1)                // number
  .filter((val) => val > 0)             // number | undefined
  .orElse(0)                            // number
  .value;                               // number
```
