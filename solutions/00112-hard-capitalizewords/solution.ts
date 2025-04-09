/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #困难 #template-literal

  ### 题目

  实现`CapitalizeWords<T>`，它将**字符串的每个单词**的第一个字母转换为大写，其余部分保持原样。

  例如

  ```ts
  type capitalized = CapitalizeWords<"hello world, my friends"> // 预期为 'Hello World, My Friends'
  ```

  > 在 Github 上查看：https://tsch.js.org/112/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 一个表情 🤣 竟然占两个字符，通过模板字符串时会取出两个字符串
  2. 因此不能判断非字母字符的下一个字符转为大写
  3. 而是需要判断非字母字符的下一个字母字符转为大写

  1. 好吧竟然有工具类型 Capitalize 用于将字符串的首字母大写
  2. 判断一个字符是否为字母时，可以使用 Lowercase<T> extends Uppercase<T>
*/
type LowercaseLetter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
type Letter = LowercaseLetter | Uppercase<LowercaseLetter>

type MyCapitalize<Str extends string, U = false> = Str extends `${infer F}${infer R}`
  ? F extends Letter
    ? U extends true
      ? `${Uppercase<F>}${MyCapitalize<`${R}`>}`
      : `${F}${MyCapitalize<R>}`
    : `${F}${MyCapitalize<R, true>}`
  : Str

type CapitalizeWords<S extends string> = MyCapitalize<S, true>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello  world'>, 'Foo Bar Hello  World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'pp🤣qq'>, 'Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/112/answer/zh-CN
  > 查看解答：https://tsch.js.org/112/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
