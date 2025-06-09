/*
  399 - Tuple Filter
  -------
  by Ryo Hanafusa (@softoika) #hard #tuple #infer

  ### Question

  Implement a type `FilterOut<T, F>` that filters out items of the given type `F` from the tuple `T`.

  For example,
  ```ts
  type Filtered = FilterOut<[1, 2, null, 3], null> // [1, 2, 3]
  ```

  > View on GitHub: https://tsch.js.org/399
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. T extends [infer E, ...infer R]，即使 T 为单元素数组，条件也会成立，此时 R 为空数组
  2. never extends never 似乎会出问题，gpt 说是因为 never 是特殊的联合类型，因而在条件类型中会出问题
*/
type FilterOut<T extends any[], F> = T extends [infer E, ...infer R]
  ? [E] extends [F]
    ? FilterOut<R, F>
    : [E, ...FilterOut<R, F>]
  : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = [1] extends [infer F, ...infer R] ? R : false
let a: A

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/399/answer
  > View solutions: https://tsch.js.org/399/solutions
  > More Challenges: https://tsch.js.org
*/
