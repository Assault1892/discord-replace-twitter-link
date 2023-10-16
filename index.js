const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
// require ('date-utils');

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ]})
// const date = new Date();
// const currentTime = date.toFormat("YYYY/MM/DD HH24:MI:SS");
const currentTime = "temporally disabled";

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

  if (message.content.includes("https://twitter.com"|"https://x.com")) {

    m = message.content.replace(/https:\/\/x.com/g, "https://twitter.com");
    console.log(`[${currentTime}] Twitter URL found: ${m}`)
    rm = m.replace(/twitter.com/g, "fxtwitter.com");
    console.log(`[${currentTime}] Replaced to fxtwitter.com: ${rm}`);
    srm = rm.match(/https:\/\/fxtwitter.com\/[a-zA-Z0-9_]*\/status\/[0-9]*/g);
    console.log(`[${currentTime}] Replaced Message preview: ${srm}`);

    tssrm = srm.toString();
    frtssrm = tssrm.replace(/,/g, "\n");

    message.reply({content: "found Twitter link(s)! replaced urls...:\n" + frtssrm, allowedMentions: { repliedUser: false }});
    console.log(`[${currentTime}] Replied to ${message.author.tag}`)
  }

  // if (message.content.includes("https://x.com")) {

  //   xm = message.content;
  //   console.log(`[${currentTime}] X URL found: ${xm}`)
  //   rxm = xm.replace(/x.com/g, "fixupx.com");
  //   console.log(`[${currentTime}] Replaced to fixupx.com: ${rxm}`);
  //   srxm = rxm.match(/https:\/\/fixupx.com\/[a-zA-Z0-9_]*\/status\/[0-9]*/g);
  //   console.log(`[${currentTime}] Replaced Message preview: ${srxm}`);

  //   tssxrm = srxm.toString();
  //   frtssxrm = tssxrm.replace(/,/g, "\n");

  //   message.reply({content: "found X link(s)! replaced urls...:\n" + frtssxrm, allowedMentions: { repliedUser: false }});
  //   console.log(`[${currentTime}] Replied to ${message.author.tag}`)
  // }

} )

client.login(token);