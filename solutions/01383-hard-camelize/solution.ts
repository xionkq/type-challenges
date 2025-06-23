/*
  1383 - Camelize
  -------
  by Denis (@denchiklut) #困难 #union #recursion

  ### 题目

  实现 Camelize 类型: 将对象属性名从 蛇形命名(下划线命名) 转换为 小驼峰命名

  ```ts
  Camelize<{
    some_prop: string,
    prop: { another_prop: string },
    array: [{ snake_case: string }]
  }>

  // expected to be
  // {
  //   someProp: string,
  //   prop: { anotherProp: string },
  //   array: [{ snakeCase: string }]
  // }
  ```

  > 在 Github 上查看：https://tsch.js.org/1383/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 数组和对象分类讨论
  2. 我还以为可以像处理对象一样处理数组，例如使用 keyof [any, any] 得到 0 | 1，但似乎并不行
*/
type CamelCaseString<T> = T extends `${infer L}_${infer R}` ? CamelCaseString<`${L}${Capitalize<R>}`> : T

type CamelCaseArray<T extends any[], Res extends any[] = []> = T extends [infer F, ...infer R]
  ? CamelCaseArray<R, [...Res, Camelize<F>]>
  : Res

type CamelCaseObject<T> = {
  [K in keyof T as CamelCaseString<K>]: T[K] extends object ? Camelize<T[K]> : T[K]
}

type Camelize<T> = T extends any[] ? CamelCaseArray<T> : CamelCaseObject<T>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = Camelize<{
  some_prop: string
  prop: { another_prop: string }
  array: [
    { snake_case: string },
    { another_element: { yet_another_prop: string } },
    { yet_another_element: string },
  ]
}>

let a: A

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/1383/answer/zh-CN
  > 查看解答：https://tsch.js.org/1383/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
