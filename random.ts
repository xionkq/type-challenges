const path = require('node:path')
const fs = require('fs')

type TypeChallengesContent = {
  payload: {
    tree: {
      items: {
        contentType: string
        name: string
        path: string
      }[]
    }
  }
}

const TYPE_CHALLENGES_QUESTION_URL = 'https://github.com/type-challenges/type-challenges/tree/main/questions?noancestors=1'

async function getAllProblems() {
  const response = await fetch(TYPE_CHALLENGES_QUESTION_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  const blob = await response.blob()
  const content = JSON.parse(await blob.text()) as TypeChallengesContent
  return content.payload.tree.items.map(item => item.name)
}

function getAllSolvedProblems() {
  const solvedProblemsDir = path.join(process.cwd(), './solutions')
  return fs.readdirSync(solvedProblemsDir)
}

async function generateRandomProblem() {
  const all = await getAllProblems()
  const solved = getAllSolvedProblems()
  let randomProblem = ''

  while (!randomProblem || solved.includes(randomProblem)) {
    const randomIndex = Math.floor(Math.random() * all.length)
    randomProblem = all[randomIndex]
  }
  console.log(randomProblem)
  return randomProblem
}

generateRandomProblem()
