import { LabelData, SolutionMetaData } from '@/lib/type'

export function getLabelsBySolution(solutions: SolutionMetaData[]): LabelData[] {
  const labelMap = new Map<string, number>()
  const labels = new Array<LabelData>()
  solutions.forEach((solution) => {
    const sl = solution.label
    sl.forEach((l) => {
      labelMap.set(l, (labelMap.get(l) || 0) + 1)
    })
  })

  Array.from(labelMap.keys()).forEach((k) => {
    labels.push({
      name: k,
      count: labelMap.get(k)!,
    })
  })

  return labels.sort((a, b) => b.count - a.count)
}
