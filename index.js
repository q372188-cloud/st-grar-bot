require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(
  process.env.BOT_TOKEN,
  { polling: true }
);

console.log('🚀 ST Decision Bot Started');

bot.sendMessage(
  process.env.ADMIN_CHAT_ID,
  '✅ ST Decision Bot Started'
).catch(() => {});

bot.on('message', async (msg) => {
  try {
    if (
      String(msg.chat.id) !==
      String(process.env.DECISION_GROUP_ID)
    ) return;

    console.log(
      'GROUP MESSAGE:',
      msg.text
    );
  } catch (err) {
    console.error(err.message);
  }
});
