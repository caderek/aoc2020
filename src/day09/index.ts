import { test, read } from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split("\n").map(Number)

const comb = (arr, target) => {
  for (const a of arr) {
    for (const b of arr) {
      if (a !== b && a + b === target) {
        return true
      }
    }
  }
  return false
}

const goA = (rawInput: string, preamble: number) => {
  const input = prepareInput(rawInput)

  for (let i = preamble; i < input.length; i++) {
    if (!comb(input.slice(i - preamble, i), input[i])) {
      return input[i]
    }
  }
}

const goB = (rawInput: string, preamble: number) => {
  const input = prepareInput(rawInput)

  const a = goA(rawInput, preamble)

  for (let i = 0; i < input.length; i++) {
    let sum = input[i]
    const v = [input[i]]
    for (let j = i + 1; j < input.length; j++) {
      sum += input[j]
      v.push(input[j])

      if (sum > a) {
        break
      } else if (sum === a) {
        return Math.min(...v) + Math.max(...v)
      }
    }
  }
}

const main = async () => {
  /* Tests */

  test(
    goA(
      `
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`.trim(),
      5,
    ),
    127,
  )

  test(
    goB(
      `
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`.trim(),
      5,
    ),
    62,
  )

  /* Results */

  const input = read()

  console.log("^")
  const resultA = await goA(input, 25)
  const resultB = await goB(input, 25)
  console.log("$")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)
}

main()
