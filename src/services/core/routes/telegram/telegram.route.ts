import { Request, Response, NextFunction } from "express";
import fs from "fs";
import TelegramPassport from "telegram-passport";
import { TelegramParams, TelegramDataDecrypted } from "@core/models";
import sequelize from "sequelize";
import { isResident, islegallyСapable } from "./telegram.validation";
export async function telegramController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db, log } = req;
  const t = await db.sequelize.transaction();
  try {
    const {
      body: { message },
    }: TelegramParams = req;

    if (!message.passport_data) {
      log.debug("telegramController: not passport_data");

      await t.commit();

      res.status(200).send();
      return;
    }

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
    }: TelegramDataDecrypted = passportInstance.decrypt(message.passport_data);

    if (!isResident(country_code)) {
      log.debug("telegramController: user not a resident");

      await t.commit();
      res
        .status(200)
        .send(JSON.stringify({ status: 1, message: "USER_NOT_A_RESIDENT" }));
      return;
    }

    if (!islegallyСapable(birth_date)) {
      log.debug("telegramController: user not a full aged");
      res
        .status(200)
        .send(JSON.stringify({ status: 1, message: "USER_NOT_FULLY_AGED" }));
      return;
    }

    const user = await db.User.findOne({
      where: {
        [sequelize.Op.or]: [
          { passport: Buffer.from(document_no).toString("base64") },
          { telegramId: message.from.id },
        ],
      },
      transaction: t,
    });

    if (user) {
      log.debug("telegramController: user already exist");
      await t.commit();
      res
        .status(200)
        .send(JSON.stringify({ status: 1, message: "USER_ALREADY_EXIST" }));
      return;
    }

    await db.User.create({
      telegramId: message.from.id,
      passport: Buffer.from(document_no).toString("base64"),
      transaction: t,
    });

    await t.commit();

    res
      .status(200)
      .send(JSON.stringify({ status: 0, message: "USER_CREATED" }));
    return;
  } catch (e) {
    log.debug(`telegramController:`, e);
    await t.rollback();
    res
      .status(200)
      .send(JSON.stringify({ status: 1, message: "SAYONARA_BOY" }));
  }
}
