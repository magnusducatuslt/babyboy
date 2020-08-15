import { Request, Response, NextFunction } from "express";
export async function votedController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db, log } = req;
  const t = await db.sequelize.transaction();
  try {
    const { address, tx }: { address: string; tx: string } = req.body;

    await db.Address.update(
      {
        tx,
      },
      {
        where: {
          address,
        },
        transaction: t,
      }
    );

    await t.commit();

    res.status(200).send(JSON.stringify({ status: 0, message: "TX_SAVED" }));

    return;
  } catch (e) {
    log.debug(`telegramController:`, e);
    await t.rollback();
    res
      .status(400)
      .send(JSON.stringify({ status: 1, message: "SAYONARA_BOY" }));
  }
}
