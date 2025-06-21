/*
  3188 - Tuple to Nested Object
  -------
  by jiangshan (@jiangshanmeta) #medium #object #tuple

  ### Question

  Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
  ```

  > View on GitHub: https://tsch.js.org/3188
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 问题在于如何优雅得指定一个动态字符串作为对象类型的 key 呢，只能想到 [K in TargetString] 的方法
  2. 看了下解答，似乎大家都是使用这种办法
*/
type TupleToNestedObject<T extends any[], U> = T extends [] ?
  U
  : T extends [...infer R, infer L extends PropertyKey]
    ? TupleToNestedObject<R, { [K in L]: U }>
    : { [K in T[0]]: U }

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type B = ['1'] extends [...infer R, infer L] ? R : false
let b: B
type A = TupleToNestedObject<['a'], string>
let a: A

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3188/answer
  > View solutions: https://tsch.js.org/3188/solutions
  > More Challenges: https://tsch.js.org
*/
