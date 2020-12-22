import { read, test } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n\n").map((group) => {
    const [_, ...deck] = group.split("\n").map(Number)
    return deck
  })

const goA = (rawInput: string) => {
  const [player1deck, player2deck] = prepareInput(rawInput)

  while (player1deck.length > 0 && player2deck.length > 0) {
    const a = player1deck.shift()
    const b = player2deck.shift()

    if (a > b) {
      player1deck.push(a)
      player1deck.push(b)
    } else {
      player2deck.push(b)
      player2deck.push(a)
    }
  }

  const winnerDeck = player1deck.length > 0 ? player1deck : player2deck

  return winnerDeck.reverse().reduce((acc, val, i) => acc + val * (i + 1), 0)
}

const goB = (rawInput: string) => {
  const [player1deck, player2deck] = prepareInput(rawInput)

  const play = (player1deck, player2deck) => {
    const prevDecks1 = new Set()
    const prevDecks2 = new Set()

    while (player1deck.length > 0 && player2deck.length > 0) {
      const positionId1 = player1deck.join()
      const positionId2 = player2deck.join()

      if (prevDecks1.has(positionId1) || prevDecks2.has(positionId2)) {
        return true
      }

      prevDecks1.add(positionId1)
      prevDecks2.add(positionId2)
      const a = player1deck.shift()
      const b = player2deck.shift()

      const player1won =
        player1deck.length >= a && player2deck.length >= b
          ? play(player1deck.slice(0, a), player2deck.slice(0, b))
          : a > b

      if (player1won) {
        player1deck.push(a)
        player1deck.push(b)
      } else {
        player2deck.push(b)
        player2deck.push(a)
      }
    }

    return player1deck.length > 0
  }

  const player1won = play(player1deck, player2deck)
  const winnerDeck = player1won ? player1deck : player2deck

  return winnerDeck.reverse().reduce((acc, val, i) => acc + val * (i + 1), 0)
}

const main = async () => {
  /* Tests */

  test(
    goA(`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`),
    306,
  )

  test(
    goB(`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`),
    291,
  )

  const input = read()

  /* Regression tests for refactor */
  test(goA(input), 32495)
  test(goB(input), 32665)

  /* Results */

  console.time("Time")
  const resultA = goA(input)
  const resultB = goB(input)
  console.timeEnd("Time")

  console.log("Solution to part 1:", resultA) // 32495
  console.log("Solution to part 2:", resultB) // 32665

  // send(1, resultA)
  // send(2, resultB)
}

main()
