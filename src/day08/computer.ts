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

    let shouldJump = true

    switch (opcode) {
      case "acc": {
        acc += val
        break
      }
      case "nop": {
        break
      }
      case "jmp": {
        pointer += val
        shouldJump = false
        break
      }
    }

    if (shouldJump) {
      pointer += 1
    }
  }

  return { acc, info }
}

export default compute
