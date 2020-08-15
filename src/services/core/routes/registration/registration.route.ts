import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { RegistrationParams } from "@core/models";
export async function registrationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    db,
    log,
    body: { id, address },
  }: RegistrationParams = req;
  const t = await db.sequelize.transaction();
  try {
    const isAddressExist = await db.Address.findOne({
      where: {
        address,
      },
      transaction: t,
    });

    if (isAddressExist) {
      log.debug("isAddressExist already exist", isAddressExist.address);

      await t.commit();

      res.status(403).send(
        JSON.stringify({
          status: 1,
          message: "USER_OR_ADDRESS_ALREADY_EXIST",
        })
      );
      return;
    }
    const user = await db.User.findOne({
      where: { telegramId: Number.parseInt(id) },
      transaction: t,
    });

    if (!user) {
      log.debug("user doesn't exist");

      await t.commit();

      res.status(401).send(
        JSON.stringify({
          status: 1,
          message: "USER_DOESN'T_EXIST",
        })
      );
      return;
    }
    if (user.wallet) {
      log.debug("user already has wallet");

      await t.commit();

      res.status(401).send(
        JSON.stringify({
          status: 1,
          message: "USER_ALREADY_HAVE_WALLET",
        })
      );
      return;
    }
    await db.Address.create({ address, transaction: t });

    await user.update({ wallet: true, transaction: t });

    await t.commit();

    res
      .status(200)
      .send(JSON.stringify({ status: 0, message: `ADDRESS_REGISTRATED` }));
    return;
  } catch (e) {
    log.debug(`registrationController:`, e);
    await t.rollback();
    res
      .status(400)
      .send(JSON.stringify({ status: 1, message: "SAYONARA_BOY" }));
  }
}
