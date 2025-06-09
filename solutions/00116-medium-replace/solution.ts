/*
  116 - Replace
  -------
  by Anthony Fu (@antfu) #中等 #template-literal

  ### 题目

  实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

  例如

  ```ts
  type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
  ```

  > 在 Github 上查看：https://tsch.js.org/116/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 如果想从模板字符串中匹配指定字符串，需要使用 `${From}` 而不是 `${infer S extends From}`
  2. `${infer S extends From}` 意为按顺序取出字符 S，然后判断其是否继承 From
*/
type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${R}`
    : S

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type A = Replace<'foobarbar', 'bra', 'foo'>
let a: A

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/116/answer/zh-CN
  > 查看解答：https://tsch.js.org/116/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
