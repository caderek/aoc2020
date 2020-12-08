import { contains } from "ramda"
import { test, readInput } from "../../utils/index"
import compute from "./computer"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const opcode = line.split(" ")[0]
    const val = Number(line.split(" ")[1])

    return [opcode, val]
  })

const goA = (rawInput: string) => {
  const program = prepareInput(rawInput) as [string, number][]
  return compute(program).acc
}

const goB = (rawInput: string) => {
  const program = prepareInput(rawInput) as [string, number][]

  for (let i = 0; i < program.length; i++) {
    const copy = JSON.parse(JSON.stringify(program))

    if (copy[i][0] === "acc") {
      continue
    } else if (copy[i][0] === "nop") {
      copy[i][0] = "jmp"
    } else {
      copy[i][0] = "nop"
    }

    const result = compute(copy)

    if (result.info === "exit") {
      return result.acc
    }
  }
}

const main = async () => {
  /* Tests */

  test(
    goA(
      `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
  `.trim(),
    ),
    5,
  )

  test(
    goB(
      `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
  `.trim(),
    ),
    8,
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
