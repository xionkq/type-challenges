/*
  10 - 元组转合集
  -------
  by Anthony Fu (@antfu) #中等 #infer #tuple #union

  ### 题目

  实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

  例如

  ```ts
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```

  > 在 Github 上查看：https://tsch.js.org/10/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 递归取出元组所有类型值，将其作为联合类型返回
  补. 更简单的办法是直接通过类型推断，取出元组类型。。。
  再补. 或是直接取出所有 key 为 number 的值，在元组中这意味着取出所有元素
*/

// type TupleToUnion<T extends any[]> = T extends [infer F, ...infer R] ? TupleToUnion<R> | F : never
// type TupleToUnion<T extends any[]> = T extends Array<infer R> ? R : never
type TupleToUnion<T extends any[]> = T[number]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/10/answer/zh-CN
  > 查看解答：https://tsch.js.org/10/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
