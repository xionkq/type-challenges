/*
  8640 - Number Range
  -------
  by AaronGuo (@HongxuanG) #medium

  ### Question

  Sometimes we want to limit the range of numbers...
  For examples.
  ```ts
  type result = NumberRange<2 , 9> //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  ```

  > View on GitHub: https://tsch.js.org/8640
*/

/* _____________ Your Code Here _____________ */
/*
笔记:
  1. 所谓尾递归就是递归的最后一步是调用自身，ts 处理尾递归时有优化，因此可以支持更深的深度
  2. NumberUnion1 是尾递归，而 NumberUnion2 不是尾递归，因此 NumberUnion2 最多执行50次，而 NumberUnion1 支持 140 次
*/
type NumberUnion1<N extends number, Arr extends any[] = [], Res = N> = Arr['length'] extends N ? Res : NumberUnion1<N, [...Arr, any], Res | Arr['length']>
type NumberUnion2<N extends number, Arr extends any[] = []> = Arr['length'] extends N ? N : Arr['length'] | NumberUnion2<N, [...Arr, any]>

type NumberRange<L extends number, H extends number> = L | Exclude<NumberUnion1<H>, NumberUnion1<L>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type A = NumberRange<0, 140>


type Result1 = | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Result2 = | 0 | 1 | 2
type Result3 =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
  | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60
  | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70
  | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80
  | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90
  | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100
  | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110
  | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120
  | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130
  | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140
type cases = [
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8640/answer
  > View solutions: https://tsch.js.org/8640/solutions
  > More Challenges: https://tsch.js.org
*/
