import { read, send, test } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((x) =>
    x.startsWith("mask")
      ? x.match(/^mask \= (.*)/)[1]
      : x
          .match(/mem\[(\d+)\] \= (\d+)/)
          .slice(1)
          .map(Number),
  )

const toSingeBits = (
  val: number,
  size: number,
  mapFn: (val: string, index: number) => any = Number,
) => Array.from(val.toString(2).padStart(size, "0"), mapFn)

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const memory: Map<number, number> = new Map()

  let maskAND = []
  let maskOR = []

  input.forEach((item) => {
    const mapFn = (v: string, i: number) => (Number(v) | maskOR[i]) & maskAND[i]

    if (typeof item === "string") {
      const mask = item as string
      maskAND = mask.replace(/X/g, "1").split("").map(Number)
      maskOR = mask.replace(/X/g, "0").split("").map(Number)
    } else {
      const [address, value] = item as [number, number]
      const val = toSingeBits(value, 36, mapFn).join("")

      memory.set(address, parseInt(val, 2))
    }
  })

  return [...memory.values()].reduce((a, b) => a + b)
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const memory: Map<number, number> = new Map()

  let maskOR = []
  let floats = []

  input.forEach((item) => {
    if (typeof item === "string") {
      maskOR = item.replace(/X/g, "0").split("").map(Number)
      floats = Array.from(item.matchAll(/X/g), (x) => x.index)
    } else {
      const [address, value] = item as [number, number]
      const addr = toSingeBits(address, 36, (v, i) => Number(v) | maskOR[i])
      const combinationsSize = 2 ** floats.length

      for (let i = 0; i < combinationsSize; i++) {
        toSingeBits(i, floats.length, (v, i) => (addr[floats[i]] = Number(v)))

        memory.set(parseInt(addr.join(""), 2), value)
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
  const resultA = goA(input)
  const resultB = goB(input)
  console.timeEnd("Time")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)

  // send(1, resultA) // -> 9879607673316
  // send(2, resultB) // -> 3435342392262
}

main()
