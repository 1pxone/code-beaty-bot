const Telegraf = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

const bot = new Telegraf(BOT_TOKEN);

bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);

bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);

const formatJson = (message) => {
    try {
        return JSON.stringify(JSON.parse(message.text.replace('/json ', '')), null, 4);
    } catch (e) {
        return 'Invalid code';
    }
};

bot.command('/json', ({ reply, message }) => {
    reply(formatJson(message));
});

bot.command('/start', ({ reply }) => {
    reply('Hi there!🤖 My name is Cody.\nI would like to format your code.\nType /help for more info. ');
});

bot.command('/help', ({ reply }) => {
    reply('Type /json command to format json');
});

bot.on('message', ({ reply, message }) => reply(formatJson(message)));
