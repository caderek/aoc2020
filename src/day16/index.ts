import { read, send, test, arr } from "../../utils/index"

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

const rowsToCols = (arr: number[][]) => {
  const flipped = Array.from(
    { length: arr[0].length },
    () => new Array(arr.length),
  )

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[0].length; x++) {
      flipped[x][y] = arr[y][x]
    }
  }

  return flipped
}

const setFromRanges = (ranges: number[][]) => {
  const set = new Set()

  ranges.forEach(([from, to]) =>
    arr.range_(from, to + 1).forEach((x) => set.add(x)),
  )

  return set
}

const goA = (rawInput: string) => {
  const { rules, others } = prepareInput(rawInput)
  const ranges = new Set()

  Object.values(rules)
    .flat()
    .map(([from, to]) => arr.range_(from, to + 1).forEach((x) => ranges.add(x)))

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

  const allowedByField = Object.values(rules).map(setFromRanges)
  const allowed = setFromRanges(Object.values(rules).flat())
  const valid = others.filter((nums) => nums.every((num) => allowed.has(num)))
  const validByColumn = rowsToCols(valid)

  const matching = Array.from({ length: allowedByField.length }, (_, i) => ({
    id: i,
    candidates: [],
  }))

  allowedByField.forEach((range, i) => {
    validByColumn.forEach((candidate, j) => {
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

  return arr
    .zip_(columnNumbersByFieldId, Object.keys(rules))
    .filter(([name]) => name.startsWith("departure"))
    .map(([_, id]) => me[id])
    .reduce((a, b) => a * b)
}

const main = async () => {
  /* Tests */

  test(
    goA(`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`),
    71,
  )

  test(
    goB(`class: 0-1 or 4-19
departure row: 0-5 or 8-19
departure seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`),
    11 * 13,
  )

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
