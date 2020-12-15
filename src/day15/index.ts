import { read, send } from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split(",").map(Number)

const go = (rawInput: string, maxTurn: number) => {
  const input = prepareInput(rawInput)
  let turn = input.length
  let last = input[input.length - 1]

  const turnsPerNum: Map<number, number[]> = new Map()

  input.forEach((num, index) => turnsPerNum.set(num, [index + 1]))

  const speak = (num: number) => {
    last = num
    if (turnsPerNum.has(num)) {
      const val = turnsPerNum.get(num)
      turnsPerNum.set(num, val.slice(-1).concat(turn))
    } else {
      turnsPerNum.set(num, [turn])
    }
  }

  while (turn < maxTurn) {
    turn++

    if (turnsPerNum.get(last).length === 1) {
      speak(0)
    } else {
      const val = turnsPerNum.get(last)
      speak(val[1] - val[0])
    }
  }

  return last
}

const main = async () => {
  /* Results */

  const input = read()

  console.time("Time")
  const resultA = await go(input, 2020)
  const resultB = await go(input, 30000000)
  console.timeEnd("Time")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)

  // send(1, resultA)
  // send(2, resultB)
}

main()
