const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "cocktail",
  description: "Cocktail du jour",
  async execute(message) {
    const URL_COCKTAIL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    try {
      const response = await fetch(URL_COCKTAIL);
      const data = await response.json();
      const drink = data.drinks[0];

      const cocktailName = drink.strDrink;
      const cocktailImg = drink.strDrinkThumb;

      // Récupération des ingrédients non null
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        if (ingredient) ingredients.push(ingredient);
      }

      const embed = new EmbedBuilder()
        .setTitle(cocktailName)
        .setImage(cocktailImg)
        .setDescription(`**Ingrédients :**\n - ${ingredients.join("\n - ")}`)
        .setColor(0xFFA500);

      message.channel.send({ embeds: [embed] });

    } catch (err) {
      console.error("Erreur lors de la récupération du cocktail :", err);
      message.channel.send("🥲 Impossible de récupérer un cocktail pour l’instant.");
    }
  },
};