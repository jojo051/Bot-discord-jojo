const axios = require('axios');

// Fonction pour récupérer les jeux gratuits
async function getFreeEpicGames() {
  try {
    
    const response = await axios.get('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=fr-FR&country=FR&allowCountries=FR');
    
    const games = response.data.data.Catalog.searchStore.elements;
    
    const freeGames = games.filter(game => 
      game.promotions && game.promotions.promotionalOffers.length > 0
    );
    
    return freeGames.map(game => ({
      title: game.title,
      imgUrl: game.keyImages[0].url,
      description	: game.description
    }));
    
  } catch (error) {
    console.error('Erreur en récupérant les jeux gratuits:', error);
    return [];
  }
}
getFreeEpicGames()
// IMPORTANT : exporter la fonction pour l'utiliser ailleurs
module.exports = {
  getFreeEpicGames
};