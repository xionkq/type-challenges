/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal

  ### Question

  Replace the `camelCase` or `PascalCase` string with `kebab-case`.

  `FooBarBaz` -> `foo-bar-baz`

  For example

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">
  const foobarbaz: FooBarBaz = "foo-bar-baz"

  type DoNothing = KebabCase<"do-nothing">
  const doNothing: DoNothing = "do-nothing"
  ```

  > View on GitHub: https://tsch.js.org/612
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 过是过了，但是写的有些许丑陋了。。
  2. 关键点一，在于如何判断一个字符是大写字母，我在题解里的做法是：判断字符是否等于它的小写，是则是小写，否则是大写
  3. 关键点二，在于如何处理首字母大写的情况，我这里通过永远查看第二个字符而不是第一个来实现的
*/
type KebabCase<S> = S extends `${infer First}${infer Second}${infer R}`
  ? Second extends Lowercase<Second>
    ? `${Lowercase<First>}${KebabCase<`${Second}${R}`>}`
    :`${Lowercase<First>}-${KebabCase<`${Lowercase<Second>}${R}`>}`
  : S

/*
笔记:
  1. Uncapitalize，用于将字符串首字母转为小写
*/
// type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
//   ? S2 extends Uncapitalize<S2>
//     ? `${Lowercase<S1>}${KebabCase<S2>}`
//     : `${Lowercase<S1>}-${KebabCase<S2>}`
//   : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = KebabCase<'foo-bar'>
let a: A

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/612/answer
  > View solutions: https://tsch.js.org/612/solutions
  > More Challenges: https://tsch.js.org
*/
