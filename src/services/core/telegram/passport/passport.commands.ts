import { Request, Response, NextFunction } from "express";
import fs from "fs";
import TelegramPassport from "telegram-passport";
import {
  TelegramFromParams,
  TelegramDataDecrypted,
  TelegramPassportData,
} from "@core/models";
import sequelize from "sequelize";
import { isResident, islegallyСapable } from "./passport.validations";
import { DbType } from "@core/db";
import Logger from "bunyan";

export async function savePassportData({
  db,
  passportData,
  from,
  log,
}: {
  passportData: TelegramPassportData;
  from: TelegramFromParams;
  db: DbType;
  log: Logger;
}) {
  const t = await db.sequelize.transaction();
  try {
    const privateKey = fs.readFileSync("./private1.key");

    const pem = privateKey.toString();

    const passportInstance = new TelegramPassport(pem);

    const {
      passport: {
        data: { document_no },
      },
      personal_details: {
        data: { country_code, birth_date },
      },
    }: TelegramDataDecrypted = passportInstance.decrypt(passportData);

    if (!isResident(country_code)) {
      log.debug("savePassportData: user not a resident");
      throw new Error("user not a resident");
    }

    if (await !islegallyСapable(birth_date)) {
      log.debug("savePassportData: user not a full aged");
      throw new Error("user not a full aged");
    }

    const user = await db.User.findOne({
      where: {
        [sequelize.Op.or]: [
          { passport: Buffer.from(document_no).toString("base64") },
          { telegramId: from.id },
        ],
      },
      transaction: t,
    });

    if (user) {
      log.debug("savePassportData: user already exist");
      throw new Error("user already exist");
    }

    await db.User.create({
      telegramId: from.id,
      passport: Buffer.from(document_no).toString("base64"),
      transaction: t,
    });

    await t.commit();

    return;
  } catch (e) {
    log.debug(`savePassportData:`, e);
    await t.rollback();
    throw e;
  }
}
