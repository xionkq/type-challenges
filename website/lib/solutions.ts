import path from 'node:path'
import fs from 'fs'
import { SolutionMetaData } from '@/lib/type'

export function getSolutionDirNames() {
  const postsDirectory = path.join(process.cwd(), '../solutions')
  return fs.readdirSync(postsDirectory)
}

export function getAllSolutionMeta(): SolutionMetaData[] {
  const dirNames = getSolutionDirNames()
  return dirNames.map((dirName) => {
    const dir = path.join(process.cwd(), `../solutions/${dirName}/meta.json`)
    const [id, difficulty, ...others] = dirName.split('-')
    return {
      ...JSON.parse(fs.readFileSync(dir, 'utf8')),
      id: Number(id),
      slug: dirName,
      difficulty
    }
  })
}
