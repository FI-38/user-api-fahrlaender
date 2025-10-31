# Package.json erklärt



{
  "name": "user-api-fahrlaender",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",         // damit man imort systax benutzen kann
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mariadb": "^3.4.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}

Natürlich! Hier ist eine strukturierte Erklärung der Datei `package.json` in Markdown-Format:

---

# 📦 Was ist `package.json`?

Die Datei `package.json` ist das Herzstück eines Node.js-Projekts. Sie enthält Metadaten über das Projekt und verwaltet Abhängigkeiten, Skripte und Konfigurationsinformationen für npm (Node Package Manager).

---

## 🧠 Allgemeine Funktionen

- Beschreibt das Projekt (Name, Version, Beschreibung)
- Listet Abhängigkeiten auf (für Produktion und Entwicklung)
- Definiert Skripte für Aufgaben wie Starten, Testen oder Bauen
- Enthält Konfigurationen für Tools wie Babel, ESLint, TypeScript etc.

---

## 📄 Beispielstruktur einer `package.json`

```json
{
  "name": "mein-projekt",
  "version": "1.0.0",
  "description": "Ein Beispielprojekt mit Node.js",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "keywords": ["node", "example", "projekt"],
  "author": "Max Mustermann",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

---

## 🧩 Wichtige Felder im Detail

| Feld             | Beschreibung                                                                 |
|------------------|------------------------------------------------------------------------------|
| `name`           | Name des Projekts (muss eindeutig sein bei Veröffentlichung auf npm)        |
| `version`        | Versionsnummer nach SemVer (z. B. `1.0.0`)                                   |
| `description`    | Kurzbeschreibung des Projekts                                                |
| `main`           | Einstiegspunkt der Anwendung (z. B. `index.js`)                              |
| `scripts`        | Befehle, die über `npm run <script>` ausgeführt werden können               |
| `keywords`       | Schlagwörter zur besseren Auffindbarkeit                                     |
| `author`         | Name des Autors oder der Organisation                                        |
| `license`        | Lizenztyp (z. B. `MIT`, `ISC`, `Apache-2.0`)                                 |
| `dependencies`   | Pakete, die für den Betrieb der App notwendig sind                          |
| `devDependencies`| Pakete, die nur für Entwicklung und Tests benötigt werden                   |

---

## ⚙️ Weitere nützliche Felder

- `engines`: Gibt an, welche Node-Version benötigt wird
- `repository`: Link zum Quellcode (z. B. GitHub)
- `bugs`: Kontaktinformationen für Fehlermeldungen
- `homepage`: Projektwebseite
- `type`: z. B. `"module"` für ES-Module-Unterstützung

---

## 🚀 Beispiel für Skripte

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "build": "webpack --config webpack.config.js",
  "test": "jest"
}
```

---
wo kommt das her?????
// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
