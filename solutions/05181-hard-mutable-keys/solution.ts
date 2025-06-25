/*
  5181 - Mutable Keys
  -------
  by Yugang Cao (@Talljack) #hard #utils

  ### Question

  Implement the advanced util type MutableKeys<T>, which picks all the mutable (not readonly) keys into a union.

  For example:

  ```ts
  type Keys = MutableKeys<{ readonly foo: string; bar: number }>;
  // expected to be “bar”
  ```

  > View on GitHub: https://tsch.js.org/5181
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. readonly 的对象可以和非 readonly 的对象相互继承，因此无法通过类似 require 键的方式去解决它
  2. 若想判断两个类型是否完全相同，可以使用一种特殊的复杂类型实现它，这个复杂类型并没有意义
  3. 仅仅是因为足够复杂，编译器会判断他们有差异的地方是否相同，间接判断了 x 和 y 是否相同
  4. https://stackoverflow.com/questions/75699574/generic-arrow-functions-in-conditional-types/75699960#75699960
*/
type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type MutableKeys<T> = keyof {
  [K in keyof T as MyEqual<Readonly<Pick<T, K>>, Pick<T, K>> extends true ? never : K]: any
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = (a: { 'a': any }) => any extends { readonly 'a': any } ? true : false
let a: A

type cases = [
  Expect<Equal<MutableKeys<{ a: number, readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined, readonly b: undefined }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined, readonly b?: undefined, c: string, d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<MutableKeys<{}>, never>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5181/answer
  > View solutions: https://tsch.js.org/5181/solutions
  > More Challenges: https://tsch.js.org
*/
