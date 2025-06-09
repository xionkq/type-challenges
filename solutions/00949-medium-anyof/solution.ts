/*
  949 - AnyOf
  -------
  by null (@kynefuk) #中等 #array

  ### 题目

  在类型系统中实现类似于 Python 中 `any` 函数。类型接收一个数组，如果数组中任一个元素为真，则返回 `true`，否则返回 `false`。如果数组为空，返回 `false`。

  例如：

  ```ts
  type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
  ```

  > 在 Github 上查看：https://tsch.js.org/949/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. never 是 ts 中一个底层类型，没有任何值的类型是 never，因此它类似于一个空集
  2. type Test = 1 extends {} ? true : false // 结果为 true，令人震惊
     i. 这是因为 {} 并不代表空对象，它代表一个宽泛类型，接受所有非 null 和 undefined 的类型
     ii. number 可以赋值给 {}，因为 number 可以自动装箱转换为对应的包装对象 Number
  3. 使用 Record<string, never> 定义一个空对象类型，它代表键为 string，而值为 never 的对象，但没有任何值的类型是 never，因此代表一个空对象
*/
type Invalid = 0 | '' | [] | Record<string, never> | false | undefined | null
type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R] ? (F extends Invalid ? AnyOf<R> : true) : false

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
  Expect<Equal<AnyOf<[0, 0]>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/949/answer/zh-CN
  > 查看解答：https://tsch.js.org/949/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
