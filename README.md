# Kylling&Ris

Kylling&Ris er en nettside à la myfitnesspal, som lar brukeren søke på og registrere mat de har spist. Nettsiden gir brukeren muligheten til å søke, filtrere og sortere et sett med mock data, inspirert av data fra et REST-API med produkter fra norske dagligvarebutikker (https://kassal.app/api) som vi planlegger å bruke senere. Brukeren kan så velge hvilken dato hen vil registrere mat for. Matelementer registreres enkelt ved å klikke på tilhørende pluss-knapp. Deretter kan brukeren skrive inn vekten på produktet, og produktet vises så i en tabell. Her kan brukeren siden fjerne registrerte elementer fra tabellen vha. en søppelbøtte-knapp.

## Oppsett

For å starte nettsiden, naviger til rotmappen og installer og kjør med npm:  
`npm install`  
`npm run dev`

## Krav

### Funksjonelle krav

- Søkemulighet med søkefelt for input av søk (bruker foreløpig kun mock data).
- Listebasert presentasjon av søk med dynamisk lasting av flere resultater ved scrolling (i første iterasjon benyttes et "loading"-element ved scrolling, som simulerer ventetid fra serveren).
- Man kan ikke klikke seg innpå hvert matobjekt for å få mer informasjon, men relevant info vises ved søk eller i tabellen.
- Mulighet for sortering og filtrering av resultatsettet (allergener, proteininnhold o.l.).
- Brukergenererte data lagres via redux i form av matobjekter brukeren legger til på ulike datoer. Dataene presenteres igjennom en såkalt "food log table"
- Applikasjonen har et pent og responsivt design.
- Prosjektet er ikke satt opp på gruppas virtuelle maskin for denne innleveringen. En databaseløsning har heller ikke blitt implementert enda.

### Tekniske krav

- Applikasjonen er implementert gjennom bruk av React, Vite og Typescript.
- State managment ved hjelp av redux.
- Bruker importerte tredjepartskomponenter (f.eks. tabell- og infinite-scroll-elementene).
- Prettier har (stort sett) blitt benyttet underveis for å formatere koden. Det har blitt kjørt gjennom repoet med eslint og prettier før innlevering.
- Ingen tester har blitt implementert så langt.
- Kommentarer har blitt benyttet underveis for å utdype koden.

### Spesifikt for første underveisinnlevering

- Bruk av mockup-data
- Tenkt funksjonalitet og visning demonstreres gjennom bruk av mockup-data (søk, legge til og fjerne elementer).
- Medstudenter skal ha mulighet til å klone repoet og undersøke applikasjonen lokalt.

## Planen fremover

- Implementere en backend-database.
- Lage en brukerside, hvor data kan presenteres vha. en graf.
- Et kjent problem med den nåværende implementasjonen er at det kan være vanskelig for mobilbrukere å scrolle ned til tabellen på bunnen av siden, ettersom man gjerne scroller i søkeelementet i stedet for på selve nettsiden. I fremtiden ønsker vi dermed å dele mobil-siden inn i to "tabs": én for søking og én for tabellen.
- Implementere et "date-picker"-element, slik at brukeren enkelt kan navigere mellom forskjellige datoer.
- Støtte for QR-scanning av strekkoder på matvarer, for å enkelt kunne legge til mat i applikasjonen.
- Gi brukeren mulighet til å legge til egendefinerte måltider (f.eks. brødskive med ost og skinke).
- Sette opp Routing (mellom hovedside og brukerside).
- Implementere innlogging slik at en bruker kan ha samme logg på forskjellige enheter/nettlesere.

## Testing

Gruppen valgte å ikke prioritere tester for den første underveisvurderingen. Dette var et bevisst valg for å spare tid. Tidlige komplikasjoner ved testing av søkefeltet var også en faktor for nettopp dette valget. Man kan allikevel fortsatt kjøre `npm test` i kylling-ris mappen for å sjekke oppsett av testing, om ønskelig. Vi har prøvd nettsiden på Firefox, Edge, Chrome og Opera på PC. Vi har ikke fått testet på andre enheter, ettersom prosjektet ikke er satt opp på VM enda, men vi har testet utseendet på mobil vha. devtools på PC
