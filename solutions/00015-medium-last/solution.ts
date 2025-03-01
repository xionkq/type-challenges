/*
  15 - 最后一个元素
  -------
  by Anthony Fu (@antfu) #中等 #array

  ### 题目

  > 在此挑战中建议使用TypeScript 4.0

  实现一个`Last<T>`泛型，它接受一个数组`T`并返回其最后一个元素的类型。

  例如

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type tail1 = Last<arr1> // 应推导出 'c'
  type tail2 = Last<arr2> // 应推导出 1
  ```

  > 在 Github 上查看：https://tsch.js.org/15/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 通过数组长度获取最后一个元素的索引，直接访问，非常聪明的方法
*/
type Last<T extends any[]> = T extends [infer F, ...infer R] ? T[R['length']] : never
/*
笔记:
  1. 扩展运算符还能用到数组前面？？？第一次知道
  2. 跟拿到第一个元素的方法一样，去拿最后一个元素
*/
// type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never
/*
笔记:
  1. 使用 infer 进行类型推断，递归法找出最后一个元素
*/
// type Last<T extends any[]> = T['length'] extends 1 ? T[0] : T extends [infer F, ...infer R] ? Last<R> : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/15/answer/zh-CN
  > 查看解答：https://tsch.js.org/15/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
