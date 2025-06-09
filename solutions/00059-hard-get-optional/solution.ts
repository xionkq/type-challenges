/*
  59 - 获得可选属性
  -------
  by Zheeeng (@zheeeng) #困难 #utils #infer

  ### 题目

  实现高级工具类型 `GetOptional<T>`，该类型保留所有可选属性

  例如

  ```ts
  type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
  ```

  > 在 Github 上查看：https://tsch.js.org/59/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 上一题的相反就行，判断类型是否等于，将其转为必须后的类型
*/
type GetOptional<T> = {
  [K in keyof T as Pick<T, K> extends Required<Pick<T, K>> ? never : K]: T[K]
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type A = GetOptional<{ foo: number; bar?: string }>
let a: A

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/59/answer/zh-CN
  > 查看解答：https://tsch.js.org/59/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
