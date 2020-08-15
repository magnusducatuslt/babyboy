import { DbType } from "db";
import Logger from "bunyan";

export type RegistrationParams = {
  db: DbType;
  log: Logger;
  body: RegistrationBodyParams;
};

export type RegistrationBodyParams = {
  id: string;
  address: string;
};
