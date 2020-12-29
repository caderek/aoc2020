const { spawn, spawnSync } = require("child_process")
const { readdirSync } = require("fs")

const day = process.argv[2]
const days = readdirSync("./src").filter(
  (folder) => !["template", "utils"].includes(folder),
)

if (!day) {
  days.forEach((day) => {
    spawnSync("./aoctimer", ["ts-node", `src/${day}/index.ts`], {
      stdio: "inherit",
    })
  })

  spawnSync("./aoctimer", ["summary"], {
    stdio: "inherit",
  })
} else {
  spawn("./aoctimer", ["ts-node", `src/${day}/index.ts`], {
    stdio: "inherit",
  })
}
