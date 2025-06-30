/*
  4037 - IsPalindrome
  -------
  by jiangshan (@jiangshanmeta) #hard #string

  ### Question

  Implement type ```IsPalindrome<T>``` to check whether  a string or number is palindrome.

  For example:

  ```typescript
  IsPalindrome<'abc'> // false
  IsPalindrome<121> // true
  ```

  > View on GitHub: https://tsch.js.org/4037
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 将字符串反转，判断其是否和初始字符串相同
*/
type Reverse<T extends any[], Res extends any[] = []> = T extends [infer F, ...infer R]
  ? Reverse<R, [F, ...Res]>
  : Res

type StringToArray<T extends string, Res extends any[] = []> = T extends `${infer F}${infer R}`
  ? StringToArray<R, [...Res, F]>
  : Res

type ArrayToString<T extends any[], Res extends string = ''> = T extends [infer F extends string, ...infer R]
  ? ArrayToString<R, `${Res}${F}`>
  : Res

type IsPalindrome<T extends string | number> = ArrayToString<Reverse<StringToArray<`${T}`>>> extends `${T}`
  ? true
  : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abba'>, true>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<2332>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4037/answer
  > View solutions: https://tsch.js.org/4037/solutions
  > More Challenges: https://tsch.js.org
*/
