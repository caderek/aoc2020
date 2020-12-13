import { read, send, test, crypto } from "../../utils/index"

const prepareInput = (rawInput: string) => {
  const [timestamp, schedule] = rawInput.split("\n")
  const buses = schedule
    .split(",")
    .map((val, i) => [val, i])
    .filter(([val]) => val !== "x")
    .map(([val, i]: [string, number]) => {
      const bus = BigInt(val)
      return [bus, i === 0 ? 0n : bus - (BigInt(i) % bus)]
    })

  return { timestamp: Number(timestamp), buses }
}

const goA = (rawInput: string) => {
  const { timestamp, buses } = prepareInput(rawInput)

  const [bus, earliest] = buses
    .map(([bus]) => {
      const b = Number(bus)
      return [b, Math.ceil(timestamp / b) * b]
    })
    .sort((a, b) => a[1] - b[1])[0]

  return (earliest - timestamp) * bus
}

const goB = (rawInput: string) => {
  const { buses } = prepareInput(rawInput)

  return String(crypto.crt(buses as [bigint, bigint][]))
}

const main = async () => {
  /* Tests */

  test(
    goA(`939
7,13,x,x,59,x,31,19`),
    295,
  )

  test(
    goB(`939
7,13,x,x,59,x,31,19`),
    "1068781",
  )

  test(
    goB(`939
17,x,13,19`),
    "3417",
  )

  test(
    goB(`939
67,7,59,61`),
    "754018",
  )

  test(
    goB(`939
67,x,7,59,61`),
    "779210",
  )

  test(
    goB(`939
67,7,x,59,61`),
    "1261476",
  )

  test(
    goB(`939
1789,37,47,1889`),
    "1202161486",
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
