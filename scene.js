const path = require("path");
const Scene = require("telegraf/scenes/base");
const fetch = require("node-fetch");
const { writeFile } = require("fs");
const { promisify } = require("util");
const writeFilePromise = promisify(writeFile);
const { Telegraf } = require("telegraf");

const { respondents } = require("./questions");
let obj = {};

const { pgQuery } = require("./pgQuery");

const bot = new Telegraf(process.env.BOT_TOKEN);

const question1 = "1.Jinsingiz?"
const question2 = "2.Yoshingiz:"
const question3 = "3.Ijtimoiy tarmoqlarda ro'yxatdan o'tishingizda kim yoki nima sabab bo'lgan?";
const question4 = "4.  Ijtimoiy tarmoqlardagi obunachilaringiz soni qancha?";
const question5 = "5.  Bir kunda qancha vaqtingizni ijtimoiy tarmoqlarda o'tkazasiz?";
const question6 = "6.  Ijtimoiy tarmoqlar sizni nima bilan o'ziga jalb etadi?";
const question7 = "7.  Ijtimoiy tarmoqlarda qanaqa ma'lumotlarni joylashtirishingiz mumkin?";
const question8 = "8.  Qaysi milliy ijtimoiy tarmoqlarni bilasiz?";
const question9 = "9.  Asosan qaysi ijtimoiy tarmoqlardan foydalanasiz?";
const question10 = "10. Agar Milliy ijtimoiy tarmoqlar yoki messengerlar mavjud bo'lganida ulardan foydalanardingizmi?";
const question11 = "11. Qanaqa milliy ijtimoiy tarmoqlar yoki messenjerlar bo' lishini xoxlaysiz ? Takliflaringizni yuboring";

class sceneGenerator {
  getGenderScene() {
    const gender = new Scene("gender");
    gender.enter(async (ctx) => {
     
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.from.id, question1, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🙋🏻‍♂️ Erkak",
                callback_data: "question1_1",
              }
            ],
            [
              {
                text: "🙋🏼‍♀️ Ayol",
                callback_data: "question1_2",
              }
            ]
          ]
        },
      });
    });

    const question1Array = ["question1_1", "question1_2"];
    gender.action(question1Array, async (ctx) => {
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.gender = ctx.match;
      }

      await ctx.scene.leave("gender");
      ctx.scene.enter("age");
    });

    gender.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nTugmachalardan birini tanlang."
      );
    });
    return gender;
  }

  getAgeScene() {
    const age = new Scene("age");
    age.enter(async (ctx) => {
      
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.from.id, question2, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "18 dan kichik",
                callback_data: "question2_1",
              },
              {
                text: "18 - 25",
                callback_data: "question2_2",
              },
            ],
            [
              {
                text: "25-30",
                callback_data: "question2_3",
              },
              {
                text: "30 dan katta",
                callback_data: "question2_4",
              },
            ],
          ],
        },
      });
    });

    const question2Array = [
      "question2_1",
      "question2_2",
      "question2_3",
      "question2_4",
    ];
    age.action(question2Array, async (ctx) => {
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.age = ctx.match;
      }

      await ctx.scene.leave("age");
      ctx.scene.enter("reason");
    });

    age.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nTugmachalardan birini tanlang."
      );
    });
    return age;
  }

  getReasonScene() {
    const reason = new Scene("reason");
    reason.enter(async (ctx) => {
     
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.from.id, question3, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Do'stlarim",
                callback_data: "question3_1",
              },
              {
                text: "Qiziquvchanlik",
                callback_data: "question3_2",
              },
            ],
            [
              {
                text: "Yangi do'stlar orttirish xoxishi",
                callback_data: "question3_3",
              },
              {
                text: "Ko'pchilik foydalanayotganligi uchun",
                callback_data: "question3_4",
              },
            ],
          ],
        },
      });
    });

    const question3Array = [
      "question3_1",
      "question3_2",
      "question3_3",
      "question3_4",
    ];
    reason.action(question3Array, async (ctx) => {
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.reason = ctx.match;
      }

      await ctx.scene.leave("reason");
      ctx.scene.enter("follower");
    });

    reason.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nTugmachalardan birini tanlang."
      );
    });
    return reason;
  }

  getFollowerScene() {
    const follower = new Scene("follower");
    follower.enter(async (ctx) => {
      
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.from.id, question4, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "100 tadan kam",
                callback_data: "question4_1",
              },
              {
                text: "100 - 200",
                callback_data: "question4_2",
              },
            ],
            [
              {
                text: "200 - 500",
                callback_data: "question4_3",
              },
              {
                text: "500 - 1000",
                callback_data: "question4_4",
              },
            ],
            [
              {
                text: "1000 dan ko'p",
                callback_data: "question4_5",
              },
            ],
          ],
        },
      });
    });

    const question4Array = [
      "question4_1",
      "question4_2",
      "question4_3",
      "question4_4",
      "question4_5",
    ];
    follower.action(question4Array, async (ctx) => {
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.follower = ctx.match;
      }

      await ctx.scene.leave("follower");
      ctx.scene.enter("time");
    });

    follower.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nTugmachalardan birini tanlang."
      );
    });
    return follower;
  }

  getTimeScene() {
    const time = new Scene("time");
    time.enter(async (ctx) => {
      
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.from.id, question5, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "15 - 20 min",
                callback_data: "question5_1",
              },
              {
                text: "1 soatgacha",
                callback_data: "question5_2",
              },
            ],
            [
              {
                text: "1 soatdan 3 soatgacha",
                callback_data: "question5_3",
              },
              {
                text: "Hisoblamaganman",
                callback_data: "question5_4",
              },
            ],
          ],
        },
      });
    });

    const question5Array = [
      "question5_1",
      "question5_2",
      "question5_3",
      "question5_4",
    ];
    time.action(question5Array, async (ctx) => {
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.time = ctx.match;
      }

      await ctx.scene.leave("time");
      ctx.scene.enter("attraction");
    });

    time.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nTugmachalardan birini tanlang."
      );
    });
    return time;
  }

  getAttractionScene() {
    const attraction = new Scene("attraction");
    attraction.enter(async (ctx) => {
      
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.from.id, question6, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Do'stlar/qarindoshlar bilan muloqat",
                callback_data: "question6_1",
              },
            ],
            [
              {
                text: "Musiqa tinglash",
                callback_data: "question6_2",
              },
            ],
            [
              {
                text: "Video ko'rish",
                callback_data: "question6_3",
              },
              {
                text: "O'yinlar",
                callback_data: "question6_4",
              },
              {
                text: "Barchasi",
                callback_data: "question6_5",
              },
            ],
          ],
        },
      });
    });

    const question6Array = [
      "question6_1",
      "question6_2",
      "question6_3",
      "question6_4",
      "question6_5",
    ];
    attraction.action(question6Array, async (ctx) => {
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.attraction = ctx.match;
      }

      await ctx.scene.leave("attraction");
      ctx.scene.enter("info");
    });

    attraction.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nTugmachalardan birini tanlang."
      );
    });
    return attraction;
  }

  getInfoScene() {
    const info = new Scene("info");
    info.enter(async (ctx) => {
      
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.from.id, question7, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "FISH, rasm, o'qish/ish joyi",
                callback_data: "question7_1",
              },
            ],
            [
              {
                text: "O'zim haqimdagi barcha narsa(qiziqishlarim, sevimli filmlar, kitoblar va h.k.)",
                callback_data: "question7_2",
              },
            ],
            [
              {
                text: "Faqat eng zarurlarini",
                callback_data: "question7_3",
              },
            ],
          ],
        },
      });
    });

    const question7Array = ["question7_1", "question7_2", "question7_3"];
    info.action(question7Array, async (ctx) => {
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.info = ctx.match;
      }

      await ctx.scene.leave("info");
      ctx.scene.enter("addiction");
    });

    info.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nTugmachalardan birini tanlang."
      );
    });
    return info;
  }

  getAddictionScene() {
    const addiction = new Scene("addiction");
    addiction.enter(async (ctx) => {
      
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.from.id, question8, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Muloqot.uz",
                callback_data: "question8_1",
              },
              {
                text: "Davra.uz",
                callback_data: "question8_2",
              },
            ],
            [
              {
                text: "Boshqalari",
                callback_data: "question8_3",
              },
              {
                text: "Bilmas ekanman",
                callback_data: "question8_4",
              },
            ],
          ],
        },
      });
    });

    const question8Array = ["question8_1", "question8_2", "question8_3", "question8_4"];
    addiction.action(question8Array, async (ctx) => {
    
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.addiction = ctx.match;
      }

      await ctx.scene.leave("addiction");
      ctx.scene.enter("socialMedia");
    });

    addiction.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nTugmachalardan birini tanlang."
      );
    });
    return addiction;
  }

  getSocialMediaScene() {
    const socialMedia = new Scene("socialMedia");
    socialMedia.enter(async (ctx) => {
      
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.from.id, question9, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Tik Tok",
                callback_data: "question9_1",
              },
              {
                text: "Instagram",
                callback_data: "question9_2",
              },
            ],
            [
              {
                text: "Telegram",
                callback_data: "question9_3",
              },
              {
                text: "Facebook",
                callback_data: "question9_4",
              },
            ],
            [
              {
                text: "Youtube",
                callback_data: "question9_5",
              },
              {
                text: "Boshqa",
                callback_data: "question9_6",
              },
            ],
          ],
        },
      });
    });

    const question9Array = [
      "question9_1",
      "question9_2",
      "question9_3",
      "question9_4",
      "question9_5",
      "question9_6",
    ];
    socialMedia.action(question9Array, async (ctx) => {
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.socialMedia = ctx.match;
      }

      await ctx.scene.leave("socialMedia");
      ctx.scene.enter("use");
    });

    socialMedia.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nTugmachalardan birini tanlang."
      );
    });
    return socialMedia;
  }

  getUseScene() {
    const use = new Scene("use");
    use.enter(async (ctx) => {
      
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.from.id, question10, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Ha",
                callback_data: "question10_1",
              },
              {
                text: "Yo'q",
                callback_data: "question10_2",
              },
            ],
            [
              {
                text: "Ha, agar yaxshi bo'lsa",
                callback_data: "question10_3",
              },
              {
                text: "Sinab ko'raman",
                callback_data: "question10_4",
              },
            ],
          ],
        },
      });
    });

    const question10Array = [
      "question10_1",
      "question10_2",
      "question10_3",
      "question10_4",
    ];
    use.action(question10Array, async (ctx) => {
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.use = ctx.match;
      }

      await ctx.scene.leave("use");
      ctx.scene.enter("proposal");
    });

    use.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nTugmachalardan birini tanlang."
      );
    });
    return use;
  }

  getProposalScene() {
    const proposal = new Scene("proposal");
    proposal.enter(async (ctx) => {
      
      ctx.answerCbQuery();
      ctx.telegram.sendMessage(ctx.chat.id, question11);
    });

    proposal.on("text", async (ctx) => {
      const findUser = respondents.find((item) => item.chat_id === ctx.chat.id);
      if (findUser) {
        findUser.proposal = ctx.message.text;
      }

      findUser.first_name = ctx.from.first_name;
      findUser.user_name = ctx.from.username;

      await pgQuery(
        "insert into users(user_id, first_name, user_name, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11)values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
        findUser.chat_id,
        findUser.first_name,
        findUser.user_name,
        findUser.gender,
        findUser.age,
        findUser.reason,
        findUser.follower,
        findUser.time,
        findUser.attraction,
        findUser.info,
        findUser.addiction,
        findUser.socialMedia,
        findUser.use,
        findUser.proposal
      );

      const userPhotos = await bot.telegram.getUserProfilePhotos(ctx.chat.id);
      if (userPhotos.total_count !== 0) {
        const photosArray = userPhotos.photos[0];
        let photoFile_id = photosArray[0].file_id;
        // ctx.replyWithPhoto(photoFile_id);
        const gotFile = await bot.telegram.getFile(photoFile_id);
    
        const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${gotFile.file_path}`;
        // const filename = path.basename(url);
        const extname = path.extname(url);
        const imgname = ctx.chat.id + extname;
        let outputpath = path.join("imgs", imgname);
        function downloadFile(url, outputPath) {
          return fetch(url)
            .then((x) => x.arrayBuffer())
            .then((x) => writeFilePromise(outputPath, Buffer.from(x)));
        }
        downloadFile(url, outputpath);
        await pgQuery(
          "insert into images(image_name, image_path, image_ref_to_user)values($1, $2, $3);",
          imgname,
          outputpath,
          ctx.chat.id
        );
      } else {
        console.log("rasm yoq");
      }

      const deleteUserIndex = respondents.indexOf(findUser);
      respondents.splice(deleteUserIndex);

      await ctx.reply("ushbu so'rovnomada qatnashganingiz uchun tashakkur");
      await ctx.scene.leave("proposal");
    });

    proposal.on("message", (ctx) => {
      ctx.reply(
        "Noto'g'ri ma'lumot kiritdingiz\nIltimos takliflaringizni matn ko'rinishida kiriting."
      );
    });
    return proposal;
  }
}
module.exports = sceneGenerator;
