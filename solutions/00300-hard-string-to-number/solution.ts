/*
  300 - String to Number
  -------
  by Pig Fang (@g-plane) #hard #template-literal

  ### Question

  Convert a string literal to a number, which behaves like `Number.parseInt`.

  > View on GitHub: https://tsch.js.org/300
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 模板字符串竟然这么强大
  2. 使用 infer 推断类型是相当于定义泛型？因为似乎使用的是 extends 而不是 as 来定义泛型值
  2. 要处理的情况很多，疯狂使用三目运算符...
*/
type ToNumber<S extends string> = S extends '0'
  ? 0
  : S extends `0${infer N}`
    ? ToNumber<N> // Recursively processes leading zeros (e.g., "0027" -> "27")
    : S extends `.${infer N}`
      ? StringToNumber<`0.${N}`> // Handles pure decimals (e.g., ".11" -> "0.11")
      : S extends `${infer A}.${infer B}`
        ? StringToNumber<`${A}.${B}`> // Handles standard decimal notation (e.g., "27.11")
        : StringToNumber<S> // Delegates to helper type for final conversion

// Helper type to leverage TS 4.8+ `${infer N extends number}` syntax
type StringToNumber<S extends string> = S extends `${infer N extends number}` ? N : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
  Expect<Equal<ToNumber<'0027'>, 27>>,
  Expect<Equal<ToNumber<'027.11'>, 27.11>>,
  Expect<Equal<ToNumber<'0.11'>, 0.11>>,
  Expect<Equal<ToNumber<'027.1s1'>, never>>,
  Expect<Equal<ToNumber<'18@7_$%'>, never>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/300/answer
  > View solutions: https://tsch.js.org/300/solutions
  > More Challenges: https://tsch.js.org
*/
