/*
  3312 - Parameters
  -------
  by midorizemi (@midorizemi) #简单 #infer #tuple #built-in

  ### 题目

  实现内置的 Parameters<T> 类型，而不是直接使用它，可参考[TypeScript官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。

  例如：

  ```ts
  const foo = (arg1: string, arg2: number): void => {}

  type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
  ```

  > 在 Github 上查看：https://tsch.js.org/3312/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. infer 意为推断而非定义，可以在任何使用类型的地方使用，推断出一个可供使用的新泛型
  例如这种推断其实是合法的：(...args: any[]) => any 推断 (...args: [...infer R]) => infer A
*/
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: [...infer R]) => any ? R : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/3312/answer/zh-CN
  > 查看解答：https://tsch.js.org/3312/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
