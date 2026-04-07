# Blogg

En moderne bloggplattform bygget med Vite for frontend og Node.js/Express for backend, hostet på Vercel. Prosjektet bruker Supabase som database for å håndtere innlegg og brukerdata.

## Beskrivelse

Dette er en fullstack-blogg-applikasjon designet for enkel publisering av innhold. Frontend er bygget med moderne web-teknologier som HTML, CSS og JavaScript, mens backend håndterer API-endepunkter og databaseinteraksjoner. 

## Funksjoner

- **Brukerautentisering**: Registrering og innlogging av brukere
- **Innleggshåndtering**: Opprette, redigere og slette bloginnlegg
- **Responsivt design**: Fungerer på desktop, tablet og mobil
- **Samtidsoppdateringer**: Integrasjon med Supabase for live data
- **Automatisk distribusjon**: Hostet på Vercel med kontinuerlig integrasjon

## Forutsetninger

Før du begynner, sørg for at du har følgende installert:

- Node.js  - [Last ned her](https://nodejs.org/)
- npm eller Yarn
- En Supabase-konto for database - [Registrer deg her](https://supabase.com/)

## Installasjon

1. **Klon repositoriet**:
   ```bash
   git clone https://github.com/DeinTheFool/Blogg.git
   cd Blogg
   ```

2. **Installer dependencies for frontend**:
   ```bash
   cd Frontend
   npm install
   ```

3. **Installer dependencies for backend**:
   ```bash
   cd ../Backend
   npm install
   ```

4. **Konfigurer Supabase**:
   - Opprett et nytt prosjekt på Supabase
   - Kopier database-URL og API-nøkler til en `.env`-fil i Backend-mappen
   - Kjør databaseskjemaet fra `Backend/db/00-schema.sql`

## Bruk

### Utviklingsmodus

1. **Start backend-serveren**:
   ```bash
   cd Backend
   npm start
   ```
   Serveren kjører på `http://localhost:3001` som standard.

2. **Start frontend-utviklingsserveren**:
   ```bash
   cd Frontend
   npm run dev
   ```
   Åpne `http://localhost:5173` i nettleseren din.

### Bygg for produksjon

For å bygge frontend for produksjon:
```bash
cd Frontend
npm run build
```

De byggde filene vil være i `dist/`-mappen.

## Distribusjon

Prosjektet er konfigurert for automatisk distribusjon på Vercel:

1. Koble GitHub-repositoriet til Vercel
2. Sett opp dotenv-variabler for Supabase i Vercel-dashboardet
3. Push endringer til `main`-branchen for å utløse en ny deploy

Vercel vil automatisk bygge og distribuere applikasjonen.

## Prosjektstruktur

```
Blogg/
├── Frontend/          # Frontend-applikasjon (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── modules/
│   │   └── main.js
│   ├── public/
│   └── package.json
├── Backend/           # Backend-API (Node.js/Express)
│   ├── backend/
│   │   ├── db/
│   │   ├── middleware/
│   │   └── routes/
│   └── server.js
├── docs/              # Dokumentasjon
├── vercel.json        # Vercel-konfigurasjon
└── vite.config.js     # Vite-konfigurasjon
```
