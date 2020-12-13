const egcd = (a: bigint, b: bigint) => {
  let x = 1n
  let y = 0n
  let r = 0n
  let s = 1n

  while (b !== 0n) {
    let c = a % b
    let q = a / b
    a = b
    b = c

    let rPrim = r
    let sPrim = s
    r = x - q * r
    s = y - q * s
    x = rPrim
    y = sPrim
  }

  return { a, x, y }
}

const mod = (a: bigint, b: bigint) => {
  const x = a % b
  return x < 0n ? x + b : x
}

const crt = (congruences: [bigint, bigint][]) => {
  return mod(
    congruences
      .map(([bus, rest]) => {
        const N = congruences
          .filter(([currBus]) => currBus !== bus)
          .reduce((acc, [bus]) => acc * bus, 1n)
        const { x } = egcd(N, bus)
        return rest * N * x
      })
      .reduce((a, b) => a + b),
    congruences.reduce((acc, [bus]) => acc * bus, 1n),
  )
}

export default { egcd, mod, crt }
