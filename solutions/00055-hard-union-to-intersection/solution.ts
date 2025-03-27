/*
  55 - 联合类型转化为交叉类型
  -------
  by Zheeeng (@zheeeng) #困难 #utils #infer

  ### 题目

  实现高级工具类型 `UnionToIntersection<U>`

  例如

  ```ts
  type I = UnionToIntersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
  ```

  > 在 Github 上查看：https://tsch.js.org/55/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 每当一个题看上去像是要遍历或递归联合类型时，题解就一定不会用到递归或遍历，不如叫 ts 的奇技淫巧:(
  2. 此题算是将类型推断为交叉类型的特殊写法
*/
type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => void) ? I : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = UnionToIntersection<(() => 'foo') | ((i: 42) => true)>
let a: A

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/55/answer/zh-CN
  > 查看解答：https://tsch.js.org/55/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
