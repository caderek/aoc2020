import { read, send, test } from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split("").map(Number)

const mod = (a: number, b: number) => {
  const x = a % b
  return x < 0 ? x + b : x
}

const getDest = (
  picked: number[],
  start: number,
  len: number,
  sub: number = 1,
) => {
  let dest = mod(start - sub, len + 1)
  return picked.includes(dest) || dest === 0
    ? getDest(picked, start, len, sub + 1)
    : dest
}

const play = (
  rawInput: string,
  maxTurn: number,
  takeN: number,
  size: number,
) => {
  const nums = prepareInput(rawInput).concat(
    Array.from({ length: size - 9 }, (_, i) => i + 10),
  )

  const len = nums.length
  const links = new Map()

  nums.forEach((num, i) => {
    links.set(num, nums[(i + 1) % nums.length])
  })

  const picked = new Array(3)

  let i = 0
  let start = nums[i]

  while (i < maxTurn) {
    picked[0] = links.get(start)
    picked[1] = links.get(picked[0])
    picked[2] = links.get(picked[1])
    links.set(start, links.get(picked[2]))

    const dest = getDest(picked, start, len)
    const end = links.get(dest)
    links.set(dest, picked[0])
    links.set(picked[2], end)

    start = links.get(start)
    i++
  }

  const result = [links.get(1)]

  while (--takeN) {
    result.push(links.get(result[result.length - 1]))
  }

  return result
}

const goA = (rawInput: string) => {
  return Number(play(rawInput, 100, 8, 9).join(""))
}

const goB = (rawInput: string) => {
  return play(rawInput, 10000000, 2, 1000000).reduce((a, b) => a * b)
}

const main = async () => {
  /* Tests */

  test(goA("389125467"), 67384529)
  test(goB("389125467"), 149245887792)

  /* Results */

  const input = read()

  console.log("^")
  const resultA = await goA(input)
  const resultB = await goB(input)
  console.log("$")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)

  // send(1, resultA)
  // send(2, resultB)
}

main()
