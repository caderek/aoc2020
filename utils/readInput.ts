import { readFileSync, existsSync } from "fs"
import * as getCallerFile from "get-caller-file"

export const readInput = () => {
  const file = getCallerFile()
    .split("/")
    .slice(0, -1)
    .concat("input.txt")
    .join("/")

  if (existsSync(file)) {
    return readFileSync(file).toString()
  } else {
    throw new Error("No input file!")
  }
}
