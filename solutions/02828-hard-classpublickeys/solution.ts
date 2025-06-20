/*
  2828 - ClassPublicKeys
  -------
  by jiangshan (@jiangshanmeta) #hard #utils

  ### Question

  Implement the generic `ClassPublicKeys<T>` which returns all public keys of a class.

  For example:

  ```ts
  class A {
    public str: string
    protected num: number
    private bool: boolean
    getNum() {
      return Math.random()
    }
  }

  type publicKeys = ClassPublicKeys<A> // 'str' | 'getNum'
  ```

  > View on GitHub: https://tsch.js.org/2828
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 啊这，我还在想应该如何定义这个泛型
  2. 泛型为 class 时，似乎就是个普通对象？通过 keyof 取出 public 键
*/
type ClassPublicKeys<T extends object> = keyof T

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

class A {
  public str: string
  protected num: number
  private bool: boolean
  constructor() {
    this.str = 'naive'
    this.num = 19260917
    this.bool = true
  }

  getNum() {
    return Math.random()
  }
}

type cases = [
  Expect<Equal<ClassPublicKeys<A>, 'str' | 'getNum'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2828/answer
  > View solutions: https://tsch.js.org/2828/solutions
  > More Challenges: https://tsch.js.org
*/
