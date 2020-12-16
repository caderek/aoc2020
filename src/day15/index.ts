import { read, test, send } from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split(",").map(Number)

const go = (rawInput: string, maxTurn: number) => {
  const input = prepareInput(rawInput)
  const previous = input.slice(0, -1)

  let last = input[input.length - 1]
  let turn = previous.length + 1

  const turnsPerNum: Map<number, number> = new Map(
    previous.map((x, i) => [x, i + 1]),
  )

  while (turn < maxTurn) {
    const val = turnsPerNum.get(last)

    turnsPerNum.set(last, turn)
    last = val === undefined ? 0 : turn - val
    turn++
  }

  return last
}

const main = async () => {
  /* Results */

  test(go("0,3,6", 2020), 436)

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
