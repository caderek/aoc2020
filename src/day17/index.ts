import { read, send, test, gen } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((row) => row.split("").map((x) => (x === "." ? 0 : 1)))

const baseDeltas = [...gen.clone.baseN([0, 1, -1])]
const deltas = baseDeltas.slice(1)
const deltas4d = [...gen.clone.cartesian(baseDeltas, [0, 1, -1])]
  .map((x) => x.flat())
  .slice(1)

const countNeighbors = (arr, z, y, x) => {
  let n = 0

  deltas.forEach(([i, j, k]) => {
    if (arr[z + i]?.[y + j]?.[x + k]) {
      n++
    }
  })

  return n
}

const countNeighbors4d = (arr, t, z, y, x) => {
  let n = 0

  deltas4d.forEach(([h, i, j, k]) => {
    if (arr[t + h]?.[z + i]?.[y + j]?.[x + k]) {
      n++
    }
  })

  return n
}

const surroundByEmptySpace = (arr: (number | undefined)[][][]) => {
  const h = arr.length + 2
  const d = arr[0].length + 2
  const w = arr[0][0].length + 2
  return Array.from({ length: h }, (_, z) =>
    Array.from({ length: d }, (_, y) =>
      Array.from({ length: w }, (_, x) => arr[z - 1]?.[y - 1]?.[x - 1]),
    ),
  )
}

const surroundByEmptySpace4d = (arr: (number | undefined)[][][][]) => {
  const s = arr.length + 2
  const h = arr[0].length + 2
  const d = arr[0][0].length + 2
  const w = arr[0][0][0].length + 2

  return Array.from({ length: s }, (_, t) =>
    Array.from({ length: h }, (_, z) =>
      Array.from({ length: d }, (_, y) =>
        Array.from(
          { length: w },
          (_, x) => arr[t - 1]?.[z - 1]?.[y - 1]?.[x - 1],
        ),
      ),
    ),
  )
}

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)

  let world = surroundByEmptySpace([input])
  let i = 0

  while (i < 6) {
    const copy = JSON.parse(JSON.stringify(world))

    for (let z = 0; z < world.length; z++) {
      for (let y = 0; y < world[0].length; y++) {
        for (let x = 0; x < world[0][0].length; x++) {
          const item = world[z][y][x]
          const neighbors = countNeighbors(world, z, y, x)
          if (item) {
            copy[z][y][x] = neighbors === 2 || neighbors === 3 ? 1 : 0
          } else if (neighbors === 3) {
            copy[z][y][x] = 1
          } else {
            copy[z][y][x] = 0
          }
        }
      }
    }

    world = surroundByEmptySpace(copy)
    i++
  }

  return world.flat(2).filter((x) => x === 1).length
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)

  let world = surroundByEmptySpace4d([[input]])
  let i = 0

  while (i < 6) {
    const copy = JSON.parse(JSON.stringify(world))

    for (let t = 0; t < world.length; t++) {
      for (let z = 0; z < world[0].length; z++) {
        for (let y = 0; y < world[0][0].length; y++) {
          for (let x = 0; x < world[0][0][0].length; x++) {
            const item = world[t][z][y][x]
            const neighbors = countNeighbors4d(world, t, z, y, x)
            if (item) {
              copy[t][z][y][x] = neighbors === 2 || neighbors === 3 ? 1 : 0
            } else if (neighbors === 3) {
              copy[t][z][y][x] = 1
            } else {
              copy[t][z][y][x] = 0
            }
          }
        }
      }
    }

    world = surroundByEmptySpace4d(copy)
    i++
  }

  return world.flat(3).filter((x) => x === 1).length
}

const main = async () => {
  /* Tests */

  test(
    goA(`.#.
..#
###`),
    112,
  )

  test(
    goB(`.#.
..#
###`),
    848,
  )

  /* Results */

  const input = read()

  console.time("Time")
  const resultA = await goA(input)
  const resultB = await goB(input)
  console.timeEnd("Time")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)

  // send(2, resultA)
  // send(2, resultB)
}

main()
