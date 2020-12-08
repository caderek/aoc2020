const compute = (program: [string, number][]) => {
  const positions = new Set()
  let pointer = 0
  let acc = 0
  let info = ""

  while (true) {
    if (positions.has(pointer) || pointer === program.length) {
      info = pointer === program.length ? "exit" : "loop"
      break
    }

    positions.add(pointer)

    const [opcode, val] = program[pointer]

    switch (opcode) {
      case "acc": {
        acc += val
        pointer++
        break
      }
      case "nop": {
        pointer++
        break
      }
      case "jmp": {
        pointer += val
        break
      }
    }
  }

  return { acc, info }
}

export default compute
