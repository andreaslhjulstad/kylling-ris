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
- Vi har tester for login- og registereringsside, datepicker, mat popup, matsøk. Vi har brukt mocking for å teste frontend-funksjonalitet, samt at vi har en "end-to-end"-test for matsøk som tester backend-funksjonalitet.
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
End-to-end tester krever tilgang til server. Ta på VPN.

I tillegg til å ha testet de fleste komponentene og sidene.
Vi har prøvd nettsiden på Firefox, Edge, Chrome og Opera på PC. Vi har ikke fått testet på andre enheter, ettersom nettsiden ikke er satt opp på VM enda, men vi har testet utseendet på mobil vha. devtools på PC

## Tilgjengelighet

### Mulighet til å oppfatte og betjene nettsiden

- Lagt til aria-labels for å støtte skjermlesere.
- Passelig tekstavstand og valg av farger med tydelig kontrast slik at det er lettere å lese nettsiden for mennesker med synsproblemer.
- Lagt til tekstalternativer til ikke-tekstlig innhold.
- All funksjonalitet som er viktig er tilgjengelig med tastatur. Det er for eksemepel ikke mulig å komme seg til filter knappen eller logg inn-ikonet med tastatur. Vi har gjort det på denne måten fordi brukeropplevelsen ville ha blitt mye dårligere hvis man kunne "tabbe" seg inn her.
- Det er lett å navigere nettsiden vår siden den består kun av tre sider.
- Vi har prøvd å unngå overbruk av div/span taggen.

### Forståelighet

- Lagt til "Kaloriteller" som undertekst i logoen slik at bruker skjønner hensikten med nettsiden.
- Lagt til beskrivende hjelptekst i matloggen når brukeren ikke har lagt til noe mat for dagen.
- Lagt til ulik styling når komponenter får fokus for å tydliggjøre at brukeren kan samhandle med den aktuelle komponenten.
- Nettsiden hjelper brukeren til å unngå feil. Det er for eksemepel umulig å legge til mat i fremtiden.

## Bærekraft

- Vi bruker kun små bilder på SVG format. Noe som minker datatraffiken på nettsiden vår.
- Vi er klar over at mørke farger sparer strøm, men vi har lyst at nettsiden skal ha akkurat valgt fargepalettet.

## Diverse

### Søkeinnstillinger

Vi har sortering og filtreringsvalg på matsøk fordi det er krav, men det passer ikke helt til denne typen applikasjon. Hensikten med matsøket er å finne mat man allerede har spist; den er ikke der for å finne ut av hva man skal handle på butikken. Derfor har vi gitt denne funksjonaliteten lite plass på nettsiden - den er gjemt bak en liten knapp.

### Lucene søk

Vi bruker neo4j, som bruker lucene til søking. Den kunne vi ikke helt få til å gi gode søkeresultater. Vi har prøvd å matche med "\*" på slutten. Da gir den alle resultatene, men resultatene har samme relevans. Vi bruker fuzzy søk med "~", og da får de ulik relevans, men det er fortsatt noen rare resultat. Lucene virker ikke å være laget for sånn type søk vi har.

### Brukersikkerhet

Når det kommer til brukersikkerhet valgte gruppen å nedprioritere dette. Dette grunnet at applikasjonen kun skal brukes i prosjektsammenheng, og det ikke var spesifisert noe krav om dette. Derfor er passord lagret i klartekst i databasen. I en reell situasjon ville vi måttet "hashe" passordene, for å ikke lagre de i klartekst i databasen. Dette vil øke sikkerheten dersom databasen skulle blitt kompromittert, eller lekket på en annen måte.
Gruppen valgte å ikke prioritere tester for den andre underveisvurderingen. Dette var et bevisst valg for å spare tid. Vi har prøvd nettsiden på Firefox, Edge, Chrome og Opera på PC. Vi har ikke fått testet på andre enheter, ettersom nettsiden ikke er satt opp på VM enda, men vi har testet utseendet på mobil vha. devtools på PC
