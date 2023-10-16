const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
require ('date-utils');

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ]})
const date = new Date();
const currentTime = date.toFormat("YYYY/MM/DD HH24:MI:SS");

client.once(Events.ClientReady, c => {
  console.log("--------------------");
  console.log(`Client ready!`);
  console.log(`Logged in as ${c.user.tag}!`);
  console.log("--------------------");
});

client.on(Events.MessageCreate, message => {
  if (message.author.bot) {
    return;
  }

  if (message.content.startsWith("test")) {
    message.channel.send("aaa");
  }

  if (message.content.includes("https://twitter.com")) {

    m = message.content;
    rm = m.replace(/twitter.com/g, "fxtwitter.com");
    console.log(`[${currentTime}] Twitter URL found. Replaced to fxtwitter.com: ${rm}`);

    https://fxtwitter.com/SzlyNe_/status/1712654233160573425

    srm = rm.match(/https:\/\/fxtwitter.com\/[a-zA-Z_]*\/status\/[0-9]*/g);
    console.log(`[${currentTime}] Replaced Message preview: ${srm}`);

    tssrm = srm.toString();
    frtssrm = tssrm.replace(/,/g, "\n");

    // console.log(frtssrm);
    message.reply({content: "found twitter links! replaced urls:\n" + frtssrm, allowedMentions: { repliedUser: false }});
    console.log(`[${currentTime}] Replied to ${message.author.tag}`)

    // messageContent = message.content;
    // replacedMessage = messageContent.replace(/twitter.com/g, "fxtwitter.com");
    // message.channel.send(replacedMessage);
  }
} )

client.login(token);