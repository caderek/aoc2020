import { read, send, test } from "../../utils/index"

const prepareInput = (rawInput: string) => {
  const adapters = rawInput
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b)

  return [0, ...adapters, adapters[adapters.length - 1] + 3]
}

const createGraph = () => {
  return {
    graph: [],
    mem: [],

    addEdge(v, w) {
      if (this.graph[v]) {
        this.graph[v].push(w)
      } else {
        this.graph[v] = [w]
      }
    },

    dfs(from) {
      const to = this.graph.length - 1

      if (from === to) {
        return 1
      } else {
        if (this.mem[from] === undefined) {
          this.mem[from] = this.graph[from]
            .map((child) => this.dfs(child, to))
            .reduce((a, b) => a + b)
        }
        return this.mem[from]
      }
    },
  }
}

const goA = (adapters: number[]) => {
  const diffs: { [key: number]: number } = {}

  for (let i = 0; i < adapters.length - 1; i++) {
    const diff = adapters[i + 1] - adapters[i]

    if (!diffs[diff]) {
      diffs[diff] = 0
    }

    diffs[diff]++
  }

  return diffs[1] * diffs[3]
}

const goB = (adapters: number[]) => {
  const graph = createGraph()

  for (let i = 0; i < adapters.length - 1; i++) {
    let inc = 1
    while (true) {
      if (adapters[i + inc] === undefined) {
        break
      }

      const inRange = adapters[i + inc] - adapters[i] <= 3

      if (!inRange) {
        break
      }

      graph.addEdge(i, i + inc)
      inc++
    }
  }

  return String(graph.dfs(0))
}

const main = async () => {
  /* Tests */

  test(
    goA(
      prepareInput(
        `
16
10
15
5
1
11
7
19
6
12
4
  `.trim(),
      ),
    ),
    7 * 5,
  )

  test(
    goB(
      prepareInput(
        `
16
10
15
5
1
11
7
19
6
12
4
  `.trim(),
      ),
    ),
    "8",
  )

  /* Results */

  const input = prepareInput(read())

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
