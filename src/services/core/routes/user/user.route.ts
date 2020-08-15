import { Request, Response, NextFunction } from "express";
export async function userController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db, log } = req;
  const t = await db.sequelize.transaction();

  try {
    const { id } = req.params;

    const user = await db.User.findOne({
      where: {
        telegramId: id,
      },
      transaction: t,
    });

    if (!user) {
      log.debug("userController: user doesnt exist", id);

      await t.commit();

      res
        .status(401)
        .send(JSON.stringify({ status: 1, message: "USER_DOESNT_EXIT" }));
      return;
    }

    await t.commit();

    res.status(200).send(
      JSON.stringify({
        status: 0,
        message: { telegramId: user.telegramId, wallet: user.wallet },
      })
    );

    return;
  } catch (e) {
    log.debug(`userController:`, e);
    await t.rollback();
    res
      .status(400)
      .send(JSON.stringify({ status: 1, message: "SAYONARA_BOY" }));
  }
}
