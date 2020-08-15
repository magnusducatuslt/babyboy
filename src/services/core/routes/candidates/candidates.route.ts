import { Request, Response, NextFunction } from "express";
export async function candidatesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db, log } = req;
  try {
    const candidates = await db.Candidate.findAll();
    res.status(200).send(JSON.stringify({ status: 0, message: candidates }));
    return;
  } catch (e) {
    log.debug(`addressController:`, e);
    res
      .status(400)
      .send(JSON.stringify({ status: 1, message: "SAYONARA_BOY" }));
  }
}
