# Il nostro piccolo mondo

Piccolo sito romantico in React + Vite, pensato per essere personalizzato facilmente e pubblicato su GitHub Pages.

## Stack

- React + Vite
- React Router con `HashRouter`
- Framer Motion
- Leaflet + OpenStreetMap
- Nessun backend

## Installazione

1. Installa le dipendenze:

```bash
npm install
```

2. Avvia il progetto in locale:

```bash
npm run dev
```

3. Crea la build di produzione:

```bash
npm run build
```

## Dove mettere foto e audio

Metti i file dentro `public/`:

- `public/assets/photos/`
- `public/assets/audio/`
- `public/assets/places/`
- `public/assets/wheel/`

Placeholder gia previsti nel codice:

- `public/assets/photos/photo-01.jpg`
- `public/assets/photos/photo-02.jpg`
- `public/assets/photos/photo-03.jpg`
- `public/assets/photos/photo-04.jpg`
- `public/assets/photos/photo-05.jpg`
- `public/assets/photos/photo-06.jpg`
- `public/assets/audio/ti-amo.mp3`
- `public/assets/places/cremeria-opera.jpg`
- `public/assets/places/pracchia.jpg`

Se mancano alcuni file, il sito continua a funzionare con placeholder eleganti.

## File dati da modificare

Puoi personalizzare tutto da questi file:

- `src/data/photos.js`
- `src/data/quizQuestions.js`
- `src/data/mapPlaces.js`
- `src/data/wheelPrizes.js`
- `src/data/siteContent.js`

### Modificare il quiz

Apri `src/data/quizQuestions.js`.

Ogni domanda ha:

```js
{
  question: 'Domanda',
  correct: 'Risposta corretta',
  wrong: 'Risposta sbagliata'
}
```

La risposta corretta resta la prima nel file dati, ma nell'interfaccia viene mescolata automaticamente.

### Modificare la mappa

Apri `src/data/mapPlaces.js` e aggiungi oggetti con questa forma:

```js
{
  id: 'vienna',
  name: 'Vienna',
  area: 'Austria',
  date: '2023-12-10',
  coordinates: [48.2082, 16.3738],
  description: 'Un viaggio pieno di cose belle e qualche fregatura memorabile.',
  image: '/assets/photos/vienna.jpg'
}
```

Se l'array resta vuoto, compare uno stato vuoto dolce al posto della mappa.

### Modificare le foto

Apri `src/data/photos.js` e aggiorna:

- `src`: percorso del file in `public/`
- `alt`: testo alternativo
- `caption`: didascalia
- `tilt`: leggera rotazione stile polaroid

## Deploy su GitHub Pages

### 1. Imposta il nome del repository

Per GitHub Pages con Vite devi configurare il `base path`.

Questo progetto legge `VITE_BASE_PATH` da `vite.config.js`.

Per esempio, se il repository si chiama `il-nostro-piccolo-mondo`, usa:

```bash
VITE_BASE_PATH=/il-nostro-piccolo-mondo/ npm run build
```

Se vuoi evitare di scriverlo ogni volta, puoi creare un file `.env.production` con:

```bash
VITE_BASE_PATH=/il-nostro-piccolo-mondo/
```

### 2. Pubblica

Dopo aver creato il repository GitHub:

```bash
npm run deploy
```

Lo script pubblica la cartella `dist` sul branch `gh-pages`.

### 3. Attiva GitHub Pages

Nel repository GitHub:

1. Vai su `Settings`
2. Apri `Pages`
3. Seleziona il branch `gh-pages`
4. Salva

## Nota privacy

GitHub Pages pubblica il sito tramite link web. Se vuoi usare foto molto personali, valuta se tenere il repository privato o se preferisci inserire contenuti meno sensibili.
