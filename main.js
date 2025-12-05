import { Telegraf, Markup } from "telegraf";
import { message } from "telegraf/filters";

const TOKEN = "8432228006:AAEHR4dk_UvTcasqrjYqDT4P9pGRVFp_0Eo";
const bot = new Telegraf(TOKEN);
const webAppUrl = "https://angular-tg-app-54aa7.web.app";

bot.command("start", (ctx) => {
  ctx.reply(
    "Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение",
    Markup.keyboard([
      Markup.button.webApp("Отправить сообщение", webAppUrl + "/feedback"),
    ])
  );
});

bot.on(message("web_app_data"), async (ctx) => {
  const data = ctx.webAppData.data.json();
  ctx.reply(`Ваше сообщение: ${data?.feedback}` ?? "empty message");
});

bot.launch();
