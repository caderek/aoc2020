import { test, readInput, graph } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((rule) => {
    const [bag, content] = rule.split(" bags contain ")
    const entries: [number, string][] =
      content === "no other bags."
        ? []
        : content.split(",").map((entry) => {
            const sanitized = entry.trim().replace(/\sbags?\.?/, "")
            const firstSpaceIndex = sanitized.indexOf(" ")

            return [
              Number(sanitized.slice(0, firstSpaceIndex)),
              sanitized.slice(firstSpaceIndex + 1),
            ]
          })

    return { bag, entries }
  })

const createGraph = (input) => {
  const g = new graph.Graph({ directed: true })

  input.forEach(({ bag, entries }) => {
    entries.forEach(([amount, subBag]) => {
      g.setEdge(bag, subBag, amount)
    })
  })

  return g
}

const goA = (g: graph.Graph) => {
  const recur = (id: string) => {
    const pre = g.predecessors(id) as string[]
    if (pre.length > 0) {
      return [...pre, ...pre.map((item) => recur(item)).flat()]
    } else {
      return pre
    }
  }

  return new Set(recur("shiny gold")).size
}

const goB = (g: graph.Graph) => {
  const recur = (id: string) => {
    const edges = g.outEdges(id) as graph.Edge[]

    if (edges.length > 0) {
      const amounts = edges.map((edge) => g.edge(edge.v, edge.w))

      const childrenAmounts = edges
        .map(({ w }, i) => recur(w).map((x) => x * amounts[i]))
        .flat()

      return [...amounts, ...childrenAmounts]
    } else {
      return []
    }
  }

  return recur("shiny gold").reduce((a, b) => a + b)
}

const main = async () => {
  /* Tests */

  test(
    goA(
      createGraph(
        prepareInput(
          `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
    `.trim(),
        ),
      ),
    ),
    4,
  )

  test(
    goB(
      createGraph(
        prepareInput(
          `
shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
    `.trim(),
        ),
      ),
    ),
    126,
  )

  /* Results */

  const graph = createGraph(prepareInput(readInput()))

  console.time("Time")
  const resultA = await goA(graph)
  const resultB = await goB(graph)
  console.timeEnd("Time")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)
}

main()
