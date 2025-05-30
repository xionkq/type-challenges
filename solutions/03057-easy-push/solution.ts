/*
  3057 - Push
  -------
  by jiangshan (@jiangshanmeta) #简单 #array

  ### 题目

  在类型系统里实现通用的 ```Array.push``` 。

  例如：

  ```typescript
  type Result = Push<[1, 2], '3'> // [1, 2, '3']
  ```

  > 在 Github 上查看：https://tsch.js.org/3057/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. unknown 类似于 any，表示任意值，但更安全，因为对 unknown 执行任何操作都是非法的
  2. 类型中可以直接使用展开操作符展开数组，而无需通过 infer 取出值
*/
type Push<T extends readonly unknown[], U> = [...T, U]
// type Push<T extends readonly any[], U> = T extends [...infer R] ? [...R, U] : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/3057/answer/zh-CN
  > 查看解答：https://tsch.js.org/3057/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
