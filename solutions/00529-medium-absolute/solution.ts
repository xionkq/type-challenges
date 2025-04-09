/*
  529 - Absolute
  -------
  by Andrey Krasovsky (@bre30kra69cs) #中等 #math #template-literal

  ### 题目

  实现一个接收string,number或bigInt类型参数的`Absolute`类型,返回一个正数字符串。

  例如

  ```ts
  type Test = -100;
  type Result = Absolute<Test>; // expected to be "100"
  ```

  > 在 Github 上查看：https://tsch.js.org/529/zh-CN
*/

/* _____________ 你的代码 _____________ */
/*
笔记:
  1. 原本想到的是，先将泛型转为字符串，然后将字符串中所有非数字剔除
  2. 试了下发现直接 `${F}` 就可以直接将 bigint 类型转为普通数字的 string 类型...
  3. 通过模板字符串将数组转换为字符串时，ts 会自动进行转换
*/
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer F}` ? `${F}` : `${T}`

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/529/answer/zh-CN
  > 查看解答：https://tsch.js.org/529/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
