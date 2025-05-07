/*
  223 - IsAny
  -------
  by Pavel Glushkov (@pashutk) #hard #utils

  ### Question

  Sometimes it's useful to detect if you have a value with `any` type. This is especially helpful while working with third-party Typescript modules, which can export `any` values in the module API. It's also good to know about `any` when you're suppressing implicitAny checks.

  So, let's write a utility type `IsAny<T>`, which takes input type `T`. If `T` is `any`, return `true`, otherwise, return `false`.

  > View on GitHub: https://tsch.js.org/223
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. any 是包含所有单个类型的集合
  2. any 是唯一一个既继承 never，又不继承 never 的类型（？）
  3. 使用交集操作 & 时，结果应该缩小到两集合中小的那一个。但 any 和任何类型的交集都是 any
*/
type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false
type IsAny1<T> = 0 extends (1 & T) ? true : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/223/answer
  > View solutions: https://tsch.js.org/223/solutions
  > More Challenges: https://tsch.js.org
*/
