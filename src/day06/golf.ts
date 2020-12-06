const goA = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .reduce((acc, x) => acc + new Set([...x.replace(/[\s\n]/g, "")]).size, 0)

const goB = (rawInput: string) =>
  rawInput.split("\n\n").reduce((acc, rawGroup) => {
    const letters = Array.from(new Set([...rawGroup.replace(/\n/g, "")]))
    const group = rawGroup.split("\n")

    return (
      acc +
      letters.reduce(
        (all, l) => all + (group.every((ans) => ans.includes(l)) ? 1 : 0),
        0,
      )
    )
  }, 0)
