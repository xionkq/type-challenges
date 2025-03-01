/*
  119 - ReplaceAll
  -------
  by Anthony Fu (@antfu) #中等 #template-literal

  ### 题目

  实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。

  例如

  ```ts
  type replaced = ReplaceAll<'t y p e s', ' ', ''> // 期望是 'types'
  ```

  > 在 Github 上查看：https://tsch.js.org/119/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 没想到模板字符串还能自动匹配，学到了
  2. 递归匹配目标字符串，需要注意的是每次递归只匹配最右侧字符串，避免重复匹配
*/
type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${ReplaceAll<`${R}`, From, To>}`
    : S

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = ReplaceAll<'foobarfoobar', 'ob', 'b'>
let a: A

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/119/answer/zh-CN
  > 查看解答：https://tsch.js.org/119/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
