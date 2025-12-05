import { Telegraf, Markup } from "telegraf";
import { message } from "telegraf/filters";
import dotenv from "dotenv";
dotenv.config();

const bot = new Telegraf(process.env.TOKEN);
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
