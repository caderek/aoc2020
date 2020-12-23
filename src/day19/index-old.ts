import { read, test } from "../../utils/index"
import * as peg from "pegjs"

const prepareInput = (rawInput: string) => {
  const [rules, rawCodes] = rawInput.split("\n\n")

  return { rules, codes: rawCodes.split("\n") }
}

const prepareGrammar = (rules) => {
  return rules
    .split("\n")
    .map((rule) => rule.split(": "))
    .map(([id, rest]) =>
      [
        `r${id}`,
        rest.match(/\d+/) !== null
          ? rest
              .split(" | ")
              .map((x) =>
                x
                  .split(" ")
                  .map((x) => `r${x}`)
                  .join(" "),
              )
              .join(" / ")
          : rest,
      ].join(" = "),
    )
    .join("\n")
}

const unfoldLoop = (sequence: string, depth: number) => {
  const unfolded = []
  const parts = sequence.split(" ")
  for (let i = 0; i < depth; i++) {
    let item = ""
    item += `${parts[0]} `.repeat(i + 1).trim()
    if (parts[1]) {
      item += ` ${parts[1]}`.repeat(i + 1)
    }

    unfolded.push(item)
  }
  return unfolded.join(" | ")
}

const goA = (rawInput: string) => {
  let { rules, codes } = prepareInput(rawInput)

  const grammar = prepareGrammar(rules)
  console.log(grammar)
  const parser = peg.generate(grammar, { allowedStartRules: ["r0"] })

  const correct = codes.filter((code) => {
    try {
      parser.parse(code, { startRule: "r0" })
      return true
    } catch (e) {
      // console.log(e)
      return false
    }
  })

  return correct.length
}

const goB = (rawInput: string) => {
  let { rules, codes } = prepareInput(rawInput)
  const updatedRules = rules
    // .replace("8: 42", "8: 42 | 42 8")
    // .replace("11: 42 31", "11: 42 31 | 42 11 31")
    .replace("8: 42", `8: ${unfoldLoop("42", 20)}`)
    .replace("11: 42 31", `11: ${unfoldLoop("42 31", 20)}`)

  const grammar = prepareGrammar(updatedRules)
  // console.log(grammar)
  const parser = peg.generate(grammar, { allowedStartRules: ["r0"] })

  const correct = codes.filter((code) => {
    try {
      parser.parse(code, { startRule: "r0" })
      return true
    } catch (e) {
      return false
    }
  })

  return correct.length
}

const main = async () => {
  // /* Tests */

  test(
    goA(`0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`),
    2,
  )

  test(
    goB(`42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`),
    12,
  )

  /* Results */

  const input = read()

  console.time("Time")
  // const resultA = await goA(input)
  // const resultB = await goB(input)
  console.timeEnd("Time")

  // console.log("Solution to part 1:", resultA)
  // console.log("Solution to part 2:", resultB)

  // send(1, resultA)
  // send(2, resultB) // 263
}

main()
