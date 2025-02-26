const path = require('node:path')
const fs = require('fs')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

enum InputEnum {
  YES = 'Y',
  NO = 'N',
  EXIT = 'E',
}

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

function getInput(prompt: string) {
  return new Promise<string>((resolve) => {
    readline.question(prompt, (input: string) => {
      resolve(input)
    })
  })
}

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
    const input = await getInput('是否生成题目' + randomProblem + '? (Y生成 N再来一次 E退出)：')
    if (input === InputEnum.NO) randomProblem = ''
    if (input === InputEnum.EXIT) return
  }

  const dirPath = path.join(__dirname, 'solutions', randomProblem)
  try {
    // 新建目录
    fs.mkdirSync(dirPath, { recursive: true })
    const fileAPath = path.join(dirPath, 'solution.ts')
    const fileBPath = path.join(dirPath, 'meta.json')
    fs.writeFileSync(fileAPath, '')
    fs.writeFileSync(fileBPath, '')

    console.log(`目录已成功创建: ${dirPath}`)
  } catch (err) {
    console.error(`创建目录时出错: ${err}`)
  }
  console.log(randomProblem)
  return randomProblem
}

generateRandomProblem()
