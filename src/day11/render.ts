import * as kleur from "kleur"
import logUpdate from "log-update"

const symbols = {
  ".": " ",
  L: "◻",
  "#": "◼",
}

let prevLabel = ""
let frameNr = 0

const render = (grid: string[][], label: string) => {
  if (label !== prevLabel) {
    frameNr = 0
  }

  if (frameNr !== 0 && frameNr % 2 === 0) {
    frameNr++
    prevLabel = label
    return
  }

  const frame = grid
    .map((row) =>
      row
        .map((el) =>
          el === "."
            ? kleur.gray(symbols[el])
            : el === "#"
            ? kleur.dim().yellow(symbols[el])
            : kleur.dim().gray(symbols[el]),
        )
        .join(" "),
    )
    .join("\n")

  logUpdate(`${label}\n${frame}`)
  frameNr++
}

export default render
