import { read, send } from "../../utils/index"

const neighbors = {
  se: [-1, 1, 0],
  sw: [0, 1, -1],
  nw: [1, -1, 0],
  ne: [0, -1, 1],
  e: [-1, 0, 1],
  w: [1, 0, -1],
}

const neighborsVal = Object.values(neighbors)

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => line.match(/(se|sw|nw|ne|e|w)/g).map((v) => neighbors[v]))

const getBlackTiles = (input: number[][][]) => {
  const blackTiles = new Set()

  input.forEach((coords) => {
    const point = coords.reduce((a, b) => [
      a[0] + b[0],
      a[1] + b[1],
      a[2] + b[2],
    ])

    const id = point.join()

    if (blackTiles.has(id)) {
      blackTiles.delete(id)
    } else {
      blackTiles.add(id)
    }
  })

  return blackTiles
}

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const blackTiles = getBlackTiles(input)

  return blackTiles.size
}

const countNeighbors = (arr, z, y) => {
  let n = 0

  neighborsVal.forEach(([i, j]) => {
    if (arr[z + i]?.[y + j]) {
      n++
    }
  })

  return n
}

const surroundByEmptySpace = (arr: (number | undefined)[][]) => {
  const h = arr.length + 2
  const d = arr[0].length + 2

  return Array.from({ length: h }, (_, z) =>
    Array.from({ length: d }, (_, y) => arr[z - 1]?.[y - 1] || 0),
  )
}

const goB = (rawInput: string, turns: number = 100) => {
  const input = prepareInput(rawInput)

  const blackTiles = [...getBlackTiles(input)]
    .map((x: string) => x.split(","))
    .map(([z, y]) => [Number(z), Number(y)])

  const minZ = Math.abs(Math.min(...blackTiles.map(([z]) => z)))
  const minY = Math.abs(Math.min(...blackTiles.map(([_, y]) => y)))
  const sizeZ = Math.max(...blackTiles.map(([z]) => z)) + minZ + 1
  const sizeY = Math.max(...blackTiles.map(([_, y]) => y)) + minY + 1

  const grid = Array.from({ length: sizeZ }, () =>
    Array.from({ length: sizeY }, () => 0),
  )

  blackTiles.forEach(([z, y]) => (grid[z + minZ][y + minY] = 1))

  let world = surroundByEmptySpace(grid)

  while (turns--) {
    const copy = JSON.parse(JSON.stringify(world))

    for (let z = 0; z < world.length; z++) {
      for (let y = 0; y < world[0].length; y++) {
        const item = world[z][y]
        const neighbors = countNeighbors(world, z, y)

        if (item) {
          copy[z][y] = neighbors === 1 || neighbors === 2 ? 1 : 0
        } else if (neighbors === 2) {
          copy[z][y] = 1
        } else {
          copy[z][y] = 0
        }
      }
    }

    world = surroundByEmptySpace(copy)
  }

  return world.flat().filter((v) => v === 1).length
}

const main = async () => {
  /* Results */

  const input = read()

  console.time("Time")
  const resultA = goA(input)
  const resultB = goB(input)
  console.timeEnd("Time")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)

  // send(1, resultA)
  // send(2, resultB)
}

main()
