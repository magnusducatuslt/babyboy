import { DbType } from "db";
import Logger from "bunyan";
import { CacheClientCreateType } from "@core/cache";

export type RegistrationParams = {
  db: DbType;
  log: Logger;
  body: RegistrationBodyParams;
  cache: CacheClientCreateType;
};

export type RegistrationBodyParams = {
  id: string;
  address: string;
};
