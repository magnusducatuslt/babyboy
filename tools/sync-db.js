const path = require("path");
const { db } = require(path.resolve(process.cwd(), "dist/src/db/index.js"));
const { parse } = require("dotenv");
const fs = require("fs");

const env = parse(fs.readFileSync(path.resolve(process.cwd(), `.env`)));

async function syncModelsWithDB(sequelize) {
  await sequelize.authenticate();
  await sequelize.sync();
  return;
}

if (
  env.NODE_ENV.match(/prod/gi) ||
  env.NODE_ENV.match(/stag/gi) ||
  env.NODE_ENV.match(/dev/gi)
) {
  console.log("Abort only for local env");
  process.exit(1);
}

syncModelsWithDB(db.sequelize)
  .then(() => {
    console.log("Sync was succefully");
    db.sequelize.close();
    process.exit();
  })
  .catch((e) => {
    console.log(e.message);
    db.sequelize.close();
    process.exit(1);
  });
