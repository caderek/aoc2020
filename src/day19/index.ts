import { read, test, send } from "../../utils/index"

const prepareInput = (rawInput: string) => {
  const [rawRules, rawCodes] = rawInput.split("\n\n")

  const rules = Object.fromEntries(
    rawRules
      .split("\n")
      .map((line) => line.split(": "))
      .map(([id, rule]) => [
        id,
        rule.match(/[ab]/)
          ? rule.slice(1, -1)
          : rule.split(" | ").map((ids) => ids.split(" ")),
      ]),
  )

  return { rules, codes: rawCodes.split("\n") }
}

function* runSeq(rules, seq, code) {
  if (seq.length === 0) {
    yield code
  } else {
    const [currSeq, ...rest] = seq
    for (const currCode of run(rules, currSeq, code)) {
      yield* runSeq(rules, rest, currCode)
    }
  }
}

function* runAlt(rules, alt, code) {
  for (const seq of alt) {
    yield* runSeq(rules, seq, code)
  }
}

function* run(rules, id, code) {
  if (Array.isArray(rules[id])) {
    yield* runAlt(rules, rules[id], code)
  } else {
    if (code && code[0] === rules[id]) {
      yield code.slice(1)
    }
  }
}

const match = (rules, code) => {
  for (const m of run(rules, "0", code)) {
    if (m === "") {
      return true
    }
  }
  return false
}

const goA = (rawInput: string) => {
  const { rules, codes } = prepareInput(rawInput)

  return codes.filter((code) => match(rules, code)).length
}

const goB = (rawInput: string) => {
  const { rules, codes } = prepareInput(rawInput)
  const modifiedRules = {
    ...rules,
    "8": [["42"], ["42", "8"]],
    "11": [
      ["42", "31"],
      ["42", "11", "31"],
    ],
  }

  return codes.filter((code) => match(modifiedRules, code)).length
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
