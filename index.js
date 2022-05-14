const { Telegraf } = require("telegraf");
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const Scene = require("telegraf/scenes/base");
const fetch = require("node-fetch");
const { writeFile } = require("fs");
const { promisify } = require("util");
const writeFilePromise = promisify(writeFile);
const path = require("path");
require("dotenv").config();
const { respondents } = require("./questions");

const { pgQuery } = require("./pgQuery");

const sceneGenerator = require("./scene");
const currentScene = new sceneGenerator();
const genderScene = currentScene.getGenderScene();
const ageScene = currentScene.getAgeScene();
const reasonScene = currentScene.getReasonScene();
const followerScene = currentScene.getFollowerScene();
const timeScene = currentScene.getTimeScene();
const attractionScene = currentScene.getAttractionScene();
const infoScene = currentScene.getInfoScene();
const addictionScene = currentScene.getAddictionScene();
const socialMediaScene = currentScene.getSocialMediaScene();
const useScene = currentScene.getUseScene();
const proposalScene = currentScene.getProposalScene();

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Stage();
stage.register(genderScene);
stage.register(ageScene);
stage.register(reasonScene);
stage.register(followerScene);
stage.register(timeScene);
stage.register(attractionScene);
stage.register(infoScene);
stage.register(addictionScene);
stage.register(socialMediaScene);
stage.register(useScene);
stage.register(proposalScene);

bot.use(session());
bot.use(stage.middleware());

const entryMessage = `
Anketa-so'rovnomasi
Hurmatli respondent axborotlashgan jamiyatning dolzarb masalalaridan biri bo'lgan milliy segment faoliyatiga oid sotsiologik tadqiqotda ishtirok etishga taklif etamiz. Ushbu tadqiqot faqat ilmiy maqsadlar yo'lida amalga oshirilayotganligini inobatga olib, sizdan anketa savollariga javob berishda xolisona fikrlaringizni bilishni xohlardik. Sizga mazkur tadqiqotda ishtirok etishga rozi bo'lganligingiz uchun minnatdorlik bildiramiz!
`;

bot.start(async (ctx) => {

  

  let chat_id = ctx.from.id;
  let users = await pgQuery("select user_id from users");
  if (users == 0) {
    bot.telegram.sendMessage(ctx.from.id, entryMessage, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🖐  boshlash", callback_data: "boshlash" }],
        ],
      },
    });
    const findUser = respondents.find((item) => item.chat_id === chat_id);
    if (!findUser) {
      respondents.push({
        chat_id,
      });
    }
  } else {
    let userExists = false;
    function user_bor() {
      for (let i = 0; i < users.length; i++) {
        if (users[i].user_id === chat_id.toString()) {
          userExists = true;
          return true;
        }
      }
    }
    if (!user_bor()) {
      bot.telegram.sendMessage(ctx.from.id, entryMessage, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🖐  boshlash", callback_data: "boshlash" }],
          ],
        },
      });
      const findUser = respondents.find((item) => item.chat_id === chat_id);

      if (!findUser) {
        respondents.push({
          chat_id,
        });
      }
    } else {
      ctx.reply("siz ushbu testdan o'tgansiz. E'tiboringiz uchun rahmat");
    }
  }
});

bot.action("boshlash", (ctx) => {
  ctx.scene.enter("gender");
});

bot.launch();
console.log("bot has been launched");
