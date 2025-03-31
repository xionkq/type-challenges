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

const META_DATA = '' +
  '{\n' +
  '  "title": "name",\n' +
  '  "label": ["any"]\n' +
  '}\n'

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

function getInput(question: string) {
  return new Promise<string>((resolve) => {
    readline.question(question, (input: string) => {
      resolve(input)
    })
  })
}

async function getAllProblems(loop = 5) {
  try {
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
  } catch (e) {
    if (loop === 0) {
      throw `错误：${e}`
    }
    console.log('请求超时，重试中。剩余重试次数：' + loop)
    return getAllProblems(loop - 1)
  }
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
    // 确保输出的题目一定是不重复的
    if (!randomProblem || solved.includes(randomProblem)) {
      continue
    }
    const input = await getInput('是否生成题目' + randomProblem + '? (Y生成 N再来一次 E退出)：')
    if (input === InputEnum.NO) randomProblem = ''
    if (input === InputEnum.EXIT) return readline.close()
  }
  readline.close()
  const dirPath = path.join(__dirname, 'solutions', randomProblem)
  try {
    // 新建目录
    fs.mkdirSync(dirPath, { recursive: true })
    const fileAPath = path.join(dirPath, 'solution.ts')
    const fileBPath = path.join(dirPath, 'meta.json')
    fs.writeFileSync(fileAPath, '')
    fs.writeFileSync(fileBPath, META_DATA)

    console.log(`目录已成功创建: ${dirPath}`)
  } catch (err) {
    console.error(`创建目录时出错: ${err}`)
  }
  return randomProblem
}

generateRandomProblem()
