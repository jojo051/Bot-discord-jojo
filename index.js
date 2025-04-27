require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const cron = require('node-cron');
const { getFreeEpicGames } = require('./functions/freeEpic');
const { EmbedBuilder } = require('discord.js');

const app = express();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});;

// Charger les routes Express
const statusRoute = require('./routes/status');
app.use('/', statusRoute);

// Charger les commandes Discord
client.commands = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);  
}

// Serveur Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur le port ${PORT}`);
});

// Bot Discord
client.once('ready', () => {
  console.log(`Bot Discord connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("Il y a eu une erreur en essayant d’exécuter cette commande.");
  }
});

// Planifier une tâche toutes les semaines (ex: tous les jeudis à 17h00)
const ID_CHANEL_BONPLAN = '1365999879733903410';
client.once('ready', () => {
  console.log(`Bot functionGameFreeEpic connecté en tant que ${client.user.tag}`);
  
  const channel = client.channels.cache.get(ID_CHANEL_BONPLAN);
  
  if (!channel) {
    console.error('❌ Channel non trouvé.');
  } else {
    console.log('✅ Channel trouvé.');

    // Ensuite ici tu mets ton cron
    cron.schedule('0 20 * * 4', async () => {
      console.log('🔔 Vérification des jeux gratuits Epic Games...');

      const freeGames = await getFreeEpicGames();
      console.log(1,freeGames);

      if (freeGames.length === 0) {
        channel.send('Aucun nouveau jeu gratuit trouvé cette semaine 😢');
      } else {
        const title = '**🎮 Jeux gratuits Epic Games cette semaine :**\n\n';
        channel.send(title)
        for (const game of freeGames) {
          const embed = new EmbedBuilder()
            .setTitle(game.title)
            .setImage(game.imgUrl)
            .setDescription(game.description);
            await channel.send({ embeds: [embed] });
        }
      }
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
