/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #中等 #array

  ### 题目

  在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

  例如:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > 在 Github 上查看：https://tsch.js.org/459/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 写出来了，但是这个递归还是有点糊涂
  2. 需要牢记 Flatten 类型接受一个数组，并返回一个完全扁平化数组，会好理解些
*/
type Flatten<T extends any[]> =
  T extends [infer F, ...infer R]
    ? F extends any[]
      ? [...Flatten<F>, ...Flatten<R>]
      : [F, ...Flatten<R>]
    : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = Flatten<[1, [2]]>
let a: A

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error = Flatten<'1'>

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/459/answer/zh-CN
  > 查看解答：https://tsch.js.org/459/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
