/*
  9775 - Capitalize Nest Object Keys
  -------
  by MayanDev (@Mayandev) #hard #object #array

  ### Question

  Capitalize the key of the object, and if the value is an array, iterate through the objects in the array.

  > View on GitHub: https://tsch.js.org/9775
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 震惊！通过对象类型语法 { [K in 0 | 1]: 1 } 可以构造数组？？
  2. 其实：当映射类型作用于数组时，会自动保留数组的结构，因而结果也是数组
*/
type CapitalizeNestObject<T> = {
  [K in keyof T as K extends string ? Capitalize<K> : K]: CapitalizeNestObjectKeys<T[K]>
}

type CapitalizeNestArray<T> = {
  [K in keyof T]: CapitalizeNestObjectKeys<T[K]>
}

type CapitalizeNestObjectKeys<T> = T extends any[]
  ? CapitalizeNestArray<T>
  : T extends object
    ? CapitalizeNestObject<T>
    : T

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = { [K in 0 | 1]: 1 }
type B = A extends any[] ? true : false
let a: B

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9775/answer
  > View solutions: https://tsch.js.org/9775/solutions
  > More Challenges: https://tsch.js.org
*/
