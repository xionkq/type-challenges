/*
  9 - 对象属性只读（递归）
  -------
  by Anthony Fu (@antfu) #中等 #readonly #object-keys #deep

  ### 题目

  实现一个泛型 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

  您可以假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

  例如

  ```ts
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }

  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```

  > 在 Github 上查看：https://tsch.js.org/9/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 在映射类型上，原始类型会直接被跳过，因此泛型为 string 时，输出结果也为 string
  2. 而 Function 似乎在该题中需要跳过 readonly，需要判断一下
  所以更好的答案为：
*/
type DeepReadonly<T> = T extends Function ? T : { readonly [k in keyof T]: DeepReadonly<T[k]> }

// 这个答案将会在联合类型上失败，因为联合类型没有 key：
// type DeepReadonly<T> = keyof T extends never
//   ? T
//   : { readonly [k in keyof T]: DeepReadonly<T[k]> };

// 1. 在我的答案中，先判断是否为对象类型，若否则返回，若是则再次判断是否为函数，否则返回，是则递归
// 2. 更好的做法是直接判断泛型上是否可以使用 keyof，以此来判断是否为对象（其实并不好，参见：https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367）
// 我的答案（手动跳过 Function）：
// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K] extends Record<any, any> ?
//     T[K] extends Function ? T[K] : DeepReadonly<T[K]> : T[K]
// }

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/9/answer/zh-CN
  > 查看解答：https://tsch.js.org/9/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
