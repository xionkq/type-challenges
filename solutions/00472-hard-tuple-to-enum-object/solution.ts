/*
  472 - Tuple to Enum Object
  -------
  by Ryo Hanafusa (@softoika) #困难 #tuple #template-literal

  ### 题目

  枚举是 TypeScript 的一种原生语法（在 JavaScript 中不存在）。因此在 JavaScript 中枚举会被转成如下形式的代码：

  ```js
  let OperatingSystem
  ;(function (OperatingSystem) {
    OperatingSystem[(OperatingSystem['MacOS'] = 0)] = 'MacOS'
    OperatingSystem[(OperatingSystem['Windows'] = 1)] = 'Windows'
    OperatingSystem[(OperatingSystem['Linux'] = 2)] = 'Linux'
  })(OperatingSystem || (OperatingSystem = {}))
  ```

  在这个问题中，你实现的类型应当将给定的字符串元组转成一个行为类似枚举的对象。此外，枚举的属性一般是 `pascal-case` 的。

  ```ts
  Enum<['macOS', 'Windows', 'Linux']>
  // -> { readonly MacOS: "macOS", readonly Windows: "Windows", readonly Linux: "Linux" }
  ```

  如果传递了第二个泛型参数，且值为 `true`，那么返回值应当是一个 `number` 字面量。

  ```ts
  Enum<['macOS', 'Windows', 'Linux'], true>
  // -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }
  ```

  > 在 Github 上查看：https://tsch.js.org/472/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 分类讨论，当 N 为 false，属性值为枚举值本身
  2. 否则，新增泛型 L，用于记录已转换枚举数量，通过数组 L 的 length 属性获取枚举属性的值
  3. 另，需要手动实现合并对象属性的工具类型（联合类型操作符 & 不管用）
*/
type Merge<T, U> = {
  readonly [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
      ? T[K]
      : never
}

type Enum<T extends readonly any[], N extends boolean = false, L extends any[] = []> =
  T extends readonly [infer F, ...infer R] ?
    F extends string ?
      Merge<{ [K in Capitalize<F>]: N extends true ? L['length'] : F }, Enum<R, N, [...L, 'any']>>
      : never
    : {}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type A = Enum<typeof OperatingSystem>
let a: A

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<Equal<
    Enum<typeof OperatingSystem>,
    {
      readonly MacOS: 'macOS'
      readonly Windows: 'Windows'
      readonly Linux: 'Linux'
    }
  >>,
  Expect<Equal<
    Enum<typeof OperatingSystem, true>,
    {
      readonly MacOS: 0
      readonly Windows: 1
      readonly Linux: 2
    }
  >>,
  Expect<Equal<
    Enum<typeof Command>,
    {
      readonly Echo: 'echo'
      readonly Grep: 'grep'
      readonly Sed: 'sed'
      readonly Awk: 'awk'
      readonly Cut: 'cut'
      readonly Uniq: 'uniq'
      readonly Head: 'head'
      readonly Tail: 'tail'
      readonly Xargs: 'xargs'
      readonly Shift: 'shift'
    }
  >>,
  Expect<Equal<
    Enum<typeof Command, true>,
    {
      readonly Echo: 0
      readonly Grep: 1
      readonly Sed: 2
      readonly Awk: 3
      readonly Cut: 4
      readonly Uniq: 5
      readonly Head: 6
      readonly Tail: 7
      readonly Xargs: 8
      readonly Shift: 9
    }
  >>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/472/answer/zh-CN
  > 查看解答：https://tsch.js.org/472/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
