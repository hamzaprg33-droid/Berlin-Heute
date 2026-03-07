# Berlin Heute

Kleines statisches Projekt für tägliche Lokalnachrichten aus Berlin.

Ansehen lokal:

With Python (empfohlen, falls installiert):
```bash
python -m http.server 8000 -d .
```

Oder mit npx (Node.js):
```bash
npx serve .
```

Dateien:
 - `index.html` — Startseite
 - `css/styles.css` — Styling
 - `js/main.js` — Renderer + Interaktionen
 - `legal/impressum.html` — Platzhalter-Impressum (bitte ausfüllen)
 - `posts.json` — veröffentlichte Beiträge (JSON)

Nächste Schritte:
- Automatisches Einspielen neuer Beiträge (z. B. via Markdown/JSON + Skript)
- RSS-Feed oder Newsletter-Anbindung
