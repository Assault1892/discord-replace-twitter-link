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
                    content: `[${currentTime}] ${message.member.displayName}: \n${rm}`,
                    allowedMentions: {repliedUser: false},
                });
            } catch {
                console.log(
                    'エラーが発生しました！スレッドには返信できません...！'
                );
            }
        }
    } catch {
        message.channel.send(
            'エラーが発生しました！開発者に連絡してください！\n' +
            'メッセージの送信に失敗しました。権限が足りないかも？',
        );
    }

    try { message.delete(message); } 
        catch(error) {  console.log(error);
                        message.channel.send(
                            'エラーが発生しました！\n' +
                            'メッセージの削除に失敗しました。権限が足りないか、既に同じBotが動いているかも？',)}
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
                    'エラーが発生しました！メッセージの送信に失敗しました。\n' +
                    '権限が足りないか、もしかしたら不明なエラーかもしれません。開発者に連絡してください！',
                allowedMentions: {repliedUser: false},
            });
        }
    }
});

client.login(token);
