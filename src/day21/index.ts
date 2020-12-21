import { read, send, test, arr } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((food) => {
    const products = new Set(food.split("(")[0].trim().split(" "))
    const allergens = food
      .match(/\(.+\)/)[0]
      .replace("(contains ", "")
      .replace(")", "")
      .split(", ")

    return { products, allergens }
  })

const commonPart = (...sets: Set<string>[]) => {
  if (sets.length === 1) {
    return sets[0]
  }

  return sets.reduce((a, b) => {
    const common: Set<string> = new Set()
    a.forEach((item) => {
      if (b.has(item)) {
        common.add(item)
      }
    })
    return common
  })
}

const categorize = (input) => {
  const allAllergens = new Set(input.map(({ allergens }) => allergens).flat())
  const size = allAllergens.size

  const done = new Set()
  const notSafe = new Map()

  while (done.size < size) {
    allAllergens.forEach((allergen) => {
      const withAllergen = input.filter(({ allergens }) =>
        allergens.includes(allergen),
      )

      const common = commonPart(...withAllergen.map(({ products }) => products))

      if (common.size === 1) {
        const match = [...common][0]

        notSafe.set(allergen, match)
        done.add(allergen)
        allAllergens.delete(allergen)

        input.forEach((item) => {
          item.products.delete(match)
        })
      }
    })
  }

  const safeNum = input
    .map(({ products }) => products.size)
    .reduce((a, b) => a + b)

  return { notSafe, safeNum }
}

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const { safeNum } = categorize(input)

  return safeNum
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const { notSafe } = categorize(input)
  const sorted = arr.sortBy_.str(([x]) => x, [...notSafe.entries()])

  return sorted.map(([_, x]) => x).join()
}

const main = async () => {
  /* Tests */

  test(
    goA(`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`),
    5,
  )

  test(
    goB(`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`),
    "mxmxvkd,sqjhc,fvjkl",
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
