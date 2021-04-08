# Matching App
>Master sushi-chefs is een matching app, waarin mensen elkaar kunnen ontmoeten met dezelfde intentie, om een sushi gerecht te koken. In de app bij het zoek scherm zal er standaard een aantal mensen staan die net nieuw zijn. De gebruiker kan gelijk zien hoe anderen profielen worden getoond. Er kan specifiek gematch worden op basis van de opgegeven voorkeuren die de gebruiker op geeft via een filter functie. De gebruiker kan filteren op leeftijd, opzoek naar een mannelijk of vrouwelijk koks, sushi gerecht en op vaardigheden op het gebiedt van kookkunsten.

## Table of Content
- Opdracht
- Visuel
- Database structure
- Installaties
- License

## Opdracht

De opdracht voor project-Tech is om één feature van een matching app te realiseren naar keuze. Hiervoor heb ik een aantal “job stories” en een requirements list opgesteld, vanuit daar heb ik een keuze gemaakt. <br>

**Gekozen: Job story**<br>
Wanneer ik opzoek ben naar een geschikte persoon, wil ik mijn voorkeuren kunnen opgeven, zodat ik snel potentiële chef-koks kan vinden die aansluiten naar mijn interesses.

Requirement
- voorkeur opgeven
- kunnen filteren op interesses

## Visuel
<img src="https://github.com/Hoa0/project-tech/blob/main/static/images/wikiImage/homeScherm.png" width="300">
<img src="https://github.com/Hoa0/project-tech/blob/main/static/images/wikiImage/filterScherm.png" width="300">
<img src="https://github.com/Hoa0/project-tech/blob/main/static/images/wikiImage/favoScherm.png" width="300">

## Database structure
>Voor dit project heb ik gebruik gemaakt van mongoDB database. Hieronder een visuele weergaven van de datastructure. <br>
MongoDB -> database naam: chef --> collection: chefs & collection: faveChefs
<img src="https://github.com/Hoa0/project-tech/blob/main/static/images/wikiImage/db-backend1.png" width="250">

## Installaties

Om gebruik te maken van dit project, moet u Node.js en npm packages installeren. Volg hieronder de volgende stappen.

**Om dit project lokaal op uw computer te krijgen, clone dit repo:**

```commandline
git clone https://github.com/Hoa0/project-tech.git
```

**NPM packages installeren, hiermee haal je de geüpdatet versies op van de gebruikte packages voor dit project.**

```commandline
npm install
```

**Om de server te laten runnen, voer de volgende commandline uit**

```commandline
npm start
```

## License

Voor dit repository heb ik gebruik gemaakt van een [MIT License](https://github.com/Hoa0/project-tech/blob/main/LICENSE)
