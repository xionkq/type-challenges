/*
  17 - 柯里化 1
  -------
  by Anthony Fu (@antfu) #困难 #array

  ### 题目

  > 在此挑战中建议使用TypeScript 4.0

  [柯里化](https://en.wikipedia.org/wiki/Currying) 是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

  例如：

  ```ts
  const add = (a: number, b: number) => a + b
  const three = add(1, 2)

  const curriedAdd = Currying(add)
  const five = curriedAdd(2)(3)
  ```

  传递给 `Currying` 的函数可能有多个参数，您需要正确输入它的类型。

  在此挑战中，柯里化后的函数每次仅接受一个参数。接受完所有参数后，它应返回其结果。

  > 在 Github 上查看：https://tsch.js.org/17/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 泛型类型拓宽：当泛型无约束时，泛型保留最具体的类型；当泛型有约束时，会拓宽字面量满足更通用的类型
  2. 当函数没有定义泛型参数时，即使使用 typeof 获取参数类型，最终结果也不会根据参数类型变化
  3. 定义泛型之后，使用 typeof 获取参数类型，则结果可以根据参数类型变化
*/
type CurryingType<T> = T extends (...args: infer P) => infer R
  ? P extends [infer F, ...infer Rest]
    ? (a: F) => CurryingType<(...a: Rest) => R>
    : ReturnType<T>
  : never

declare function Currying<T>(
  fn: T
): T extends (...args: infer P) => infer R
  ? P['length'] extends 0
    ? () => ReturnType<T>
    : CurryingType<typeof fn>
  : never

/* _____________ 泛型类型拓宽 _____________ */

declare function MyTypeof1<T>(fn: T): typeof fn
declare function MyTypeof2<T extends (...args: any) => any>(fn: T): typeof fn
const t1 = MyTypeof1(() => true)
const t2 = MyTypeof2(() => true)

type T1 = typeof t1
type T2 = typeof t2
let a: T1 // type T1 = () => true
let b: T2 // type T2 = () => boolean

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)
const curried4 = Currying(() => 1)

type cases = [
  Expect<Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>>,
  Expect<
    Equal<
      typeof curried2,
      (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >,
  Expect<Equal<typeof curried3, () => true>>,
  Expect<Equal<typeof curried4, () => 1>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/17/answer/zh-CN
  > 查看解答：https://tsch.js.org/17/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
