const compute = async (source: string) => {
  const program = source.split("\n")

  const positions = new Set()
  let pointer = 0
  let acc = 0

  while (true) {
    if (positions.has(pointer)) {
      console.log(acc)
      break
    }

    positions.add(pointer)

    const opcode = program[pointer].split(" ")[0]
    const val = Number(program[pointer].split(" ")[1])

    console.log({ opcode, val, pointer, acc })

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
}

export default compute
