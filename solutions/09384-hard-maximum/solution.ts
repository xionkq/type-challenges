/*
  9384 - Maximum
  -------
  by ch3cknull (@ch3cknull) #hard #array

  ### Question

  ### Description

  Implement the type `Maximum`, which takes an input type `T`, and returns the maximum value in `T`.

  If `T` is an empty array, it returns `never`. **Negative numbers** are not considered.

  For example:

  ```ts
  Maximum<[]> // never
  Maximum<[0, 2, 1]> // 2
  Maximum<[1, 20, 200, 150]> // 200
  ```

  ### Advanced

  Can you implement type `Minimum` inspired by `Maximum`?

  > View on GitHub: https://tsch.js.org/9384
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 每次拿出前两个数字出来判断，返回大的那个
  2. 比较两个数字时，先比较数字长度，长度较大则数字较大
  3. 若相等，则从高到低比较数字每一位，相同位的数字大则该数字大
  4. 2、3 两步就可以返回两个数中较大那个，以此比较直到数组只剩下一个元素，返回该元素
  5. ts 中递归若是尾递归，似乎可以处理 1000 次左右，因此这个方法可以处理一些很大的数
*/
type Split<T extends string, Res extends any[] = []> = T extends `${infer F}${infer R}`
  ? Split<R, Res>
  : Res

type IsFirstMaxWithinTen<T extends number, U extends number, Arr extends any[] = []> = T extends U
  ? false
  : T extends Arr['length']
    ? false
    : U extends Arr['length']
      ? true
      : IsFirstMaxWithinTen<T, U, [...Arr, any]>

type IsFirstMaxInTwoEqualLengthNumber<T extends string, U extends string> = T extends `${infer FT extends number}${infer RT}`
  ? U extends `${infer FU extends number}${infer RU}`
    ? IsFirstMaxWithinTen<FT, FU> extends true
      ? true
      : IsFirstMaxInTwoEqualLengthNumber<RT, RU>
    : false
  : false

type MaxInTwoNumber<T extends number, U extends number> = IsFirstMaxWithinTen<Split<`${T}`>['length'], Split<`${U}`>['length']> extends true
  ? T
  : IsFirstMaxInTwoEqualLengthNumber<`${T}`, `${U}`> extends true
    ? T
    : U

type Maximum<T extends any[]> = T extends []
  ? never
  : T extends [infer F extends number, infer S extends number, ...infer R]
    ? Maximum<[MaxInTwoNumber<F, S>, ...R]>
    : T[0]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9384/answer
  > View solutions: https://tsch.js.org/9384/solutions
  > More Challenges: https://tsch.js.org
*/
