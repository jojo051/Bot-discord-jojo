# Étape 1 : Utiliser une image officielle de Node.js
FROM node:20-alpine

# Étape 2 : Créer un répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le code de l'app
COPY . .

# Étape 6 : Spécifier la commande à exécuter pour lancer le bot
CMD ["npm", "start"]