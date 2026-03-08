# WHO THE MOST VALUABLE

Site Web de comparaison de statistiques pour Overwatch. Permet d'analyser et de comparer les performances de deux joueurs en temps réel sur une interface à trois panneaux.

<img width="1919" height="1026" alt="image" src="https://github.com/user-attachments/assets/7d84ce7c-f24c-4f90-b72b-b45fcd6346ca" />

## Fonctionnalités

* **Analyse Battletags** : Comparaison simultanée de deux Battletags.
* **Sélection de Héros** : Grilles interactives avec portraits officiels pour filtrer par personnage.
* **Système de Scoring** : Algorithme calculant la valeur réelle du joueur selon le rôle et le héros choisi.
* **Gestion Multi-Plateforme** : Switch indépendant PC / Console pour chaque joueur.
* **Alertes & guide** : Système de détection de profil privé avec instructions de déblocage intégrées.

## Installation

1. Cloner le dépôt
git clone https://github.com/AnisseElBezazi/Who_The_Most_Valuable_Overwatch/
cd Who_The_Most_Valuable_Overwatch

2. Installer les dépendances
npm install
(si erreur lié à bootstrap)
npm install bootstrap

4. Lancer le serveur
npm run dev

## Configuration Requise (En Jeu)

Pour que l'application puisse lire les statistiques, le profil doit être configuré en Public dans les options d'Overwatch :
Menu > Options > Social > Visibilité du profil > Public

Note : L'actualisation des données par Blizzard sur ses serveurs web peut prendre plusieurs heures ou jours.

## API

Données récupérées via l'API Overfast (scraping des profils officiels Blizzard).
