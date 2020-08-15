import { Sequelize } from "sequelize";
import { config } from "@core/config";

export const database = new Sequelize({
  database: config.postgres.config.database,
  host: config.postgres.config.domain,
  port: config.postgres.config.port,
  password: config.postgres.config.password,
  username: config.postgres.config.user,
  dialect: "postgres",
  logging: false,
});
