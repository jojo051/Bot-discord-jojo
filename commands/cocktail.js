let cocktail = "";
let cocktailImg = "";
let ingredientLists = [];

const fetchDataCoctail = async () =>{
	const URL_COKCKTAIL =
			"https://www.thecocktaildb.com/api/json/v1/1/random.php";
	const response =  await fetch(URL_COKCKTAIL);
	const dataCocktail =await response.json();
	const cocktails = dataCocktail.drinks[0];

	cocktail = cocktails.strDrink;

	cocktailImg = cocktails.strDrinkThumb;
	ingredientLists = []
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
	)
}
fetchDataCoctail()

const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "cocktail",
	description: "Cocktail du jour",
	execute(message) {
		const embed = new EmbedBuilder()
			.setTitle(cocktail)
			.setImage(cocktailImg)
			.setDescription(`Ingredients: \n - ${ingredientLists.filter((ingredient) => ingredient !== null).join(" \n - ")}`);

		message.channel.send({ embeds: [embed] });
	},
};
