export enum Difficulty {
  ALL = 'all',
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface SolutionMetaData {
  id: number
  title: string
  slug: string
  difficulty: Difficulty
  label: string[]
}

export interface LabelData {
  name: string
  count: number
}
