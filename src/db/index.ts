import "module-alias/register";
import { database } from "@core/modules/database";

import { Address } from "./models/Addresses";
import { User } from "./models/Users";
import { Candidate } from "./models/Candidates";

const db = {
  Address: Address(database),
  User: User(database),
  Candidate: Candidate(database),
};

export type DbType = typeof db & {
  sequelize: typeof database;
};

Object.keys(db).forEach((modelName) => {
  const internalDb = db as DbType;
  //@ts-ignore
  if (internalDb[modelName].associate) {
    //@ts-ignore
    internalDb[modelName].associate(db);
  }
});

const exportDb: DbType = {
  ...db,
  sequelize: database,
};

export { exportDb as db };
