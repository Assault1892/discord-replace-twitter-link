const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { DateTime } = require('luxon');

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ]})
const currentTime = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");

function alignedConsoleLog(message, width) {
  const lines = message.split('\n');
  console.log(lines[0]);

  for (let i = 1; i < lines.length; i++) {
      const padding = ' '.repeat(Math.max(0, width - 1));
      console.log(padding + lines[i]);
  }
}

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

  if (message.content.match( /https\:\/\/[x|twitter]*.com/ )) {
    try {
    m = message.content.replace(/https:\/\/x.com/g, "https://twitter.com");

    // console.log(`[${currentTime}] Twitter URL found: ${m}`)
    alignedConsoleLog(`[${currentTime}] Twitter URL found: ${m}`, 42);
    rm = m.replace(/twitter.com/g, "fxtwitter.com");
    // console.log(`[${currentTime}] Replaced to fxtwitter.com: ${rm}`);
    alignedConsoleLog(`[${currentTime}] Replaced to fxtwitter.com: ${rm}`, 50);
    srm = rm.match(/https:\/\/fxtwitter.com\/[a-zA-Z0-9_]*\/status\/[0-9]*/g);
    // console.log(`[${currentTime}] Replaced links: ${srm}`);

    tssrm = srm.toString();
    frtssrm = tssrm.replace(/,/g, "\n");
    alignedConsoleLog(`[${currentTime}] Replaced links preview: ${frtssrm}`, 47);

    message.reply({content: "found Twitter link(s)! replaced urls...:\n" + frtssrm, allowedMentions: { repliedUser: false }});
    console.log(`[${currentTime}] Replied to ${message.author.tag} (${message.author.id})` + "\n");
    } catch (error) {
      console.error(error);
      message.reply({content: "an error has occured! please contact to developer.", allowedMentions: { repliedUser: false }});
    }
  }

} )

client.login(token);