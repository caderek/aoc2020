import "./monkey"
import { test } from "./test"
import { readInput } from "./readInput"
import { arr, com, mul, dis } from "@arrows/arrows"
import * as math from "mathjs"
import * as R from "ramda"
import * as graph from "graphlib"
import { isDeepStrictEqual } from "util"
// import grid from "./grid"
import numSys from "./num-sys"
import * as gen from "generatorics"
import { sendSolution } from "./api"
import * as getCallerFile from "get-caller-file"
// import crypto from "./crypto"

const log = (data) => console.dir(data, { colors: true, depth: 99 })
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const equal = com.curry(isDeepStrictEqual)

const day = process.argv[2]
  ? Number(process.argv[2].match(/[0-9]{2}/)[0])
  : null

const send = (part: 1 | 2, solution: number | string) => {
  sendSolution(2020, day, part, solution)
}

const read = () => readInput(getCallerFile(), day)

export {
  read,
  send,
  test,
  arr,
  com,
  mul,
  dis,
  math,
  R,
  graph,
  log,
  delay,
  equal,
  // grid,
  numSys,
  gen,
  // crypto,
}
export default { test, readInput }
