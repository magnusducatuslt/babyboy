import { TelegrafContext } from "telegraf/typings/context";
import { Telegraf, Extra } from "telegraf";
import { savePassportData } from "./passport";
import { walletAction } from "./wallet";
import { firstScene } from "./services";
import { DbType } from "@core/db";
import Logger from "bunyan";
import { CacheClientCreateType } from "@core/cache";
import { createToken } from "./telegram.validation";
import { URL_CREATE_WALLET } from "./constants";
export async function telegramController(
  db: DbType,
  log: Logger,
  bot: Telegraf<TelegrafContext>,
  cache: CacheClientCreateType
) {
  try {
    bot.on("new_chat_members", (ctx) => ctx.reply("hello"));
    bot.on("passport_data", async (ctx) => {
      try {
        //@ts-ignore
        const { from, passportData } = ctx;
        //@ts-ignore
        await savePassportData({ from, passportData, log, db });
        const token = await createToken({
          id: from!.id,
          username: from!.username as string,
          cache,
        });

        return ctx.reply(`${URL_CREATE_WALLET}/${token}`);
      } catch (e) {
        log.debug("telegramController:", e);
        return ctx.reply(`telegramController: ${e.message}`);
      }
    });
    firstScene({ bot, db });
    walletAction({ bot, cache, db });
    bot.launch();
  } catch (e) {
    log.debug("telegramController:", e);
    return;
  }
}
