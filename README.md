# AWI
<img src="https://github.com/Salim-Azh/AWI/blob/main/front/src/public/img/logo_FDJ_FINAL_800.png" align="right"
     alt="Logo Festival du Jeu" width="320" height="200">
## Festival du Jeu de Montpellier

### MERN STACK - Javascript full-stack
#### MongoDB/Express/React/NodeJS
**Liens du site :** https://olympiade-des-jeux.herokuapp.com/

### Contexte
Depuis 2015, l’organisation du Festival du Jeu de Montpellier est soutenue par un collectif d’associations. Dans le cadre de la formation IG4 à l'école Polytech Montpellier,
nous avons réalisé une application web pour la gestion des festivals et le suivi des réservations. Nous aussi développé une application mobile pour consulter les jeux et les exposants et les éditeurs présent au festival. Lien repository de l'application mobile :  https://github.com/Riko38nano/MobileApp

### Setup - Back-end
* Installer les dépendances : `npm i`
* Connexion MongoDB cluster dans `/config/db.js`
* Créer un fichier `.env` dans `/config/` initialisez les variables d'environnement:
   - PORT = `port d'écoute du serveur`
   - DB = `chaîne de connexion au cluster MongoDB`
   - TOKEN_SECRET = `clé secrète`
* Lancer le back-end : `npm start`

### Setup - Front-end
`cd front`
* Installer les dépendances : `npm i`
* Lancer le front-end : `npm start`

### Build
`cd front;npm build`
