# Kylling&Ris

Kylling&Ris er en nettside à la myfitnesspal, som lar brukeren søke på og registrere mat de har spist. Nettsiden gir brukeren muligheten til å søke, filtrere og sortere et sett med data, hentet fra et REST-API med produkter fra norske dagligvarebutikker: https://kassal.app/api. Brukeren kan så velge hvilken dato hen vil registrere mat for ved hjelp av piler eller en kalender. Matelementer registreres enkelt ved å klikke på tilhørende pluss-knapp. Deretter kan brukeren skrive inn vekten på produktet, og produktet vises så i en tabell. Her kan brukeren siden fjerne registrerte elementer fra tabellen vha. en søppelbøtte-knapp.

## Oppsett

For å starte nettsiden, naviger til rotmappen, og kjør med npm:  
`cd .\kylling-ris`  
`npm install`  
`npm run dev`

For å starte serveren må man enten være på Eduroam eller ha på VPN. Naviger deretter til rotmappen, og kjør med npm:  
`cd .\backend`  
`npm install`  
`npm run dev`

## Krav

### Funksjonelle krav

- Søkemulighet med søkefelt for input av søk.
- Listebasert presentasjon av søk med dynamisk lasting av flere resultater ved scrolling.
- Relevant info om matobjekt vises ved søk eller i tabellen. Man kan klikke seg innpå hvert matobjekt for å få mer informasjon.
- Mulighet for sortering og filtrering av resultatsettet (allergener, proteininnhold o.l.).
- Matloggen og brukeren den hører til er vår brukergenert data. Dataen lagres på server. Hvis du ikke har laget bruker, får du tildelt en gjestebruker, sånn at dataen uansett blir lagret på server.
- Applikasjonen har et pent og responsivt design. TODO: "Løsningen skal demonstrere aspekter ved universell utforming / web accessibility (tilgjengelighet)."
- TODO: Løsningen skal demonstrere aspekter ved bærekraftig webutvikling (gjennom valg som gjøres i design)
- Database og backend er satt opp på gruppas virtuelle maskin.

### Tekniske krav

- Applikasjonen er laget med React, Typescript, og satt opp med Vite.
- State managment ved hjelp av redux. Vi lagrer søkeinnstillinger og datoen matloggen er på. Vi hadde også matloggen i redux, men så flyttet vi den til server.
- Bruker importerte tredjepartskomponenter (f.eks. datapicker kalender og infinite-scroll-elementene).
- Benytter Neo4j for backend-database. Bruker GraphQL, Apollo Server og Apollo Client for spørringer. Ca. 7500 ulike matobjekter ligger i databasen.
- Prettier har (stort sett) blitt benyttet underveis for å formatere koden. Det har blitt kjørt gjennom repoet med eslint og prettier før innlevering.
- Vi har tester for login- og registereringsside, datepicker, mat popup, matsøk med end-to-end testing.
- Kommentarer har blitt benyttet underveis for å utdype koden.

### Spesifikt for andre underveisinnlevering

- Det er laget en login- og registreringsside med litt frontend logikk, men dette er ikke koblet opp med backenden enda. Alle brukere behandles for øyeblikket som gjester.

## Planen fremover

- Koble opp brukerside med databasen slik at hver bruker har egen logg. Da kan brukeren ha samme logg på forskjellige enheter/nettlesere.
- Implementere tester for de ulike Komponentene og sidene på applikasjonen.
- Flytte lagring av matobjekter brukeren legger til over på databasen.
- Støtte for QR-scanning av strekkoder på matvarer, for å enkelt kunne legge til mat i applikasjonen.
- Gi brukeren mulighet til å legge til egendefinerte måltider (f.eks. brødskive med ost og skinke).

## Testing

For å kjøre testene, naviger til rotmappen og kjør med npm:  
`cd .\kylling-ris`  
`npm test`

Gruppen valgte å ikke prioritere tester for den andre underveisvurderingen. Dette var et bevisst valg for å spare tid. Vi har prøvd nettsiden på Firefox, Edge, Chrome og Opera på PC. Vi har ikke fått testet på andre enheter, ettersom nettsiden ikke er satt opp på VM enda, men vi har testet utseendet på mobil vha. devtools på PC
