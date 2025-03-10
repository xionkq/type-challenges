/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #中等 #object

  ### 题目

  将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。

  例如

  ```ts
  type foo = {
    name: string;
    age: string;
  }

  type coo = {
    age: number;
    sex: string
  }

  type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}
  ```

  > 在 Github 上查看：https://tsch.js.org/599/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 第一步，分别遍历 F 和 S 泛型，判断键是否在 S 中，是则使用 S 中的类型
  2. 第二步，将上述两类型交叉
  3. 第三步，将交叉类型合并为一整个类型
*/
type MyIntersection<F extends Record<string, any>, S extends Record<string, any>> = {
  [K in keyof F]: K extends keyof S ? S[K] : F[K]
} & {
  [K in keyof S]: S[K]
}
type Merge<F extends Record<string, any>, S extends Record<string, any>> = {
  [K in keyof MyIntersection<F, S>]: MyIntersection<F, S>[K]
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type A = Merge<Foo, Bar>
let a: A

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number
        b: number
        c: boolean
      }
    >
  >,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/599/answer/zh-CN
  > 查看解答：https://tsch.js.org/599/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
