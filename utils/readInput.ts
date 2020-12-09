import { readFileSync, existsSync } from "fs"
import { sep } from "path"
import * as getCallerFile from "get-caller-file"

export const readInput = () => {
  const file = getCallerFile()
    .split(sep)
    .slice(0, -1)
    .concat("input.txt")
    .join(sep)

  if (existsSync(file)) {
    return readFileSync(file).toString()
  } else {
    throw new Error("No input file!")
  }
}
