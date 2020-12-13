import { read, send, test } from "../../utils/index"

const gcd = (a: bigint, b: bigint) => {
  let x = 1n
  let y = 0n
  let r = 0n
  let s = 1n

  while (b !== 0n) {
    let c = a % b
    let q = a / b
    a = b
    b = c

    let rPrim = r
    let sPrim = s
    r = x - q * r
    s = y - q * s
    x = rPrim
    y = sPrim
  }

  return [a, x, y]
}

const mod = (a: bigint, b: bigint) => {
  const x = a % b
  return x < 0n ? x + b : x
}

const prepareInput = (rawInput: string) => {
  const [timestamp, schedule] = rawInput.split("\n")
  const buses = schedule
    .split(",")
    .map((v, i) => [v, i])
    .filter(([v]) => v !== "x")
    .map(([v, i]: [string, number]) => {
      const bus = BigInt(v)
      return { bus, rest: i === 0 ? 0n : bus - (BigInt(i) % bus) }
    })

  return { timestamp: Number(timestamp), buses }
}

const goA = (rawInput: string) => {
  const { timestamp, buses } = prepareInput(rawInput)
  const departures = buses.map(
    ({ bus }) => Math.ceil(timestamp / Number(bus)) * Number(bus),
  )
  const earliest = Math.min(...departures)
  const index = departures.findIndex((x) => x === earliest)

  return (earliest - timestamp) * Number(buses[index].bus)
}

const goB = (rawInput: string) => {
  const { buses } = prepareInput(rawInput)

  return String(
    mod(
      buses
        .map(({ bus, rest }) => {
          const N = buses
            .filter((x) => x.bus !== bus)
            .reduce((acc, x) => acc * x.bus, 1n)
          const [_, M] = gcd(N, bus)
          return rest * N * M
        })
        .reduce((a, b) => a + b),
      buses.reduce((acc, x) => acc * x.bus, 1n),
    ),
  )
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

  test(
    goB(`939
3,x,x,x,x,x,x,x,x,x,x,x,x,5`),
    "12",
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
