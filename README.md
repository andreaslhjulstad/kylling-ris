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
- Brukergenererte data lagres via redux i form av matobjekter brukeren legger til på ulike datoer. Dataene presenteres i mattabellen. For denne innleveringen så lagres dette lokalt, dette skal bli flyttet over på databaseserveren til neste innlevering.
- Applikasjonen har et pent og responsivt design.
- Database og backend er satt opp på gruppas virtuelle maskin.

### Tekniske krav

- Applikasjonen er implementert gjennom bruk av React, Vite og Typescript.
- State managment ved hjelp av redux.
- Bruker importerte tredjepartskomponenter (f.eks. datapicker kalender og infinite-scroll-elementene).
- Benytter Neo4j for backend-database. Bruker GraphQL, Apollo Server og Apollo Client for spørringer. Ca. 9000 ulike matobjekter ligger i databasen.
- Prettier har (stort sett) blitt benyttet underveis for å formatere koden. Det har blitt kjørt gjennom repoet med eslint og prettier før innlevering.
- Testing av "date-picker" og login/registrasjon sidene har blitt implementert så langt. 
- Kommentarer har blitt benyttet underveis for å utdype koden.

### Spesifikt for andre underveisinnlevering
- Det er laget en login og registrering side med litt frontend logikk, men dette er ikke koblet opp med backenden enda. Alle brukere behandles for øyeblikket som gjester.

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

## Tilgjengelighet
