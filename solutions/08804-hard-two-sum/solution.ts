/*
  8804 - 两数之和
  -------
  by PsiloLau (@Psilocine) #困难 #array #math

  ### 题目

  给定一个整数数组 nums 和一个目标整数 target, 如果 nums 数组中存在两个元素的和等于 target 返回 true, 否则返回 false

  > 在 Github 上查看：https://tsch.js.org/8804/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 取出数组第一个元素 F，判断是否比目标数字 U 大，若小则继续，否则重复第一步
  2. 目标数字 U 减去 F 得到 S，判断剩余数组是否包含 S，包含则返回 true，否则回到第一步
*/
type IsMax<T, U, Arr extends any[] = []> = T extends Arr['length'] ? false : U extends Arr['length'] ? true : IsMax<T, U, [...Arr, any]>

type NumberToArray<T, Res extends any[] = []> = T extends Res['length'] ? Res : NumberToArray<T, [...Res, any]>

type Subtraction<T, U, Arr extends any[] = []> = T extends [...NumberToArray<U>, ...Arr]['length'] ? Arr['length'] : Subtraction<T, U, [...Arr, any]>

type Include<T extends any[], U> =  T extends [infer F, ...infer R] ? F extends U ? true : Include<R, U> : false

type TwoSum<T extends number[], U extends number> = T extends [infer F, ...infer R extends number[]] ? IsMax<F, U> extends true ? TwoSum<R, U> : Include<R, Subtraction<U, F>> extends true ? true : TwoSum<R, U> : false

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = TwoSum<[1, 2, 3], 5>
let a: A

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/8804/answer/zh-CN
  > 查看解答：https://tsch.js.org/8804/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
