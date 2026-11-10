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

client.on('ready', () => console.log(`ZALOGOWANO JAKO ${client.user.tag}`));

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  // Tylko na kanale #pisanko
  if (message.channel.name !== 'pisanko') return;

  let isImage = false;

  // 1. Zalaczniki - jpg, png, gif, webp
  if (message.attachments.size > 0) isImage = true;
  
  // 2. Linki do obrazkow / gifow
  const c = message.content.toLowerCase();
  if (c.includes('http') && (c.includes('.gif') || c.includes('.jpg') || c.includes('.png') || c.includes('tenor.com') || c.includes('giphy.com') || c.includes('cdn.discordapp.com'))) {
    isImage = true;
  }
  // 3. Embedy (jak ktos wkleja link a Discord robi podglad)
  if (message.embeds.length > 0) {
     message.embeds.forEach(e => { if (e.image || e.thumbnail) isImage = true; });
  }

  if (isImage) {
    console.log(`USUWAM MEM OD ${message.author.tag}`);
    try {
      await message.delete();
    } catch (err) {
      console.error(`BLAD: ${err.message}`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
