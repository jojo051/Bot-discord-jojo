require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const fs = require("node:fs");

const path = require("node:path");
const cron = require("node-cron");

const { getFreeEpicGames } = require("./functions/freeEpic");
const { CHANNEL_IDS } = require("./config/config");
const { EmbedBuilder } = require("discord.js");

const app = express();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// Charger les routes Express
const statusRoute = require("./routes/status");
app.use("/", statusRoute);

// Charger les commandes Discord
client.commands = new Map();

const commandFiles = fs
	.readdirSync(path.join(__dirname, "commands"))
	.filter((file) => file.endsWith(".js"));

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
client.once("ready", () => {
	console.log(`Bot Discord connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
	if (!message.content.startsWith("!") || message.author.bot) return;

	const args = message.content.slice(1).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName);

	if (!command) return;

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply(
			"Il y a eu une erreur en essayant d’exécuter cette commande.",
		);
	}
});

// Planifier une tâche toutes les semaines sur plusieur channel (ex: tous les jeudis à 19h00)
client.once("ready", () => {
	console.log(`Bot connecté freeEpic en tant que ${client.user.tag}`);

	cron.schedule("* 18 * * 4", async () => {
		console.log("🔔 Vérification des jeux gratuits Epic Games...");

		const freeGames = await getFreeEpicGames();

		if (freeGames.length === 0) {
			const noGameEmbed = new EmbedBuilder()
				.setColor(0xff0000)
				.setTitle("Aucun jeu gratuit cette semaine")
				.setDescription("😢 Reviens la semaine prochaine !");
			
			for (const id of CHANNEL_IDS) {
				try {
					const channel = await client.channels.fetch(id);
					if (channel?.isTextBased()) {
						await channel.send({ embeds: [noGameEmbed] });
						console.log(`✅ Message envoyé dans #${channel.name}`);
					}
				} catch (err) {
					console.error(`❌ Erreur pour le channel ${id}:`, err);
				}
			}
			return;
		}

		for (const id of CHANNEL_IDS) {
			try {
				const channel = await client.channels.fetch(id);
				if (!channel?.isTextBased()) {
					console.warn(`⚠️ Channel non textuel ou introuvable: ${id}`);
					continue;
				}
				let message = "";
				message = "**🎮 Jeux gratuits Epic Games cette semaine :**\n\n";
				channel.send(message);
				for (const game of freeGames) {
					const embed = new EmbedBuilder()
						.setColor(0x00bfff)
						.setTitle(game.title)
						.setURL(game.url)
						.setDescription(game.description || "Pas de description fournie.")
						.setImage(game.imgUrl || null)
						.setFooter({ text: "Offert par Epic Games" });

					await channel.send({ embeds: [embed] });
				}

				console.log(`✅ Embeds envoyés dans #${channel.name}`);
			} catch (err) {
				console.error(`❌ Erreur pour le channel ${id}:`, err);
			}
		}
	});
});

client.login(process.env.DISCORD_TOKEN);