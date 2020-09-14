// import { TelegrafContext } from "telegraf/typings/context";
// import { Telegraf, Extra } from "telegraf";
// export function walletCommands({ bot }: { bot: Telegraf<TelegrafContext> }) {}

// const URL_CREATE_WALLET = "http://localhost:3000/create";
// const CREATE_WALLET = "CREATE_WALLET";

// export function requestLinkForCreateWallet({
//   bot,
// }: {
//   bot: Telegraf<TelegrafContext>;
// }) {
//   // bot.action((ctx) => {
//   //   ctx.replyWithHTML(
//   //     `<b>Создать кошелек?</b>
//   //         `,
//   //     Extra.HTML().markup((m: any) => {
//   //       return m.inlineKeyboard([m.callbackButton("Да", CREATE_WALLET)]);
//   //     })
//   //   );
//   // });
//   bot.action(CREATE_WALLET, (ctx) => {
//     console.log(ctx.from);
//     ctx.reply(URL_CREATE_WALLET);
//   });
// }
