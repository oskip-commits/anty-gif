const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

http.createServer((req, res) => res.end('Bot dziala!')).listen(10000);

client.on('ready', () => {
  console.log(`ZALOGOWANO JAKO ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  console.log(`--- Nowa wiadomosc od ${message.author.tag}: ${message.content}`);
  
  // Sprawdzamy wszystko co moze byc gifem
  let isGif = false;
  const content = message.content.toLowerCase();

  if (content.includes('.gif') || content.includes('tenor.com') || content.includes('giphy.com')) {
    isGif = true;
  }
  // Zalaczniki np. gdy ktos wysle plik .gif z kompa
  if (message.attachments.size > 0) {
    message.attachments.forEach(att => {
      if (att.name.toLowerCase().endsWith('.gif') || att.contentType?.includes('gif')) {
        isGif = true;
      }
    });
  }

  if (isGif) {
    console.log('>>> WYKRYTO GIFA, PROBUJE USUNAC!');
    try {
      await message.delete();
      console.log('>>> SUKCES - USUNIETO!');
    } catch (err) {
      console.error(`>>> BŁĄD USUWANIA: ${err.message} KOD: ${err.code}`);
      console.log(`>>> Czy mam permisje? Deletable: ${message.deletable}`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
