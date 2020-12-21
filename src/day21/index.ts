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

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((food) => {
    const products = food.split("(")[0].trim().split(" ")
    const allergens = food
      .match(/\(.+\)/)[0]
      .replace("(contains ", "")
      .replace(")", "")
      .split(", ")

    return { products, allergens }
  })

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  console.log(input)

  return 1
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return
}

const main = async () => {
  /* Tests */

  test(
    goA(`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`),
    5,
  )

  // test(goB(""), )

  /* Results */

  const input = read()

  console.time("Time")
  // const resultA = await goA(input)
  const resultB = await goB(input)
  console.timeEnd("Time")

  // console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)

  // send(1, resultA)
  // send(2, resultB)
}

main()
