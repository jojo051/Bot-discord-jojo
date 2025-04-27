module.exports = {
  name: 'help',
  description: 'Affiche toutes les commandes disponibles',
  execute(message, args, client) {
    const commandList = Array.from(client.commands.values())
      .map(cmd => `\`${cmd.name}\` : ${cmd.description}`)
      .join('\n');

    const helpMessage = `Voici la liste de mes commandes disponibles:\n\n${commandList}`;

    message.reply(helpMessage);
  },
};