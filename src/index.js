const {Client, Events, GatewayIntentBits} = require('discord.js');
const {token, guildID, whitelist, mode} = require('./../config.json');
const {DateTime} = require('luxon');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildWebhooks,
    ],
});
const currentTime = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
const webhooksCache = new Map();

function alignedConsoleLog(message, width) {
    const lines = message.split('\n');
    console.log(lines[0]);

    for (let i = 1; i < lines.length; i++) {
        const padding = ' '.repeat(Math.max(0, width - 1));
        console.log(padding + lines[i]);
    }
}

const sendReplacedURL = async (message, rm) => {
    try {
        if (message.channel.isThread() !== true) {
            const displayName = message.member.displayName;
            const avatarURL = message.author.avatarURL({dynamic: true});
            const webhook = await getWebhookInChannel(message.channel);
            webhook
                .send({
                    content: rm,
                    username: displayName,
                    avatarURL: avatarURL,
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            try {
                message.channel.send({
                    content: `[${currentTime}] og sender: ${message.member.displayName} (${message.author.id})\n${rm}`,
                    allowedMentions: {repliedUser: false},
                });
            } catch {
                console.log(
                    'an error has occurred! please contact to developer.\n' +
                    'error: cannot reply to thread.',
                );
            }
        }
    } catch {
        message.channel.send(
            'an error has occurred! please contact to developer.\n' +
            'error: unknown error 1.',
        );
    }

    message.delete(message);
};

async function getWebhookInChannel(channel) {
    return webhooksCache.get(channel.id) ?? (await getWebhook(channel));
}

async function getWebhook(channel) {
    const webhooks = await channel.fetchWebhooks();
    const webhook =
        webhooks.find((v) => v.token) ??
        (await channel.createWebhook({name: 'Twitter URL Replacer'}));
    if (webhook) webhooksCache.set(channel.id, webhook);
    return webhook;
}

client.once(Events.ClientReady, (c) => {
    console.log('--------------------');
    console.log(`Client ready!`);
    console.log(`Logged in as ${c.user.tag}!`);
    console.log('--------------------');
});

client.on(Events.MessageCreate, (message) => {
    if (whitelist && (!message.guild || !guildID.includes(message.guild.id))) {
        return;
    }

    if (message.author.bot) {
        return;
    }

    if (message.webhookId) {
        return;
    }

    if (
        message.content.match(
            /https:\/\/[x|twitter]*.com\/[a-zA-Z0-9_]*\/status\/[0-9]*/,
        )
    ) {
        try {
            if (mode === 'fx') {
                replacedUrl = 'fxtwitter.com';
            } else if (mode === 'vx') {
                replacedUrl = 'vxtwitter.com';
            }
            m = message.content.replace(/https:\/\/x.com/g, 'https://twitter.com');

            alignedConsoleLog(`[${currentTime}] Twitter URL found: ${m}`, 42);
            rm = m.replace(/twitter.com/g, replacedUrl);

            alignedConsoleLog(`[${currentTime}] Replaced to ${replacedUrl}: ${rm}`, 50);

            sendReplacedURL(message, rm);
            console.log(
                `[${currentTime}] Replied to ${message.author.tag} (${message.author.id})` +
                '\n',
            );
        } catch (error) {
            console.error(error);
            message.reply({
                content:
                    'an error has occurred! please contact to developer.\n' +
                    'unknown error 2.',
                allowedMentions: {repliedUser: false},
            });
        }
    }
});

client.login(token);
