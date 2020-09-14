import { Request, Response, NextFunction } from "express";
export async function userController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db, cache, log } = req;
  const t = await db.sequelize.transaction();

  try {
    const { id } = req.params;

    const token = await cache.get({ key: id });
    let parsedUserId = 0;

    if (token) {
      parsedUserId = +token.userId;
      const user = await db.User.findOne({
        where: {
          telegramId: parsedUserId,
        },
        transaction: t,
      });

      if (!user) {
        throw new Error(`userController: user doesnt exist ${id}`);
      }

      await t.commit();

      res.status(200).send(
        JSON.stringify({
          status: 0,
          message: {
            telegramId: user.telegramId ? true : false,
            wallet: user.wallet,
          },
        })
      );

      return;
    }
    throw new Error("token doesnt exist");
  } catch (e) {
    log.debug(`userController:`, e);
    await t.rollback();
    res
      .status(400)
      .send(JSON.stringify({ status: 1, message: "SAYONARA_BOY" }));
  }
}
