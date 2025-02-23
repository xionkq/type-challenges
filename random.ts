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
  const problemList = content.payload.tree.items.map(item => item.name)
  const randomIndex = Math.floor(Math.random() * problemList.length)
  console.log(problemList[randomIndex])
  return problemList[randomIndex]
}

getAllProblems()
