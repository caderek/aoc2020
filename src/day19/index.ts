import logUpdate = require("log-update")
import {
  read,
  send,
  test,
  arr,
  com,
  mul,
  dis,
  math,
  R,
  graph,
  log,
  equal,
  gen,
} from "../../utils/index"

// const prepareInput = (rawInput: string) => {
//   const [rawRules, rawCodes] = rawInput.split("\n\n")
//   const rules = rawRules.split("\n").map((rawRule) => {
//     const [num, rawLinks] = rawRule.split(": ")
//     const links =
//       rawLinks === '"a"'
//         ? "a"
//         : rawLinks === '"b"'
//         ? "b"
//         : rawLinks.split(" | ").map((x) => x.split(" ").map(Number))
//     return [Number(num), links]
//   }) as [number, string | number[][]][]

//   const codes = rawCodes.split("\n").map((line) => line.split(""))

//   return { rules: new Map(rules.sort((a, b) => a[0] - b[0])), codes }
// }

const prepareInput = (rawInput: string) => {
  const [rawRules, rawCodes] = rawInput.split("\n\n")
  const rules = rawRules.split("\n").map((rawRule) => rawRule.split(": "))

  const codes = rawCodes.split("\n").map((line) => line.split(""))

  return { rules, codes }
}

const goA = (rawInput: string) => {
  const { rules, codes } = prepareInput(rawInput)
  console.log(rawInput)
  console.log(rules)

  const aIndex = rules.find((rule) => rule[1] === '"a"')[0]
  const bIndex = rules.find((rule) => rule[1] === '"b"')[0]
  console.log({ aIndex, bIndex })

  const x = rules.map(([id, rule]) => [
    id,
    rule
      .replace(new RegExp(aIndex, "g"), "a")
      .replace(new RegExp(bIndex, "g"), "b"),
  ])

  console.log(x)

  return 1
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return
}

const main = async () => {
  /* Tests */

  test(
    goA(`0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`),
    2,
  )

  // test(goB(""), )

  /* Results */

  const input = read()

  console.time("Time")
  // const resultA = await goA(input)
  // const resultB = await goB(input)
  console.timeEnd("Time")

  // console.log("Solution to part 1:", resultA)
  // console.log("Solution to part 2:", resultB)

  // send(1, resultA)
  // send(2, resultB)
}

main()
