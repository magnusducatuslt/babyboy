const execSync = require("child_process").execSync;
const path = require("path");
const { config } = require(path.resolve(
  process.cwd(),
  "dist/src/config/config.js"
));

const seederPaths = {
  testing: "/src/db-v2/seeders/testing",
  local: "/src/db-v2/seeders/local",
  development: "/src/db-v2/seeders/development",
  staging: "/src/db-v2/seeders",
  production: "/src/db-v2/seeders",
};
const isSeed = process.argv[2] === "up";
const env = config.env;
const command = isSeed ? "db:seed:all" : "db:seed:undo:all";
const seederPath = seederPaths[env];
const seederDistPath = `dist/${seederPath}`;

const commands = [
  `rm -rf ./dist`,
  `tsc`,
  `sequelize ${command} --env ${env} --debug --seeders-path ${seederDistPath}`,
];

const execCommands = (commands) => {
  commands.forEach((command) => {
    console.log("$ " + command);
    execSync(command, { stdio: "inherit" });
    console.log("\n> Done\n");
  });
};

// if (env.match(/prod/gi) || env.match(/stag/gi) || env.match(/dev/gi)) {
//   console.log("Abort only for local env");
//   process.exit(1);
// }

execCommands(commands);
