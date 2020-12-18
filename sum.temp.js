const sum = (a) =>
  a
    .match(/Time: (\d+\.\d+)ms/g)
    .map((x) => Number(x.match(/\d+\.\d+/)[0]))
    .reduce((a, b) => a + b)
