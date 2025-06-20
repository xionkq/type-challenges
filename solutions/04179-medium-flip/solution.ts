/*
  4179 - Flip
  -------
  by Farhan Kathawala (@kathawala) #medium #object

  ### Question

  Implement the type of `just-flip-object`. Examples:

  ```typescript
  Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
  Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
  Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
  ```

  No need to support nested objects and values which cannot be object keys such as arrays

  > View on GitHub: https://tsch.js.org/4179
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 需要判断下反转后的 key 值是否满足作为 key 的条件，不满足则转为字符串
*/
type Flip<T extends Record<string, any>> = {
  [K in keyof T as T[K] extends string | number | symbol ? T[K] : `${T[K]}`]: K
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect, NotEqual } from '@type-challenges/utils'

type A = Flip<{ pi: 3.14, bool: true }>
let a: A

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi', true: 'bool' }, Flip<{ pi: 3.14, bool: true }>>>,
  Expect<Equal<{ val2: 'prop2', val: 'prop' }, Flip<{ prop: 'val', prop2: 'val2' }>>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4179/answer
  > View solutions: https://tsch.js.org/4179/solutions
  > More Challenges: https://tsch.js.org
*/
