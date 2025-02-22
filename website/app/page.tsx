import { getAllSolutionMeta } from '@/lib/solutions'
import { TableWithTabs } from '@/app/(comp)/table'

export default function Home() {
  const solutionsList = getAllSolutionMeta()
  return (
    <>
      <header className="h-80 bg-gradient-to-r from-teal-400 to-blue-500 flex justify-center items-center text-6xl font-bold text-white">
        Problems ({solutionsList.length})
      </header>
      <main className="max-w-7xl mx-auto my-10">
        <TableWithTabs solutions={solutionsList}></TableWithTabs>
      </main>
    </>
  )
}
