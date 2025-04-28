🎮 Mon Bot Discord - Jeux gratuits & Modération

Bienvenue sur le dépôt GitHub de mon bot Discord développé en Node.js avec discord.js !

Ce bot propose plusieurs fonctionnalités :

    🎮 Annonce automatique des jeux gratuits disponibles chaque semaine sur l'Epic Games Store.

    🛡️ Commandes de modération de base comme !help, !ban, !kick.

    🛠️ Une architecture claire et modulaire pour faciliter les ajouts futurs.

🚀 Installation

Clonez le projet :

git clone https://github.com/votre-pseudo/mon-bot-discord.git
cd mon-bot-discord

Installez les dépendances :

npm install

⚙️ Configuration

Créez un fichier .env à la racine du projet :

TOKEN=VOTRE_TOKEN_DISCORD
ID_CHANNEL=ID_DU_CHANNEL_ANNONCE

Important :

    TOKEN ➔ votre token de bot Discord.

    ID_CHANNEL ➔ l'ID du salon où seront envoyées les annonces Epic Games.

📂 Structure du projet

mon-bot-discord/
├── commands/        # Commandes du bot (!help, !ban, !kick, etc.)
│   ├── help.js
│   ├── ban.js
│   └── kick.js
│
├── events/          # Gestion des événements Discord
│   ├── ready.js
│   └── messageCreate.js
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

📜 Commandes disponibles
Commande	Description
!help	Affiche la liste des commandes disponibles.
!ban	Banne un utilisateur (Permission modérateur requise).
!kick	Expulse un utilisateur (Permission modérateur requise).
📅 Fonctionnalité Epic Games

Chaque semaine (le jeudi à 17h00), le bot :

    Récupère automatiquement la liste des jeux gratuits sur l'Epic Games Store.

    Publie un message formaté avec titre, image et description pour chaque jeu dans un salon Discord spécifique.

🛠️ Scripts

Lancer le bot localement :

npm start

🌐 Hébergement

Pour héberger ce bot, plusieurs solutions :

    Sur un VPS (Linux recommandé : Ubuntu/Debian).

    Sur Railway.app, Render.com, ou autres plateformes de cloud gratuites.

    Docker (si besoin je peux fournir un Dockerfile simple).

🤝 Contribution

Les contributions sont les bienvenues !
N'hésitez pas à ouvrir une issue ou soumettre une pull request si vous avez des idées d'améliorations.
🛡️ Licence

Ce projet est sous licence MIT.
Vous êtes libres de l'utiliser, modifier et partager sous les conditions de la licence.
🔥 À venir

    Ajout d'un système d'administration avancé.

    Notifications personnalisables par serveur.

    Support Slash Commands (bientôt obligatoire sur Discord).

✨ Auteur

Développé avec ❤️ par jojo51.

Remarque

N'oubliez pas de garder votre fichier .env secret et de ne jamais pousser vos tokens sur GitHub.