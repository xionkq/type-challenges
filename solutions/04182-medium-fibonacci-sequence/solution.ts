/*
  4182 - 斐波那契序列
  -------
  by windliang (@wind-liang) #中等

  ### 题目

  Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```js
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > 在 Github 上查看：https://tsch.js.org/4182/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 究极无敌复杂的实现方式。。甚至都不想写思路
  2. 感觉这种不如直接提前写好斐波那契的对象，然后根据索引查，毕竟 ts 类型递归深度还是比较浅的
*/
type NumToLengthArr<N extends number, Arr extends any[] = []> = Arr['length'] extends N ? Arr : NumToLengthArr<N, [...Arr, any]>

type SubtractOne<T extends number, Arr extends any[] = []> = T extends 0
  ? T
  : [...Arr, any]['length'] extends T
    ? Arr['length']
    : SubtractOne<T, [...Arr, any]>

type SubtractTwo<N extends number> = SubtractOne<SubtractOne<N>>

type Add<T extends number, U extends number> = [...NumToLengthArr<T>, ...NumToLengthArr<U>]['length']

type Fibonacci<T extends number, Arr extends any[] = []> = Arr['length'] extends T
  ? Arr[SubtractOne<T>]
  : Arr['length'] extends 0
    ? Fibonacci<T, [1]>
    : Arr['length'] extends 1
      ? Fibonacci<T, [1, 1]>
      : Fibonacci<T, [...Arr, Add<Arr[SubtractOne<Arr['length']>], Arr[SubtractTwo<Arr['length']>]>]>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = Fibonacci<3>
let a: A

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/4182/answer/zh-CN
  > 查看解答：https://tsch.js.org/4182/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
