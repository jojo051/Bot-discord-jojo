const cron = require("node-cron");

let cocktail = "";
let cocktailImg = "";
const ingredientLists = [];

const dataCocktail = async () => {
	try {
		cron.schedule("15 * * * *", async () => {
			const URL_COKCKTAIL =
				"https://www.thecocktaildb.com/api/json/v1/1/random.php";
			const response = await fetch(URL_COKCKTAIL);
			const dataCocktail = await response.json();
			const cocktails = dataCocktail.drinks[0];

			cocktail = cocktails.strDrink;

			cocktailImg = cocktails.strDrinkThumb;

			ingredientLists.push(
				cocktails.strIngredient1,
				cocktails.strIngredient2,
				cocktails.strIngredient3,
				cocktails.strIngredient4,
				cocktails.strIngredient5,
				cocktails.strIngredient6,
				cocktails.strIngredient7,
				cocktails.strIngredient8,
				cocktails.strIngredient9,
				cocktails.strIngredient10,
				cocktails.strIngredient11,
				cocktails.strIngredient12,
				cocktails.strIngredient13,
				cocktails.strIngredient14,
				cocktails.strIngredient15,
			);
		});
	} catch (error) {
		console.error("Error Fetching cocktail:", error);
	}
};

dataCocktail();

const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "cocktail",
	description: "Cocktail du jour",
	execute(message) {
		const imageUrl = cocktailImg;
		const description = `Ingredients: ${ingredientLists.filter((ingredient) => ingredient !== null).join(" ")}`;
		const embed = new EmbedBuilder()
			.setTitle(cocktail)
			.setImage(imageUrl)
			.setDescription(description);

		message.channel.send({ embeds: [embed] });
	},
};
