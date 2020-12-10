import { test, read } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.replace(/[FL]/g, "0").replace(/[BR]/g, "1").split("\n")

const getIds = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return input.map((moves) => parseInt(moves, 2))
}

const goA = (rawInput: string) => {
  const ids = getIds(rawInput)

  return Math.max(...ids)
}

const goB = (rawInput: string) => {
  const ids = getIds(rawInput).sort((a, b) => a - b)

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] + 1 !== ids[i + 1]) {
      return ids[i] + 1
    }
  }
}

const main = async () => {
  /* Tests */

  test(goA("FBFBBFFRLR"), 357)
  test(goA("BFFFBBFRRR"), 567)
  test(goA("FFFBBBFRRR"), 119)
  test(goA("BBFFBBFRLL"), 820)

  /* Results */

  const input = read()

  console.time("Time")
  const resultA = await goA(input)
  const resultB = await goB(input)
  console.timeEnd("Time")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)
}

main()
