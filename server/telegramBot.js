import TelegramBot from 'node-telegram-bot-api'
import User from './models/userModel.js'

const bots = {} // Xotirada botlarni saqlash

// ✅ Bot yaratish va saqlash
const createBot = async telegramToken => {
  if (bots[telegramToken]) {
    return bots[telegramToken] // Agar bot allaqachon mavjud bo‘lsa, qaytaramiz
  }

  const bot = new TelegramBot(telegramToken, { polling: true })

  bot.on('message', async msg => {
    const chatId = msg.chat.id
    const text = msg.text

    if (text === '/start') {
      await bot.sendMessage(chatId, 'Flowers platformasiga xush kelibsiz.')

      await bot.sendMessage(chatId, 'Buket zakat qilishdan oldin telefon raqamingizni jo‘nating:', {
        reply_markup: {
          keyboard: [[{ text: "📲 Kontaktni jo'natish", request_contact: true }]],
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      })
    }

    if (msg.contact) {
      await bot.sendMessage(
        msg.chat.id,
        `✅ Raqamingiz qabul qilindi: ${msg.contact.phone_number}. Buketlarni ko'rish knopkasini bosib buketlarni ko'rishingiz mumkin`,
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "Buketlarni ko'rish",
                  web_app: { url: 'https://web-telegram-bot-rho.vercel.app' },
                },
              ],
            ],
            resize_keyboard: true,
          },
        }
      )
    }
  })

  bots[telegramToken] = bot
  console.log(`🚀 Bot ishga tushdi: ${telegramToken}`.green.bold)

  // ✅ Tokenni database'ga saqlaymiz
  await User.findOneAndUpdate({ telegramToken }, { telegramToken }, { upsert: true })

  return bot
}

// 🔄 **Server qayta ishga tushganda barcha botlarni tiklash**
export const restoreBots = async () => {
  const tokens = await User.find({ role: 'client', telegramToken: { $exists: true } })
  tokens.forEach(({ telegramToken }) => {
    if (!bots[telegramToken]) createBot(telegramToken)
  })

  Object.keys(bots).forEach(telegramToken => {
    if (!tokens.find(t => t.telegramToken === telegramToken)) {
      bots[telegramToken].stopPolling()
      delete bots[telegramToken]
      console.log(`🛑 Bot to'xtatildi: ${telegramToken}`.red.bold)
    }
  })
}
