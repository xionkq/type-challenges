/*
  43 - 实现 Exclude
  -------
  by Zheeeng (@zheeeng) #简单 #built-in #union

  ### 题目

  实现内置的 `Exclude<T, U>` 类型，但不能直接使用它本身。

  > 从联合类型 `T` 中排除 `U` 中的类型，来构造一个新的类型。

  例如：

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > 在 Github 上查看：https://tsch.js.org/43/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 条件类型：即通过三目运算符判断类型
  2. 当在泛型上使用条件类型时，会遍历泛型上所有类型依次操作，相当于泛型中每个元素都会执行条件判断
  3. 当在普通类型上使用条件类型时，普通类型上的元素不会一个个取出操作，而是整体操作
  4. https://github.com/type-challenges/type-challenges/issues/54
*/
type MyExclude<T, U> = T extends U ? never : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/43/answer/zh-CN
  > 查看解答：https://tsch.js.org/43/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
