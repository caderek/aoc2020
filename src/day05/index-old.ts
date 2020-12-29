import { test, read } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((x) => x.split(""))

const getSeats = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return input.map((moves) => {
    const rows = 127
    const cols = 7
    const rowMoves = moves.slice(0, 7)
    const colMoves = moves.slice(-3)

    const row = rowMoves.reduce(
      (acc, move) => {
        const range =
          move === "F"
            ? [acc[0], acc[0] + ((acc[1] - acc[0]) >> 1)]
            : [acc[0] + ((acc[1] - acc[0]) >> 1) + 1, acc[1]]

        return range
      },
      [0, rows],
    )[0]

    const col = colMoves.reduce(
      (acc, move) => {
        const range =
          move === "L"
            ? [acc[0], acc[0] + ((acc[1] - acc[0]) >> 1)]
            : [acc[0] + ((acc[1] - acc[0]) >> 1) + 1, acc[1]]

        return range
      },
      [0, cols],
    )[0]

    return { row, col, id: row * 8 + col }
  })
}

const goA = (rawInput: string) => {
  const seats = getSeats(rawInput)

  return Math.max(...seats.map((seat) => seat.id))
}

const goB = (rawInput: string) => {
  const ids = getSeats(rawInput)
    .map((seat) => seat.id)
    .sort((a, b) => a - b)

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] + 1 !== ids[i + 1]) {
      return ids[i] + 1
    }
  }
}

const main = async () => {
  /* Tests */

  test(goA("FBFBBFFRLR"), 357)
  test(goA("BFFFBBFRRR"), 567)
  test(goA("FFFBBBFRRR"), 119)
  test(goA("BBFFBBFRLL"), 820)

  /* Results */

  const input = read()

  console.log("^")
  const resultA = await goA(input)
  const resultB = await goB(input)
  console.log("$")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)
}

main()
