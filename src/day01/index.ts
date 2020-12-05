import { test, readInput, gen } from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split("\n").map(Number)

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)

  for (const [a, b] of gen.combination(input, 2)) {
    if (a + b === 2020) {
      return a * b
    }
  }
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  for (const [a, b, c] of gen.combination(input, 3)) {
    if (a + b + c === 2020) {
      return a * b * c
    }
  }
}

const main = async () => {
  /* Tests */

  test(
    goA(`1721
979
366
299
675
1456`),
    514579,
  )

  test(
    goB(`1721
979
366
299
675
1456`),
    241861950,
  )

  /* Results */

  const input = readInput()

  console.time("Time")
  const resultA = await goA(input)
  const resultB = await goB(input)
  console.timeEnd("Time")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)
}

main()
