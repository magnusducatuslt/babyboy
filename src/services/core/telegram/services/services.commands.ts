import { TelegrafContext } from "telegraf/typings/context";
import { Telegraf, Extra } from "telegraf";
import { DbType } from "@core/db";
import { checkIfUserRegstrated } from "../telegram.validation";
import {
  INIT_REGISTRATION,
  INIT_VOTING,
  RETURN_TO_FIRST_SCENE,
  URL_CREATE_WALLET,
  CREATE_WALLET,
  URL_VOTING,
  URL_REGISTRATION,
} from "../constants";

export function walletCommands({ bot }: { bot: Telegraf<TelegrafContext> }) {}

export function firstScene({
  bot,
  db,
}: {
  bot: Telegraf<TelegrafContext>;
  db: DbType;
}) {
  const showFirstScene = (ctx: any) => {
    ctx.replyWithHTML(
      `<b>Что делаем?</b>
          `,
      Extra.HTML().markup((m: any) => {
        return m.inlineKeyboard([
          // m.callbackButton("Проголосовать", INIT_VOTING),
          m.callbackButton("Зарегистрироваться", INIT_REGISTRATION),
        ]);
      })
    );
  };

  bot.start(showFirstScene);
  bot.action(RETURN_TO_FIRST_SCENE, showFirstScene);
  bot.action(INIT_VOTING, async (ctx) => {
    if (ctx.from) {
      const user = await checkIfUserRegstrated(ctx.from.id, db);
      if (!user) {
        return ctx.replyWithHTML(
          `<b>Вы не зарегестрировованы</b>
            `,
          Extra.HTML().markup((m: any) => {
            return m.inlineKeyboard([
              m.callbackButton("Зарегистрироваться", INIT_REGISTRATION),
            ]);
          })
        );
      }
      if (!user.wallet) {
        return ctx.replyWithHTML(
          `<b>Создайте кошелек</b>
            `,
          Extra.HTML().markup((m: any) => {
            return m.inlineKeyboard([
              m.callbackButton("Создать кошелек", CREATE_WALLET),
            ]);
          })
        );
      } else {
        return ctx.reply(URL_VOTING);
      }
    }
    return ctx.reply(`service: INIT_VOTING from undefined`);
  });

  bot.action(INIT_REGISTRATION, async (ctx) => {
    if (ctx.from) {
      const user = await checkIfUserRegstrated(ctx.from.id, db);
      if (user) {
        if (user.wallet) {
          return ctx.replyWithHTML(
            `<b>Вы уже были зарегестрировованы и ваш кошелек уже был создан</b>
              `,
            Extra.HTML().markup((m: any) => {
              return m.inlineKeyboard([
                m.callbackButton("Назад", RETURN_TO_FIRST_SCENE),
              ]);
            })
          );
        } else {
          return ctx.replyWithHTML(
            `<b>Вы уже были зарегистрированы</b>
              `,
            Extra.HTML().markup((m: any) => {
              return m.inlineKeyboard([
                m.callbackButton("Создать кошелек", CREATE_WALLET),
                m.callbackButton("Назад", RETURN_TO_FIRST_SCENE),
              ]);
            })
          );
        }
      }
      return ctx.reply(URL_REGISTRATION);
    }
    return ctx.reply(`service: INIT_REGISTRATION from undefined`);
  });
}
