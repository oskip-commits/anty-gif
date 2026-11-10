const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const app = express();
app.get('/', (req, res) => res.send('Bot dziala!'));
app.listen(10000);

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  console.log(`Wiadomosc od ${message.author.tag}: ${message.content} | zalaczniki: ${message.attachments.size}`);

  const content = message.content.toLowerCase();
  const hasGif = content.includes('.gif') || content.includes('tenor.com') || content.includes('giphy.com') || message.attachments.some(a => a.url.includes('.gif'));

  if (hasGif) {
    console.log('-> WYKRYTO GIFA, USUWAM!');
    console.log(`-> Czy moge usunac? deletable=${message.deletable} | moje permisje=${message.guild.members.me.permissions.has('Administrator')}`);

    try {
      await message.delete();
      console.log('-> SUKCES! Usunieto!');
    } catch (err) {
      console.error(`-> BŁĄD KRYTYCZNY: ${err.message}`);
      console.error(`-> KOD: ${err.code} | STATUS: ${err.status}`);
      console.error(err);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
