# Berlin Heute

Kleines statisches Projekt für tägliche Lokalnachrichten aus Berlin.

Ansehen lokal:

Mit Python (empfohlen, falls installiert):
```bash
python -m http.server 8000 -d src
```

Oder mit npx (Node.js):
```bash
npx serve src
```

Dateien:
- `src/index.html` — Startseite mit Beispielartikel
- `src/css/styles.css` — Styling
- `src/js/main.js` — kleine Interaktionen
- `src/legal/impressum.html` — Platzhalter-Impressum (bitte ausfüllen)

Nächste Schritte:
- Automatisches Einspielen neuer Beiträge (z. B. via Markdown/JSON + Skript)
- RSS-Feed oder Newsletter-Anbindung
