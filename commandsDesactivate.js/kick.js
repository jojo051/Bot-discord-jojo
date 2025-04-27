module.exports = {
  name: 'kick',
  description: 'Expulser un membre du serveur',
  async execute(message, args) {
    if (!message.member.permissions.has('KickMembers')) {
      return message.reply("Tu n'as pas la permission d'expulser !");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("Merci de mentionner un membre à expulser.");

    try {
      await member.kick();
      message.channel.send(`${member.user.tag} a été expulsé 🦶`);
    } catch (error) {
      console.error(error);
      message.reply("Je n'ai pas pu expulser ce membre.");
    }
  },
};