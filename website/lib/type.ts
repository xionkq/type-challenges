export enum Difficulty {
  ALL = 'all',
  WARM = 'warm',
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXTREME = 'extreme',
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
