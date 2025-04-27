module.exports = {
  name: 'ban',
  description: 'Bannir un membre du serveur',
  async execute(message, args) {
    if (!message.member.permissions.has('BanMembers')) {
      return message.reply("Tu n'as pas la permission de bannir !");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("Merci de mentionner un membre à bannir.");

    try {
      await member.ban();
      message.channel.send(`${member.user.tag} a été banni 👋`);
    } catch (error) {
      console.error(error);
      message.reply("Je n'ai pas pu bannir ce membre.");
    }
  },
};