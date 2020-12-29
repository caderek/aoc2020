import { test, read } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => row.split(""))

const goA = (rawInput: string, deltaX: number, deltaY: number) => {
  const input = prepareInput(rawInput)
  const width = input[0].length
  const height = input.length
  let trees = 0

  for (let i = 0; i < height / deltaY; i++) {
    const x = (i * deltaX) % width
    const y = i * deltaY

    if (input[y][x] === "#") {
      trees++
    }
  }

  return trees
}

const goB = (rawInput: string, slopes: [number, number][]) => {
  return slopes
    .map(([deltaX, deltaY]) => goA(rawInput, deltaX, deltaY))
    .reduce((a, b) => a * b)
}

const main = async () => {
  const slopes: [number, number][] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]

  /* Tests */

  test(
    goA(
      `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
      3,
      1,
    ),
    7,
  )
  test(
    goB(
      `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
      slopes,
    ),
    336,
  )

  /* Results */

  const input = read()

  console.log("^")
  const resultA = await goA(input, 3, 1)
  const resultB = await goB(input, slopes)
  console.log("$")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)
}

main()
