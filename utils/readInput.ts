import { readFileSync, existsSync } from "fs"
import { sep } from "path"
import { getInput } from "./api"

export const readInput = (caller: string, day: number | null = null) => {
  const file = caller.split(sep).slice(0, -1).concat("input.txt").join(sep)

  if (day !== null) {
    getInput(2020, day, file)
  }

  if (existsSync(file)) {
    return readFileSync(file).toString()
  } else {
    console.error("No input file")
  }
}
