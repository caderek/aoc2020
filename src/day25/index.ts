import { read, send, test } from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split("\n").map(Number)

const go = (rawInput: string) => {
  const [pubDoor, pubCard] = prepareInput(rawInput)
  let val = 1
  let subjectNumber = 7
  const divider = 20201227
  let loopSize = 0
  let i = 0

  while (true) {
    i++
    val = val * subjectNumber
    val = val % divider

    if (val === pubCard) {
      loopSize = i
      break
    }
  }

  val = 1
  subjectNumber = pubDoor

  while (loopSize--) {
    val = val * subjectNumber
    val = val % divider
  }

  return val
}

const main = async () => {
  /* Tests */

  test(go("5764801\n17807724"), 14897079)

  /* Results */

  const input = read()

  console.time("Time")
  const result = await go(input)
  console.timeEnd("Time")

  console.log("Solution:", result)

  // send(1, result)
}

main()
