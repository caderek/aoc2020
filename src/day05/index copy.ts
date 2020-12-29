import { test, read } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.replace(/[FL]/g, "0").replace(/[BR]/g, "1").split("\n")

const getIds = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return input.map((moves) => parseInt(moves, 2))
}

const part1 = (rawInput: string) => {
  const ids = getIds(rawInput)

  return Math.max(...ids)
}

const part2 = (rawInput: string) => {
  const ids = getIds(rawInput).sort((a, b) => a - b)

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] + 1 !== ids[i + 1]) {
      return ids[i] + 1
    }
  }
}

const input = read()

console.log("^") // <-- START THE TIMER
const resultA = part1(input)
const resultB = part2(input)
console.log("$") // <-- STOP THE TIMER

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
