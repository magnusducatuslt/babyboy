const execSync = require("child_process").execSync;
const path = require("path");
const { config } = require(path.resolve(
  process.cwd(),
  "dist/src/config/config.js"
));

const migrationPaths = {
  testing: "src/db/migrations/testing",
  local: "src/db/migrations/local",
  development: "src/db/migrations/development",
  staging: "src/db/migrations",
  production: "src/db/migrations",
};
const isSeed = process.argv[2] === "up";
const env = config.env;
const command = isSeed ? "db:migrate" : "db:migrate:undo:all";
const migrationPath = migrationPaths[env];
const migrationDistPath = `dist/${migrationPath}`;

const commands = [
  `rm -rf ./dist`,
  `tsc`,
  `sequelize ${command} --env ${env} --debug --migrations-path ${migrationDistPath}`,
];

const execCommands = (commands) => {
  commands.forEach((command) => {
    console.log("$ " + command);
    execSync(command, { stdio: "inherit" });
    console.log("\n> Done\n");
  });
};

execCommands(commands);
