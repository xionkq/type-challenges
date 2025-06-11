/*
  114 - CamelCase
  -------
  by Anthony Fu (@antfu) #困难 #template-literal

  ### 题目

  实现 `CamelCase<T>` ，将 `snake_case` 类型的表示的字符串转换为 `camelCase` 的表示方式。

  例如

  ```ts
  type camelCase1 = CamelCase<"hello_world_with_types"> // 预期为 'helloWorldWithTypes'
  type camelCase2 = CamelCase<"HELLO_WORLD_WITH_TYPES"> // 期望与前一个相同
  ```

  > 在 Github 上查看：https://tsch.js.org/114/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 字符串首字符为下划线时，例如 '_aaa'， 可以匹配 `${infer F}_${infer R}`，此时 F 为空字符串 ''
*/
type IsGap<T extends string> = Uppercase<T> extends Lowercase<T> ? true : false
type CamelCase<S extends string> = S extends Lowercase<S>
  ? S extends `${infer F}_${infer RF}${infer R}`
    ? RF extends '_'
      ? `${F}_${CamelCase<`_${R}`>}`
      : `${F}${IsGap<RF> extends true ? `_${RF}` : Uppercase<RF>}${CamelCase<R>}`
    : S
  : CamelCase<Lowercase<S>>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/114/answer/zh-CN
  > 查看解答：https://tsch.js.org/114/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
