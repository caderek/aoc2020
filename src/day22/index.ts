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
  const [p1Deck, p2Deck] = prepareInput(rawInput)

  const play = (p1Deck, p2Deck) => {
    const p1PrevDecks = new Set()
    const p2PrevDecks = new Set()

    while (p1Deck.length > 0 && p2Deck.length > 0) {
      const positionId1 = p1Deck.join()
      const positionId2 = p2Deck.join()

      if (p1PrevDecks.has(positionId1) || p2PrevDecks.has(positionId2)) {
        return true
      }

      p1PrevDecks.add(positionId1)
      p2PrevDecks.add(positionId2)

      const a = p1Deck.shift()
      const b = p2Deck.shift()

      const player1won =
        p1Deck.length >= a && p2Deck.length >= b
          ? play(p1Deck.slice(0, a), p2Deck.slice(0, b))
          : a > b

      if (player1won) {
        p1Deck.push(a)
        p1Deck.push(b)
      } else {
        p2Deck.push(b)
        p2Deck.push(a)
      }
    }

    return p1Deck.length > 0
  }

  const player1won = play(p1Deck, p2Deck)
  const winnerDeck = player1won ? p1Deck : p2Deck

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
