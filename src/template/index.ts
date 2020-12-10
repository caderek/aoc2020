import {
  read,
  send,
  test,
  arr,
  com,
  mul,
  dis,
  math,
  R,
  graph,
  log,
  equal,
  gen,
} from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return
}

const main = async () => {
  /* Tests */

  // test(goA(""), )

  // test(goB(""), )

  /* Results */

  const input = read()

  console.time("Time")
  const resultA = await goA(input)
  const resultB = await goB(input)
  console.timeEnd("Time")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)

  // send(1, resultA)
  // send(2, resultB)
}

main()
