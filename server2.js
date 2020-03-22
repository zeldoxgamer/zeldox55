const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
const dateFormat = require("dateformat");
const client = new Discord.Client();
const Canvas = require("canvas");
const canvas = require("canvas");
const prefix = "+";
const queue = require("queue");
//const token = 'BOT_TOKEN';
const token = "NTk3MDYxOTM0ODM1MzAyNDYx.XSCveA.mzt2bqEGj1-mYkEh0jkDCvVDji4";
const version = "1.1.2";
const r1 = require("node-fetch");
const antihack = JSON.parse(fs.readFileSync("./antihack.json", "utf8"));

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://starcodes.glitch.me/`);
}, 280000);

client.on("message", message => {
  if (message.content.startsWith(`${prefix}inv`)) {
    var embed = new Discord.RichEmbed()
      .setTitle(
        ">> ⚫ اضغط هنا لدعوة البوت " + `${client.user.username}` + " <<"
      )
      // .setURL("https://discordapp.com/oauth2/authorize?client_id=589217128473952289&permissions=8&scope=bot" + `${client.user.id}` + "&scope=bot&permissions=2080374975")
      .setURL(
        "https://discordapp.com/api/oauth2/authorize?client_id=597061934835302461&permissions=8&scope=bot"
      ) // + `${client.user.id}` +
      //     "&scope=boy&permissions=8")
      .setTimestamp()
      .setFooter(`Requested By | ${message.author.username}`)
      .setColor("RANDOM");
    message.channel.send(
      ":white_check_mark: | Check Your DM! تم الأرسال بلخاص"
    );
    message.author.send({ embed });
  }
});


client.on("ready", () => {
  client.user.setActivity(`${prefix}help | ${prefix}inv`, { type: "Watching" });
});

client.on("message", message => {
  if (message.content === `${prefix}bot`) {
    if (!message.channel.guild)
      return message.reply("** This command only for servers **");
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField("**عدد السيرفرات الي فيها البوت:**", client.guilds.size)
      .addField("**المستخدمين:**", client.users.size)
      .addField("**قنوات:**", client.channels.size)
      .setTimestamp();
    message.channel.sendEmbed(embed);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "emoji-add")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!args) return message.channel.send("**الاموجي `id` المرجوا كتابة **");
    if (args.length < "18" || args.length > "18" || isNaN(args))
      return message.channel.send(`**هدا الاموجي غير موجود❌**`);
    message.guild
      .createEmoji(`https://cdn.discordapp.com/emojis/${args}.png`, `${args}`)
      .catch(mstry => {
        return message.channel.send(`**هدا الاموجي غير موجود❌**`);
      });
    message.channel.send(`**تم اضافة الاموجي بنجاح✅**`);
  }
});



client.on("message", message => {
  if (message.content.startsWith(`${prefix}new`)) {
    /// Me Codes
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" "); /// Me Codes
    if (!message.guild.roles.exists("name", "Support Team"))
      return message.channel.send(
        `يجب انشاء رتبة بإٍسم : \`Support Team\` وتعطيها للبوت لكي يستطيع التعديل والانشاء `
      );
    if (
      message.guild.channels.exists(
        "name",
        "ticket-{message.author.id}" + message.author.id
      )
    )
      return message.channel.send(`You already have a ticket open.`); /// Me Codes

    var current = message.guild.channels.filter(c =>
      c.name.startsWith("ticket-")
    ).size;
    current++;
    var name = `ticket-${current}`;
    message.guild
      .createChannel(name, `text`)
      .then(c => {
        current = 1;

        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        }); /// ALPHA CODES
        c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: تم انشاء تذكرتك, <#${c.id}>.`);
        const embed = new Discord.RichEmbed()
          .setColor(0xcf40fa)
          .addField(
            `Hey ${message.author.username}!`,
            `**تم فتح تذكرة الرجاء انتظار الى حين يأتي مشرف ويقوم بلرد عليك**`
          )
          .setTimestamp();
        c.send({
          embed: embed
        });
      })
      .catch(console.error);
  }
  if (message.content.startsWith(prefix + "close")) {
    if (message.author.bot) return;
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send(`this command only for the tickets`);
    let close = new Discord.RichEmbed()
      .addField(`**اكتب close${prefix} مجددا للتأكيد**`, `** **`)
      .setColor("#36393e");
    message.channel.sendEmbed(close).then(m => {
      const filter = msg => msg.content.startsWith(prefix + "close");
      if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
        return;
      message.channel
        .awaitMessages(response => response.content === prefix + "close", {
          max: 1,
          time: 20000,
          errors: ["time"]
        })
        .then(collect => {
          message.channel.delete();
          let Reason = message.content
            .split(" ")
            .slice(1)
            .join(" ");
          if (!Reason) Reason = "NONE";
          let closee = new Discord.RichEmbed()
            .setColor(`BLUE`)
            .setAuthor(`تم اغلاق التيكت`)
            .setDescription(
              `Ticket : #${message.channel.name}
By : <@${message.author.id}>
Reason : ${Reason}`
            )
            .setTimestamp()
            .setThumbnail(
              `https://cdn.discordapp.com/attachments/584630360017469461/588033109178712074/563111850162520077.png`
            )
            .setFooter(message.author.tag);
          let log = message.guild.channels.find("name", "log");
          if (log) log.send(closee);
        })
        .catch(() => {
          m.delete()
            .then(message.channel.send("**تم اغلاق التيكت**"))
            .then(c => {
              c.delete(4000);
            });
        });
    });
  }
  if (message.content.startsWith(prefix + `close-all`)) {
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        `**Error** :octagonal_sign:\nI Don\'t have MANAGE_CHANNELS Permission`
      );
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply(
        "You don't have Permission **MANAGE_CHANNELS** to close all tickets"
      );
    message.guild.channels
      .filter(c => c.name.toLowerCase().startsWith("ticket-"))
      .forEach(channel => {
        channel.delete();
      });
    const ttt = new Discord.RichEmbed()
      .setColor("GREEN")
      .addField(
        `**Done all Tickets has been closed :white_check_mark:**`,
        `** **`
      );
    message.channel.send(ttt);
    let log = message.guild.channels.find("name", "log");
    const rr = new Discord.RichEmbed()
      .setColor("GREEN")
      .addField(
        `**تم مسح جميع التيكتات:white_check_mark:**`,
        `**by <@${message.author.id}>**`
      )
      .setThumbnail(
        `https://cdn.discordapp.com/attachments/584630360017469461/588151961279397898/582096914376425501.png`
      )
      .setTimestamp();
    if (log) return log.send(rr);
    //
  }
  if (message.content.startsWith(prefix + `add`)) {
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        `**Error** :octagonal_sign:\nI Don\'t have MANAGE_CHANNELS Permission to do this`
      );
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send(`this command only for the tickets`);
    let member = message.mentions.members.first();
    if (!member) return message.channel.send(`**المرجوا منشن الشخص :x:**`);
    if (
      message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    )
      return message.channel.send(
        `this member already in this ticket :rolling_eyes:`
      );
    message.channel.overwritePermissions(member.id, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true
    });
    message.channel.send(
      `**Done :white_check_mark:\nتم اضافته <@${member.user.id}> to the ticket**`
    );
    let tgt = new Discord.RichEmbed()
      .setColor(`GREEN`)
      .setAuthor(`تم اضافته الى التدكرة`)
      .setDescription(
        `Ticket : #${message.channel.name}
Member : ${member}
by : <@${message.author.id}>`
      )
      .setThumbnail(
        `https://cdn.discordapp.com/attachments/584630360017469461/588033109539160066/563111851165220885.png`
      )
      .setTimestamp();
    let log = message.guild.channels.find("name", "log");
    if (log) return log.send(tgt);
  }
  if (message.content.startsWith(prefix + `remove`)) {
    if (!message.channel.name.startsWith("ticket-")) {
      return message.channel.send(`this command only for the tickets`);
    }
    let member = message.mentions.members.first();
    if (!member || member.id === client.user.id) {
      return message.channel.send(`**Please mention the user :x:**`);
    }
    if (
      !message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    ) {
      return message.channel.send(
        `:x: **${member.user.tag}** is not in this ticket to remove them`
      );
    }
    message.channel.overwritePermissions(member.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false
    });
    message.channel.send(
      `**Done :white_check_mark:\nتم استبعاده \`${member.user.tag}\` from the ticket**`
    );
    let gtg = new Discord.RichEmbed()
      .setColor(`BLUE`)
      .setAuthor(`تم استبعاده من التدكرة`)
      .setDescription(
        `Ticket : #${message.channel.name}
Member : ${member}
by : <@${message.author.id}>`
      )
      .setThumbnail(
        `https://cdn.discordapp.com/attachments/584630360017469461/588033111212949555/563111852352077886.png`
      )
      .setTimestamp();
    let log = message.guild.channels.find("name", "log");
    if (log) return log.send(gtg);
  }
});


client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "clear")) {
    //Codes
    if (!message.channel.guild)
      return message.reply("⛔ | This Command For Servers Only!");
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "⛔ | You dont have **MANAGE_MESSAGES** Permission!"
      );
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "⛔ | I dont have **MANAGE_MESSAGES** Permission!"
      );
    let args = message.content.split(" ").slice(1);
    let messagecount = parseInt(args);
    if (args > 99)
      return message
        .reply("**🛑 || يجب ان يكون عدد المسح أقل من 100 .**")
        .then(messages => messages.delete(5000));
    if (!messagecount) args = "100";
    message.channel
      .fetchMessages({ limit: messagecount + 1 })
      .then(messages => message.channel.bulkDelete(messages));
    message.channel
      .send(`\`${args}\` : __عدد الرسائل التي تم مسحها __ `)
      .then(messages => messages.delete(5000));
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "server")) {
    // الامر
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return message.reply(`**هذه الخاصية للادارة فقط** ❎ `);
    if (!message.channel.guild) return message.reply(" ");
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const now = new Date();
    dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];
    const days = millis / 1000 / 60 / 60 / 24;
    let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
    var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField("**🆔 Server ID:**", message.guild.id, true)
      .addField(
        "**📅 Created On**",
        message.guild.createdAt.toLocaleString(),
        true
      )
      .addField(
        "**👑 Owned by**",
        `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`
      )
      .addField("**👥 Members**", `[${message.guild.memberCount}]`, true)
      .addField(
        "**💬 Channels **",
        `**${message.guild.channels.filter(m => m.type === "text").size}**` +
          " text | Voice  " +
          `**${message.guild.channels.filter(m => m.type === "voice").size}** `,
        true
      )
      .addField("**🌍 Others **", message.guild.region, true)
      .addField(
        "**🔐 Roles **",
        `**[${message.guild.roles.size}]** Role `,
        true
      )
      .setColor("#000000");
    message.channel.sendEmbed(embed);
  }
});

client.on("ready", () => {
  console.log("|===================================|");

  console.log(`|  Users Size ${client.users.size}  |`);

  console.log(`| Guilds Size ${client.guilds.size} |`);

  console.log(`|===================================|`);

  console.log(`| Created By <@429972030092476437> |`);

  console.log(`|===================================|`);

  console.log(`|       Star bot Log By You !       |`);

  console.log(`|===================================|`);
});

client.on("message", message => {
  if (message.content.startsWith(`${prefix}ping`)) {
    message.channel.send({
      embed: new Discord.RichEmbed()

        .setColor("RED")

        .addField(
          "**الذاكرة المستخدمة 💾**",
          `${(process.memoryUsage().rss / 1000000).toFixed()}MB`,
          true
        )

        .addField(
          "**سرعة الاتصال📡**",
          `${Date.now() - message.createdTimestamp}` + " ms"
        )

        .addField("**وقت الاقلاع⌚**", timeCon(process.uptime()), true)

        .addField(
          "**استخدام المعالج💿**",
          `${(process.cpuUsage().rss / 10000).toFixed()}%`,
          true
        )
    });
  }
});


client.on("message", message => {
  if (!message.channel.guild) return;

  if (message.content.startsWith(prefix + "bc")) {
    if (!message.channel.guild)
      return message.channel
        .send("**هذا الأمر فقط للسيرفرات**")
        .then(m => m.delete(5000));

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`");

    let args = message.content
      .split(" ")
      .join(" ")
      .slice(2 + prefix.length);

    let BcList = new Discord.RichEmbed()

      .setThumbnail(message.author.avatarURL)

      .setAuthor(`محتوى الرساله ${args}`)

      .setDescription(
        `برودكاست بـ امبد 📝\nبرودكاست بدون امبد✏ \nلديك دقيقه للأختيار قبل الغاء البرودكاست\nيمكنك اضافة اسم السيرفر في البرودكاست عن طريق كتابة <server>\nيمكنك اضافة اسم المرسل في البرودكاست عن طريق كتاية <by>\nيمكنك منشنة العضو في الرساله عن طريق كتابة <user>`
      );

    if (!args)
      return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
    message.channel.send(BcList).then(msg => {
      msg
        .react("📝")

        .then(() => msg.react("✏"))

        .then(() => msg.react("📝"));

      let EmbedBcFilter = (reaction, user) =>
        reaction.emoji.name === "📝" && user.id === message.author.id;

      let NormalBcFilter = (reaction, user) =>
        reaction.emoji.name === "✏" && user.id === message.author.id;

      let EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });

      let NormalBc = msg.createReactionCollector(NormalBcFilter, {
        time: 60000
      });

      EmbedBc.on("collect", r => {
        message.channel
          .send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`)
          .then(m => m.delete(5000));

        message.guild.members.forEach(m => {
          let EmbedRep = args
            .replace("<server>", message.guild.name)
            .replace("<user>", m)
            .replace(
              "<by>",
              `${message.author.username}#${message.author.discriminator}`
            );

          var bc = new Discord.RichEmbed()

            .setColor("RANDOM")

            .setDescription(EmbedRep)

            .setThumbnail(message.author.avatarURL);

          m.send({ embed: bc });

          msg.delete();
        });
      });

      NormalBc.on("collect", r => {
        message.channel
          .send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`)
          .then(m => m.delete(5000));

        message.guild.members.forEach(m => {
          let NormalRep = args
            .replace("<server>", message.guild.name)
            .replace("<user>", m)
            .replace(
              "<by>",
              `${message.author.username}#${message.author.discriminator}`
            );

          m.send(NormalRep);

          msg.delete();
        });
      });
    });
  }
});

client.on("message", message => {
  if (!message.guild) return;
  if (message.content.startsWith("رابط")) {
    message.channel
      .createInvite({
        thing: true,
        maxUses: 5,
        maxAge: 86400
      })
      .then(invite => message.author.sendMessage(invite.url));
    message.channel.send(`** تم أرسال الرابط برسالة خاصة **`);

    message.author.send(`**مدة الرابط : يـوم
 عدد استخدامات الرابط : 5 **`);
  }
});


client.login("");