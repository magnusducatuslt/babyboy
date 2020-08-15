import { Request, Response, NextFunction } from "express";
import { SHA512, AES } from "crypto-js";
// credentials_secret_hash = SHA512(credentials_secret + credentials_hash);
// credentials_key = slice(credentials_secret_hash, 0, 32);
// credentials_iv = slice(credentials_secret_hash, 32, 16);
export async function addressController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    db,
    log,
    body: { token, address },
  } = req;
  try {
    if (address) {
    }
    // const cached = await cache.get({ key: token });
    // if (cached) {
    //   await db.Address.create({
    //     address,
    //   });
    //   await cache.deleteKey({ key: token });

    //   res
    //     .status(200)
    //     .send(JSON.stringify({ status: 0, message: "ADDRESS_SAVED" }));
    //   return;
    // }
    res
      .status(403)
      .send(JSON.stringify({ status: 1, message: "SAYONARA_BOY" }));
    return;
  } catch (e) {
    log.debug(`addressController:`, e);
    res
      .status(400)
      .send(JSON.stringify({ status: 1, message: "SAYONARA_BOY" }));
  }
}
