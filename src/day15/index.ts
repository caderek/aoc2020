import { read, test, send } from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split(",").map(Number)

const go = (rawInput: string, maxTurn: number) => {
  const input = prepareInput(rawInput)

  let last = input[input.length - 1]
  let turn = input.length

  const turnsPerNum = new Uint32Array(maxTurn)
  input.slice(0, -1).forEach((x, i) => (turnsPerNum[x] = i + 1))

  while (turn < maxTurn) {
    const val = turnsPerNum[last]

    turnsPerNum[last] = turn
    last = val ? turn - val : 0
    turn++
  }

  return last
}

const main = async () => {
  /* Tests */

  test(go("0,3,6", 2020), 436)
  test(go("1,3,2", 2020), 1)

  /* Results */

  const input = read()

  console.log("^")
  const resultA = go(input, 2020)
  const resultB = go(input, 30000000)
  console.log("$")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)

  // send(1, resultA)
  // send(2, resultB)
}

main()
