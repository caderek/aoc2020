import { test, read } from "../../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .map((row) =>
      row
        .split("\n")
        .map((line) => line.split(" "))
        .flat(),
    )
    .map((entry) => Object.fromEntries(entry.map((field) => field.split(":"))))

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

  return input.filter((item) => {
    const keys = Object.keys(item)

    return requiredFields.every((x) => keys.includes(x))
  })
}

const goB = (rawInput: string) => {
  const input = goA(rawInput)
  const validation = {
    byr: (val) =>
      val.match(/^\d{4}$/) && Number(val) >= 1920 && Number(val) <= 2002,
    iyr: (val) =>
      val.match(/^\d{4}$/) && Number(val) >= 2010 && Number(val) <= 2020,
    eyr: (val) =>
      val.match(/^\d{4}$/) && Number(val) >= 2020 && Number(val) <= 2030,
    hgt: (val) => {
      if (val.match(/^\d+(cm|in)$/) == null) {
        return false
      }

      const amount = Number(val.slice(0, -2))
      const unit = val.slice(-2)

      return unit === "cm"
        ? amount >= 150 && amount <= 193
        : amount >= 59 && amount <= 76
    },
    hcl: (val) => val.match(/^#[0-9a-f]{6}$/),
    ecl: (val) => val.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
    pid: (val) => val.match(/^\d{9}$/),
    cid: (val) => true,
  }

  return input.filter((item) =>
    Object.entries(item).every(([key, val]) => validation[key](val)),
  )
}

const main = async () => {
  /* Tests */

  test(
    goA(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`).length,
    2,
  )

  test(
    goB(`eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`).length,
    0,
  )

  test(
    goB(`pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`).length,
    4,
  )

  /* Results */

  const input = read()

  console.log("^")
  const resultA = await goA(input).length
  const resultB = await goB(input).length
  console.log("$")

  console.log("Solution to part 1:", resultA)
  console.log("Solution to part 2:", resultB)
}

main()
