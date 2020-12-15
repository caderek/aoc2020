import { read, send, test } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((x) =>
    x.startsWith("mask")
      ? x.match(/^mask \= (.*)/)[1]
      : x
          .match(/mem\[(\d+)\] \= (\d+)/)
          .slice(1)
          .map(BigInt),
  )

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const memory: Map<bigint, bigint> = new Map()

  let maskAND = 0n
  let maskOR = 0n

  input.forEach((item) => {
    if (typeof item === "string") {
      maskAND = BigInt(parseInt(item.replace(/X/g, "1"), 2))
      maskOR = BigInt(parseInt(item.replace(/X/g, "0"), 2))
    } else {
      const [address, value] = item
      const val = (value | maskOR) & maskAND

      memory.set(address, val)
    }
  })

  return Number([...memory.values()].reduce((a, b) => a + b))
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const memory: Map<bigint, bigint> = new Map()

  let maskOR = 0n
  let floatsPos = []

  input.forEach((item) => {
    if (typeof item === "string") {
      maskOR = BigInt(parseInt(item.replace(/X/g, "0"), 2))
      floatsPos = Array.from(item.matchAll(/X/g), (x) => BigInt(x.index))
    } else {
      const [address, value] = item
      const addr = address | maskOR
      const combinationsSize = 2 ** floatsPos.length

      for (let i = 0n; i < combinationsSize; i++) {
        let mask = 0n

        floatsPos.forEach((pos, index) => {
          const pow = BigInt(index)
          const isOn = (i & (2n ** pow)) !== 0n

          if (isOn) {
            mask |= 1n << (36n - pos - 1n)
          }
        })

        memory.set(addr ^ mask, value)
      }
    }
  })

  return Number([...memory.values()].reduce((a, b) => a + b))
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
