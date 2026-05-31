require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(
  process.env.BOT_TOKEN,
  {
    polling: {
      interval: 300,
      autoStart: true,
      params: {
        timeout: 10
      }
    }
  }
);

const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
const DECISION_GROUP_ID = process.env.DECISION_GROUP_ID;

console.log('🚀 ST Decision Bot Started');
console.log('ADMIN_CHAT_ID:', ADMIN_CHAT_ID);
console.log('DECISION_GROUP_ID:', DECISION_GROUP_ID);

bot.sendMessage(
  ADMIN_CHAT_ID,
  '✅ ST Decision Bot Started'
).catch(err => {
  console.error('START MESSAGE ERROR:', err.message);
});

bot.on('message', async (msg) => {
  try {
    console.log('━━━━━━━━━━━━━━');
    console.log('ANY MESSAGE RECEIVED');
    console.log('chat.id:', msg.chat?.id);
    console.log('chat.type:', msg.chat?.type);
    console.log('from.id:', msg.from?.id);
    console.log('from.is_bot:', msg.from?.is_bot);
    console.log('text:', msg.text || '[NO TEXT]');

    if (
      String(msg.chat?.id) !==
      String(DECISION_GROUP_ID)
    ) {
      console.log('IGNORED CHAT:', msg.chat?.id);
      return;
    }

    console.log('✅ DECISION GROUP MESSAGE:', msg.text || '[NO TEXT]');

    if (msg.text === '/ping') {
      await bot.sendMessage(
        msg.chat.id,
        '✅ البوت يقرأ رسائل المجموعة بنجاح'
      );
    }
  } catch (err) {
    console.error('MESSAGE ERROR:', err.message);
  }
});

bot.on('polling_error', (err) => {
  console.error('POLLING ERROR:', err.message);
});
