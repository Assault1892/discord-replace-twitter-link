const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds ]})

client.once(Events.ClientReady, c => {
  console.log("--------------------");
  console.log(`Client ready!`);
  console.log(`Logged in as ${c.user.tag}!`);
  console.log("--------------------");
});

client.login(token);