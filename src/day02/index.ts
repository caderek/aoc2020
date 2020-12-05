import { test, readInput } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((item) => {
    const [range, letter, password] = item.split(" ")
    const [min, max] = range.split("-").map(Number)
    return { min, max, letter: letter[0], password }
  })

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return input.reduce((counter, item) => {
    // @ts-ignore
    const count = [...item.password.matchAll(item.letter)].length
    return count >= item.min && count <= item.max ? counter + 1 : counter
  }, 0)
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return input.reduce(
    (counter, item) =>
      Number(item.password[item.min - 1] === item.letter) ^
      Number(item.password[item.max - 1] === item.letter)
        ? counter + 1
        : counter,
    0,
  )
}

const main = async () => {
  /* Tests */

  test(
    goA(`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`),
    2,
  )
  test(
    goB(`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`),
    1,
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
