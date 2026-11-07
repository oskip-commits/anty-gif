const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');
http.createServer((req, res) => res.end('Bot is alive!')).listen(process.env.PORT || 3000);
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('ready', () => console.log(`✅ ${client.user.tag} ONLINE`));

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  console.log(`Wiadomość od ${msg.author.tag}: ${msg.content} | załączniki: ${msg.attachments.size}`);
  
  const text = msg.content.toLowerCase();
  const isGif = text.includes('.gif') || text.includes('tenor') || text.includes('giphy') || msg.attachments.some(a => 
    a.name.toLowerCase().includes('.gif') || 
    (a.contentType && a.contentType.includes('gif'))
  );

  if (isGif) {
    console.log('-> WYKRYTO GIFA, USUWAM!');
    try {
      await msg.delete();
      const m = await msg.channel.send(`${msg.author} ❌ gify zakazane!`);
      setTimeout(() => m.delete().catch(()=>{}), 4000);
    } catch (e) {
      console.log('BŁĄD KASOWANIA:', e.message);
    }
  }
});

    client.login(process.env.TOKEN);
