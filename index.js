const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

const ID_PISANKO = '1567570405512839301';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

http.createServer((req, res) => res.end('Bot dziala!')).listen(10000);

client.on('ready', () => {
  console.log(`ZALOGOWANO JAKO ${client.user.tag} - ID PISANKO: ${ID_PISANKO}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  // Tylko na kanale pisanko
  if (message.channel.id !== ID_PISANKO) return;

  console.log(`WYKRYTO WIADOMOSC NA PISANKO od ${message.author.tag}`);

  // USUWA WSZYSTKO CO MA OBRAZEK / LINK
  const maObraz = message.attachments.size > 0 || message.embeds.length > 0 || message.content.includes('http');

  if (maObraz) {
    try {
      await message.delete();
      console.log(`USUNIETO!`);
    } catch (e) {
      console.error(`BLAD PERMISJI - DAJ BOTU ADMINA! ${e.message}`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
