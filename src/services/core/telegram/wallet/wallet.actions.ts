import { TelegrafContext } from "telegraf/typings/context";
import { Telegraf, Extra } from "telegraf";
import { CacheClientCreateType } from "@core/cache";
import { checkIfUserRegstrated } from "../telegram.validation";
import { DbType } from "@core/db";
import {
  INIT_REGISTRATION,
  INIT_VOTING,
  RETURN_TO_FIRST_SCENE,
  URL_CREATE_WALLET,
  URL_VOTING,
  URL_REGISTRATION,
  CREATE_WALLET,
} from "../constants";
import { createToken } from "../telegram.validation";
export function walletAction({
  bot,
  cache,
  db,
}: {
  bot: Telegraf<TelegrafContext>;
  cache: CacheClientCreateType;
  db: DbType;
}) {
  // bot.action((ctx) => {
  //   ctx.replyWithHTML(
  //     `<b>Создать кошелек?</b>
  //         `,
  //     Extra.HTML().markup((m: any) => {
  //       return m.inlineKeyboard([m.callbackButton("Да", CREATE_WALLET)]);
  //     })
  //   );
  // });
  bot.action(CREATE_WALLET, async (ctx) => {
    if (!ctx.from) return ctx.reply("CREATE_WALLET: from undefined");
    const user = await checkIfUserRegstrated(ctx.from.id, db);
    if (user) {
      if (user.wallet) {
        return ctx.replyWithHTML(
          `<b>У вас уже был создан кошелек</b>
              `,
          Extra.HTML().markup((m: any) => {
            return m.inlineKeyboard([
              m.callbackButton("Назад", RETURN_TO_FIRST_SCENE),
            ]);
          })
        );
      } else {
        const token = await createToken({
          id: ctx.from.id,
          username: ctx.from.username!,
          cache,
        });
        return ctx.reply(`${URL_CREATE_WALLET}/${token}`);
      }
    }
    return ctx.replyWithHTML(
      `<b>Зарегестрируйтесь</b>
            `,
      Extra.HTML().markup((m: any) => {
        return m.inlineKeyboard([
          m.callbackButton("Зарегистрируйтесь", INIT_REGISTRATION),
        ]);
      })
    );
  });
}
