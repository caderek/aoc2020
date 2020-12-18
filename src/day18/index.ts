import {
  read,
  send,
  test,
  arr,
  com,
  mul,
  dis,
  math,
  R,
  graph,
  log,
  equal,
  gen,
} from "../../utils/index"

const prepareInput = (rawInput: string) => rawInput.split("\n")

const operations = {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
}

const evaluate = (expression, precedence) => {
  const ops = []
  const nums = []

  for (const char of expression) {
    if (char === " ") {
      continue
    }

    if (char.match(/\d/)) {
      nums.push(Number(char))
      continue
    }

    if (char === "(") {
      ops.push(char)
      continue
    }

    if (char === ")") {
      while (ops.length > 0 && ops[ops.length - 1] !== "(") {
        const op = ops.pop()
        const b = nums.pop()
        const a = nums.pop()
        nums.push(operations[op](a, b))
      }
      ops.pop()
      continue
    }

    while (
      ops.length > 0 &&
      precedence[ops[ops.length - 1]] >= precedence[char]
    ) {
      const op = ops.pop()
      const b = nums.pop()
      const a = nums.pop()
      nums.push(operations[op](a, b))
    }

    ops.push(char)
  }

  while (ops.length > 0) {
    const op = ops.pop()
    const b = nums.pop()
    const a = nums.pop()
    nums.push(operations[op](a, b))
  }

  return nums[0]
}

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const precedence = { "+": 1, "*": 1 }

  return input
    .map((expression) => evaluate(expression, precedence))
    .reduce((a, b) => a + b)
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const precedence = { "+": 2, "*": 1 }

  return input
    .map((expression) => evaluate(expression, precedence))
    .reduce((a, b) => a + b)
}

const main = async () => {
  /* Tests */

  test(goA("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"), 12240)
  test(goB("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"), 669060)

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
