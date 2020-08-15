const path = require("path");
const { Sequelize } = require("sequelize");

const { config } = require(path.resolve(
  process.cwd(),
  "dist/src/config/config.js"
));
const env = config.env;
const options = {
  host: config.postgres.config.domain,
  port: config.postgres.config.port,
  password: config.postgres.config.password,
  username: config.postgres.config.user,
  dialect: "postgres",
  logging: false,
};

const sequelize = new Sequelize(options);

async function bootstrapBD(instance, environment) {
  try {
    await instance.query(`CREATE DATABASE ${config.postgres.config.database}`);
    console.log(`database ${config.postgres.config.database} created`);
    return await instance.close();
  } catch (e) {
    console.log(e.message);
    await instance.close();
    process.exit(1);
  }
}

bootstrapBD(sequelize, env).then(() => {
  console.log("db fully created");
});
// docker exec -it knomary_develop_db_container sh pg_basebackup --format=tar -z -D ./backups/`date +%d-%m-%Y"_"%H_%M_%S` -P
// pg_basebackup -U user --format=tar -z -D ./backups/`date +%d-%m-%Y"_"%H_%M_%S` -P
// 13-07-2020_02_28_39
// tar -xvC /data/postgres -f /backups/13-07-2020_02_28_39/base.tar.gz
