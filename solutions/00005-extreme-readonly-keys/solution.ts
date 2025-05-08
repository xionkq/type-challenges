/*
  5 - 获取只读属性
  -------
  by Anthony Fu (@antfu) #地狱 #utils #object-keys

  ### 题目

  实现泛型`GetReadonlyKeys<T>`，`GetReadonlyKeys<T>`返回由对象 T 所有只读属性的键组成的联合类型。

  例如

  ```ts
  interface Todo {
    readonly title: string
    readonly description: string
    completed: boolean
  }

  type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"
  ```

  > 在 Github 上查看：https://tsch.js.org/5/zh-CN
*/

/* _____________ 你的代码 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
/*
笔记:
  1. 由于 readonly 属性和非 readonly 属性相互兼容，因此无法通过 extends 判断是否相同
  2. 借助 type-challenges 的 Equal 工具类型判断是否是 readonly
*/
type GetReadonlyKeys<T> = keyof {
  [K in keyof T as Equal<Pick<T, K>, Readonly<Pick<T, K>>> extends true ? K : never]: T[K]
}

/* _____________ 测试用例 _____________ */
type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/5/answer/zh-CN
  > 查看解答：https://tsch.js.org/5/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
