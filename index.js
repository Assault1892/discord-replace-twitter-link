const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { DateTime } = require('luxon');

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildWebhooks ]})
const currentTime = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
const webhooksCache = new Map();

function alignedConsoleLog(message, width) {
  const lines = message.split('\n');
  console.log(lines[0]);

  for (let i = 1; i < lines.length; i++) {
      const padding = ' '.repeat(Math.max(0, width - 1));
      console.log(padding + lines[i]);
  }
}

async function sendReplacedURL(message, rm) {
  
  try {
  if (message.channel.isThread() != true) {
    const dispName = message.member.displayName;
    const avatarURL = message.author.avatarURL({ dynamic: true });
    const webhook = await getWebhookInChannel(message.channel);
    webhook.send({
      content: rm,
      username: dispName,
      avatarURL: avatarURL
    }).catch (error => {
      console.log(error);
    });
  } else {
      try {
        message.reply({content: `[${currentTime}] og sender: ${message.member.displayName} (${message.author.id})\n${rm}`, allowedMentions: { repliedUser: false }})
        } catch {
          console.log("an error has occured! please contact to developer.\n" + "error: cannot reply to thread.");
        }
  } } catch {
    message.channel.send("an error has occured! please contact to developer.\n" + "error: unknown error 1.");
  }

  message.delete(message);

}

async function getWebhookInChannel(channel) {
  const webhook = webhooksCache.get(channel.id) ?? await getWebhook(channel);
  return webhook;
}

async function getWebhook(channel) {
  const webhooks = await channel.fetchWebhooks();
  const webhook = webhooks.find( (v) => v.token ) ?? await channel.createWebhook({ name: "Twitter URL Replacer" });
  if (webhook) webhooksCache.set(channel.id, webhook);
  return webhook;
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

  if (message.webhookId) {
    return;
  }

  if (message.content.match( /https\:\/\/[x|twitter]*.com\/[a-zA-Z0-9_]*\/status\/[0-9]*/ )) {
    try {
    m = message.content.replace(/https:\/\/x.com/g, "https://twitter.com");

    // console.log(`[${currentTime}] Twitter URL found: ${m}`)
    alignedConsoleLog(`[${currentTime}] Twitter URL found: ${m}`, 42);
    rm = m.replace(/twitter.com/g, "fxtwitter.com");
    // console.log(`[${currentTime}] Replaced to fxtwitter.com: ${rm}`);
    alignedConsoleLog(`[${currentTime}] Replaced to fxtwitter.com: ${rm}`, 50);

    // srm = rm.match(/https:\/\/fxtwitter.com\/[a-zA-Z0-9_]*\/status\/[0-9]*/g);
    // alignedConsoleLog(`[${currentTime}] Replaced links: ${srm}`, 50);
    // tssrm = srm.toString();
    // frtssrm = tssrm.replace(/,/g, "\n");
    // alignedConsoleLog(`[${currentTime}] Replaced links preview: ${frtssrm}`, 47);
    // message.reply({content: "found Twitter link(s)! replaced urls...:\n" + frtssrm, allowedMentions: { repliedUser: false }});

    sendReplacedURL(message, rm);
    console.log(`[${currentTime}] Replied to ${message.author.tag} (${message.author.id})` + "\n");

    } catch (error) {
      console.error(error);
      message.reply({content: "an error has occured! please contact to developer.\n" + "unknown error 2.", allowedMentions: { repliedUser: false }});
    }
  }

} )

client.login(token);