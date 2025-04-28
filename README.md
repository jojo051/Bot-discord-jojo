![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?logo=discord&logoColor=white)
![Epic Games](https://img.shields.io/badge/Epic%20Games-Free%20Games-black?logo=epicgames&logoColor=white)

# 🎮 Mon Bot Discord - Jeux gratuits & Modération

Bienvenue sur le dépôt GitHub de mon bot Discord développé en Node.js avec discord.js !

Ce bot propose plusieurs fonctionnalités :

    🎮 Annonce automatique des jeux gratuits disponibles chaque semaine sur l'Epic Games Store.

    🛡️ Commandes de modération de base comme !help, !ban, !kick.

    🛠️ Une architecture claire et modulaire pour faciliter les ajouts futurs.

    🍸 Génération de cocktails amusants.


## 🚀 Installation

Clonez le projet :

git clone https://github.com/votre-pseudo/mon-bot-discord.git
cd mon-bot-discord

Installez les dépendances :

npm install


## ⚙️ Configuration

Créez un fichier .env à la racine du projet :
```plaintext
TOKEN=VOTRE_TOKEN_DISCORD
ID_CHANNEL=ID_DU_CHANNEL_ANNONCE
````
Important :

  TOKEN ➔ votre token de bot Discord.

  ID_CHANNEL ➔ l'ID du salon où seront envoyées les annonces Epic Games.

  PORT ➔ port de la machine


## 📂 Structure du projet

```plaintext
mon-bot-discord/
├── commands/        # Commandes du bot (!help, !ban, !kick, cocktail, etc.)
│   ├── help.js
│   ├── ban.js
│   ├── kick.js
│   └── cocktail.js
│
├── functions/       # Fonctions spéciales (jeux gratuits Epic Games)
│   └── freeEpic.js
│
├── config/          # Configuration du projet
│   └── config.js
│
├── .env             # Variables d'environnement (non partagé sur GitHub)
├── .gitignore       # Fichiers/dossiers ignorés par Git
├── package.json     # Dépendances et scripts
├── README.md        # Ce fichier
└── index.js         # Point d'entrée du bot

```


## 📜 Commandes disponibles
Commande	Description
!help	Affiche la liste des commandes disponibles.
!ban	Banne un utilisateur (Permission modérateur requise).
!kick	Expulse un utilisateur (Permission modérateur requise).
!cocktail	Génère aléatoirement un cocktail avec sa recette et une image.


## 📅 Fonctionnalité Epic Games

Chaque semaine (le jeudi à 20h00), le bot :

  Récupère automatiquement la liste des jeux gratuits sur l'Epic Games Store.

  Publie un message formaté avec titre, image et description pour chaque jeu dans un salon Discord spécifique.
    

## 🛠️ Scripts

Lancer le bot localement :

npm start


## 🛡️ Licence

Ce projet est sous licence MIT.
Vous êtes libres de l'utiliser, modifier et partager sous les conditions de la licence.
    

## ✨ Auteur

Développé avec ❤️ par jojo51.