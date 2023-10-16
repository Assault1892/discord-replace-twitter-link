const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ]})

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

  if (message.content.includes("https://twitter.com/")) {
    var messageContent = message.content;
    var replacedMessage = messageContent.replace("https://twitter.com/", "https://fxtwitter.com/");
    message.channel.send(replacedMessage);
  }
} )

client.login(token);