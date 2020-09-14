import { Request, Response, NextFunction } from "express";
import { sendVotingPayments } from "@core/wallet";
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
    cache,
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
      throw new Error(
        `isAddressExist already exist
        ${isAddressExist.address}`
      );
    }
    const token = await cache.get({ key: id });

    if (!token) {
      throw new Error(`token doesnt exist`);
    }

    const user = await db.User.findOne({
      where: { telegramId: Number.parseInt(token.userId) },
      transaction: t,
    });

    if (!user) {
      throw new Error("user doesn't exist");
    }

    if (user.wallet) {
      throw new Error("user already has wallet");
    }

    await db.Address.create({ address, transaction: t });

    await user.update({ wallet: true, transaction: t });

    await sendVotingPayments(address);

    await cache.deleteKey({ key: id });

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
