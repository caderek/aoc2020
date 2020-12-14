import { read, send, test } from "../../utils/index"

const mod = (a: number, b: number) => {
  const x = a % b
  return x < 0 ? x + b : x
}

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((x) =>
    x.startsWith("mask")
      ? x.match(/^mask \= (.*)/)[1]
      : x
          .match(/mem\[(\d+)\] \= (\d+)/)
          .slice(1)
          .map((x) => Number(x)),
  )

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const size = 2 ** 36

  const memory: Map<number, number> = new Map()

  let mask0 = []
  let mask1 = []

  input.forEach((item) => {
    if (!Array.isArray(item)) {
      const mask = item as string
      mask0 = mask.replace(/X/g, "1").split("").map(Number)
      mask1 = mask.replace(/X/g, "0").split("").map(Number)
    } else {
      const [address, value] = item as [number, number]
      const val = mod(value, size)
        .toString(2)
        .padStart(36, "0")
        .split("")
        .map(Number)
      const result = val.map((v, i) => (v | mask1[i]) & mask0[i]).join("")

      memory.set(mod(address, size), parseInt(result, 2))
    }
  })

  return [...memory.values()].reduce((a, b) => a + b)
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const size = 2 ** 36

  const memory: Map<number, number> = new Map()

  let mask = []
  let floats = []

  input.forEach((item) => {
    if (!Array.isArray(item)) {
      mask = item.replace(/X/g, "0").split("").map(Number)
      floats = [...item.matchAll(/X/g)].map((x) => x.index)
    } else {
      const [address, value] = item as [number, number]
      const addr = mod(address, size)
        .toString(2)
        .padStart(36, "0")
        .split("")
        .map(Number)

      const result = addr.map((v, i) => v | mask[i])

      for (let i = 0; i < 2 ** floats.length; i++) {
        i.toString(2)
          .padStart(floats.length, "0")
          .split("")
          .forEach((v, i) => {
            result[floats[i]] = Number(v)
          })

        const addressN = parseInt(result.join(""), 2)
        memory.set(mod(addressN, size), mod(value, size))
      }
    }
  })

  return [...memory.values()].reduce((a, b) => a + b)
}

const main = async () => {
  /* Tests */

  test(
    goA(
      `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
  mem[8] = 11
  mem[7] = 101
  mem[8] = 0`.trim(),
    ),
    165,
  )

  test(
    goB(
      `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`.trim(),
    ),
    208,
  )

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
