import { test, readInput } from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split("\n\n")

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return input
    .map((x) => new Set([...x.replace(/[\s\n]/g, "")]).size)
    .reduce((a, b) => a + b)
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return input
    .map((rawGroup) => {
      const letters = Array.from(new Set([...rawGroup.replace(/\n/g, "")]))
      const group = rawGroup.split("\n")

      return letters.reduce(
        (all, l) => all + (group.every((ans) => ans.includes(l)) ? 1 : 0),
        0,
      )
    })
    .reduce((a, b) => a + b)
}

const main = async () => {
  /* Tests */

  test(
    goA(
      `
abc

a
b
c

ab
ac

a
a
a
a

b  
  `.trim(),
    ),
    11,
  )

  test(
    goB(
      `
abc

a
b
c

ab
ac

a
a
a
a

b
  `.trim(),
    ),
    6,
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
