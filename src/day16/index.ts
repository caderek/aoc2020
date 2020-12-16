import { read, send, arr } from "../../utils/index"

const prepareInput = (rawInput: string) => {
  const [rawRules, rawMe, rawOthers] = rawInput.split("\n\n")

  const rules = Object.fromEntries(
    rawRules.split("\n").map((rule) => {
      const [key, ranges] = rule.split(": ")
      const r = ranges.match(/(\d+)/g).map(Number)

      return [key, [r.slice(0, 2), r.slice(2)]]
    }),
  )

  const me = rawMe.split("\n")[1].split(",").map(Number)

  const others = rawOthers
    .split("\n")
    .slice(1)
    .map((ticket) => ticket.split(",").map(Number))

  return { rules, me, others }
}

const goA = (rawInput: string) => {
  const { rules, others } = prepareInput(rawInput)
  const ranges = new Set(
    Object.values(rules)
      .flat()
      .map(([from, to]) => arr.range_(from, to + 1))
      .flat(),
  )

  let sum = 0

  others.forEach((ticket) =>
    ticket.forEach((num) => {
      if (!ranges.has(num)) {
        sum += num
      }
    }),
  )

  return sum
}

const goB = (rawInput: string) => {
  const { rules, others, me } = prepareInput(rawInput)
  const ranges = new Set(
    Object.values(rules)
      .flat()
      .map(([from, to]) => arr.range_(from, to + 1))
      .flat(),
  )

  const valid = others.filter(
    (ticket) => !ticket.some((num) => !ranges.has(num)),
  )

  const validCandidatesByField = Array.from(
    { length: valid[0].length },
    () => [],
  )

  for (let y = 0; y < valid.length; y++) {
    for (let x = 0; x < valid[0].length; x++) {
      validCandidatesByField[x][y] = valid[y][x]
    }
  }

  const rangesByField = Object.values(rules).map(
    (r) => new Set(r.map(([from, to]) => arr.range_(from, to + 1)).flat()),
  )

  const matching = Array.from({ length: rangesByField.length }, (_, i) => ({
    id: i,
    candidates: [],
  }))

  rangesByField.forEach((range, i) => {
    validCandidatesByField.forEach((candidate, j) => {
      if (candidate.every((x) => range.has(x))) {
        matching[i].candidates.push(j)
      }
    })
  })

  matching.sort((a, b) => a.candidates.length - b.candidates.length)

  const used = []

  const columnNumbersByFieldId = matching
    .map((x, i, arr) => {
      const result = x.candidates[0]
      used.push(result)
      if (arr[i + 1]) {
        arr[i + 1].candidates = arr[i + 1].candidates.filter(
          (x) => !used.includes(x),
        )
      }
      return { id: x.id, result }
    })
    .sort((a, b) => a.id - b.id)
    .map(({ result }) => result)

  const rulesNames = Object.keys(rules)

  const departureIndexes = arr
    .zip_(columnNumbersByFieldId, rulesNames)
    .filter(([name]) => name.startsWith("departure"))
    .map(([_, id]) => id)

  return departureIndexes.map((i) => me[i]).reduce((a, b) => a * b)
}

const main = async () => {
  /* Results */

  const input = read()

  console.time("Time")
  const resultA = await goA(input)
  const resultB = await goB(input)
  console.timeEnd("Time")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)

  // send(1, resultA)
  // send(2, resultB)
}

main()
