import { DbType } from "@core/db";
import { CacheClientCreateType } from "@core/cache";

export function isBot(isBot: boolean) {
  return isBot;
}

export async function checkIfUserRegstrated(account_id: number, db: DbType) {
  const t = await db.sequelize.transaction();
  try {
    const user = await db.User.findOne({
      where: {
        telegramId: account_id,
      },
      transaction: t,
    });

    if (!user) throw new Error("User doesnt exist");
    if (!user.passport) throw new Error("Passport doesnt exist");
    await t.commit();

    return user;
  } catch (e) {
    console.log("checkIfUserRegstrated:", e);
    await t.rollback();
    return false;
  }
}

export async function createToken({
  username,
  id,
  cache,
}: {
  username: string;
  id: number;
  cache: CacheClientCreateType;
}) {
  const token = `${Date.now()}${username}-${id}`;
  await cache.save({
    key: token,
    value: { userId: id },
  });
  return token;
}
