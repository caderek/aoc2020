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
    const prevDecks = new Set()

    while (player1deck.length > 0 && player2deck.length > 0) {
      const positionId = `${player1deck.join()}_${player2deck.join()}`

      if (prevDecks.has(positionId)) {
        return { winner: 1, deck: player1deck }
      }

      prevDecks.add(positionId)
      const a = player1deck.shift()
      const b = player2deck.shift()

      const oneWon =
        player1deck.length >= a && player2deck.length >= b
          ? play(player1deck.slice(0, a), player2deck.slice(0, b)).winner
          : a > b

      if (oneWon) {
        player1deck.push(a)
        player1deck.push(b)
      } else {
        player2deck.push(b)
        player2deck.push(a)
      }
    }

    return player1deck.length > 0
      ? { oneWon: true, deck: player1deck }
      : { oneWon: false, deck: player2deck }
  }

  const { deck } = play(player1deck, player2deck)

  return deck.reverse().reduce((acc, val, i) => acc + val * (i + 1), 0)
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
