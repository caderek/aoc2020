import { read, send, test } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((x) => [x[0], Number(x.slice(1))])

enum Dirs {
  N,
  E,
  S,
  W,
}

const moveFactors = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
]

const rotationFactors = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
]

const mod = (a: number, b: number) => {
  const x = a % b
  return x < 0 ? x + b : x
}

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput) as [string, number][]

  let x = 0
  let y = 0

  let currDir = 1

  const turn = (dir: "L" | "R", deg: number) => {
    const inc = deg / 90
    currDir = mod(dir == "R" ? currDir + inc : currDir - inc, 4)
  }

  for (const [dir, val] of input) {
    if (["N", "E", "S", "W"].includes(dir)) {
      const [dx, dy] = moveFactors[Dirs[dir]].map((x) => x * val)
      x += dx
      y += dy
    } else if (["L", "R"].includes(dir)) {
      turn(dir as "L" | "R", val)
    } else if (dir === "F") {
      const [dx, dy] = moveFactors[currDir].map((x) => x * val)
      x += dx
      y += dy
    }
  }

  return Math.abs(x) + Math.abs(y)
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput) as [string, number][]

  let x = 0
  let y = 0
  let wx = 10
  let wy = -1

  let currDir = 1

  const turn = (dir: "L" | "R", deg: number) => {
    const inc = deg / 90
    currDir = mod(dir == "R" ? currDir + inc : currDir - inc, 4)

    const nx = Math.abs(inc % 2 === 0 ? wx : wy) * rotationFactors[currDir][0]
    const ny = Math.abs(inc % 2 === 0 ? wy : wx) * rotationFactors[currDir][1]

    wx = nx
    wy = ny
  }

  for (const [dir, val] of input) {
    if (["N", "E", "S", "W"].includes(dir)) {
      const [dx, dy] = moveFactors[Dirs[dir]].map((x) => x * val)
      wx += dx
      wy += dy

      currDir = rotationFactors.findIndex(
        ([a, b]) => wx / Math.abs(wx) === a && wy / Math.abs(wy) === b,
      )
    } else if (["L", "R"].includes(dir)) {
      turn(dir as "L" | "R", val)
    } else if (dir === "F") {
      x += wx * val
      y += wy * val
    }
  }

  return Math.abs(x) + Math.abs(y)
}

const main = async () => {
  /* Tests */

  test(
    goA(
      `
F10
N3
F7
R90
F11
  `.trim(),
    ),
    25,
  )

  test(
    goB(
      `
F10
N3
F7
R90
F11
L90
    `.trim(),
    ),
    286,
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
