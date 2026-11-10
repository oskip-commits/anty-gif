const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Serwer dla Rendera żeby nie usypiał
http.createServer((req, res) => res.end('Bot dziala!')).listen(10000);

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  console.log(`Wiadomosc od ${message.author.tag}: ${message.content} | zalaczniki: ${message.attachments.size}`);

  const content = message.content.toLowerCase();
  const hasGif = content.includes('.gif') || content.includes('tenor.com') || content.includes('giphy.com') || content.includes('cdn.discordapp.com/attachments') && content.includes('.gif');

  if (hasGif) {
    console.log('-> WYKRYTO GIFA, USUWAM!');
    console.log(`-> Deletable: ${message.deletable} Admin: ${message.guild.members.me.permissions.has('Administrator')}`);
    try {
      await message.delete();
      console.log('-> SUKCES!');
    } catch (err) {
      console.error(`-> BŁĄD: ${err.message} KOD: ${err.code}`);
      console.error(err);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
