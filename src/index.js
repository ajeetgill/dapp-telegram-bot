import dotenv from "dotenv";
import { Telegraf, Markup } from "telegraf";
import axios from "axios";
import path from "path";

// Load environment variables from .env file
dotenv.config();
const URL = process.env.WEB_APP_URL; // generated using ngrok
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const logoPath = path.join(__dirname, "../assets/logo.jpeg");
  ctx.replyWithPhoto({ source: logoPath });

  const username = ctx.message.from.username;
  let message = `
  Welcome, @${username}, to the world's first <b>licensed
  Telegram Casino</b> brought to you by google.com!
  💥 Ready to dive in? Simply click "Play now!" and
  immerse yourself in the <a href="google.com">Mega Dice experience</a> - a
  Fully Anonymous Crypto Casino.
  `;
  ctx.replyWithHTML(message);

  ctx.replyWithHTML(
    `🔥 Bonus Tip: If you haven't already, grab our
exclusive 200% deposit bonus. Hurry, it's available
for a LIMITED TIME ONLY! <a href="google.com">See terms and details 
here.</a>`,
    Markup.inlineKeyboard([
      Markup.button.callback("Launch Web App", "webapp"),
      Markup.button.callback("Get Git Details", "getGitDetails"),
    ])
  );
});

bot.command("web", (ctx) => {
  ctx.reply("URL  : " + URL);
  ctx.reply("🔥 Check Our website", {
    reply_markup: {
      inline_keyboard: [[Markup.button.webApp("Visit", URL)]],
    },
  });
});

// bot listens for '/git' command and then asks for github username, searchs the details and returns the details in a well formated html format
bot.command("git", (ctx) => {
  ctx.reply("Please enter a GitHub username:");
  bot.on("text", async (ctx) => {
    const username = ctx.message.text;
    // console.log(`Username: ${username}`);
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const { name, login, created_at, public_repos } = response.data;
      ctx.reply(
        `${name} : github@${login}
Since: ${created_at}
public repos: ${public_repos}`,
        Markup.inlineKeyboard([
          Markup.button.callback("Git Details", "getGitDetails"),
        ])
      );
    } catch (error) {
      ctx.reply("Error: User not found.");
    }
  });
});

bot.action("webapp", (ctx) => {
  ctx.reply("URL  : " + URL);
  ctx.reply("🔥 Check Our website", {
    reply_markup: {
      inline_keyboard: [[Markup.button.webApp("Visit", URL)]],
    },
  });
});
bot.action("getGitDetails", (ctx) => {
  ctx.reply("Please enter a GitHub username:");
  bot.on("text", async (ctx) => {
    // returns the telegram userid for the current user
    // const userid = ctx.message.from.id;
    try {
      // console.log(`ctx`);
      // console.log(ctx);
      const username = ctx.message.text;
      // console.log(`Second Username    : ${username}`);
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const { name, login, created_at, public_repos } = response.data;
      const created_at_formatted = new Date(created_at).toDateString();
      ctx.reply(
        `${name} : github@${login}
Since: ${created_at_formatted}
public repos: ${public_repos}`
      );
    } catch (error) {
      ctx.reply("Error: User not found.");
    }
  });
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
/**
 * USEFUL LINKS
 * https://github.com/topics/telegram-miniapp-contest-2023
 */
