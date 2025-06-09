/*
  847 - String Join
  -------
  by Matt Davis (@tl-matt-davis) #hard

  ### Question

  Create a type-safe string join utility which can be used like so:

  ```ts
  const hyphenJoiner = join('-')
  const result = hyphenJoiner('a', 'b', 'c'); // = 'a-b-c'
  ```

  Or alternatively:
  ```ts
  join('#')('a', 'b', 'c') // = 'a#b#c'
  ```

  When we pass an empty delimiter (i.e '') to join, we should concat the strings as they are, i.e:
  ```ts
  join('')('a', 'b', 'c') // = 'abc'
  ```

  When only one item is passed, we should get back the original item (without any delimiter added):
  ```ts
  join('-')('a') // = 'a'
  ```

  > View on GitHub: https://tsch.js.org/847
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 主要问题在于我拿不到参数的文字类型，只能拿到更宽泛的类型 string
  2. 通过声明参数类型为 readonly any[]，而不是 any[] 可以解决上述问题（编辑：与 readonly 无关，而是需要将 any[] 改为约束更紧的 string[]）
  3. 当返回值是一个带泛型的函数类型时，请将其泛型声明到返回值函数上，而不是本体函数上
*/
type Join<D extends string, P, IsF = false> = P extends [infer F extends string, ...infer R]
  ? IsF extends true
    ? `${F}${Join<D, R>}`
    : `${D}${F}${Join<D, R>}`
  : ''

declare function join<D extends string>(delimiter: D): <P extends string[]>(...parts: P) => Join<D, P, true>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

// Edge cases
const noCharsOutput = join('-')()
const oneCharOutput = join('-')('a')
const noDelimiterOutput = join('')('a', 'b', 'c')

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c')
const hashOutput = join('#')('a', 'b', 'c')
const twoCharOutput = join('-')('a', 'b')
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')

type cases = [
  Expect<Equal<typeof noCharsOutput, ''>>,
  Expect<Equal<typeof oneCharOutput, 'a'>>,
  Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
  Expect<Equal<typeof twoCharOutput, 'a-b'>>,
  Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
  Expect<Equal<typeof hashOutput, 'a#b#c'>>,
  Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/847/answer
  > View solutions: https://tsch.js.org/847/solutions
  > More Challenges: https://tsch.js.org
*/
