/*
  2949 - ObjectFromEntries
  -------
  by jiangshan (@jiangshanmeta) #hard #object

  ### Question

  Implement the type version of ```Object.fromEntries```

  For example:

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }

  type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

  type result = ObjectFromEntries<ModelEntries> // expected to be Model
  ```

  > View on GitHub: https://tsch.js.org/2949
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 使用条件类型遍历联合类型参数，讲 T 转为单个 Key 的对象类型的联合
  2. 讲 Key 对象的联合类型，转为 Key 对象的交叉类型
  3. 巧用 Omit 合并
*/
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

type UnionObjectFromEntries<T, C extends T = T> = C extends T ? C extends [infer F extends string, infer R] ? { [K in F]: R } : never : never

type ObjectFromEntries<T> = Omit<UnionToIntersection<UnionObjectFromEntries<T>>, never>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type A = ObjectFromEntries<ModelEntries>
let a: A

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2949/answer
  > View solutions: https://tsch.js.org/2949/solutions
  > More Challenges: https://tsch.js.org
*/
