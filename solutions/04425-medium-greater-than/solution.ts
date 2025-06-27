/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 先判断数字长度，若更长咋返回 true
  2. 否则对比每个位置的数字依次判断大小
*/
type GreaterThanSingleNum<T extends number, U extends number, Arr extends any[] = []> = T extends Arr['length']
  ? U extends Arr['length']
    ? false
    : false
  : U extends Arr['length']
    ? true
    : GreaterThanSingleNum<T, U, [...Arr, any]>

type GreaterThanEqualLengthNumArr<T, U> = T extends [infer TF extends number, ...infer TR]
  ? U extends [infer UF extends number, ...infer UR]
    ? GreaterThanSingleNum<TF, UF> extends true
      ? true
      : GreaterThanEqualLengthNumArr<TR, UR>
    : false
  : false

type NumToArr<N extends string> = `${N}` extends `${infer F extends number}${infer R}`
  ? [F, ...NumToArr<R>]
  : []

type GreaterThan<T extends number, U extends number> = GreaterThanSingleNum<NumToArr<`${T}`>['length'], NumToArr<`${U}`>['length']> extends true
  ? true
  : GreaterThanEqualLengthNumArr<NumToArr<`${T}`>, NumToArr<`${U}`>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = NumToArr<'1000'>
let a: A

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
