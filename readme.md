# 🧮 Math Suite — Modular

> O aplicație web matematică modulară, interactivă și rapidă, construită cu JavaScript vanilla, CSS și MathJax. Fără framework-uri și fără build obligatoriu. Doar matematică, clară și accesibilă.

🔗 **Live Demo:** [exceliorxtreme.github.io/math-hub](https://exceliorxtreme.github.io/math-hub/)  
[![Google Translate Friendly](https://img.shields.io/badge/Translate-Google%20Translate%20✅-4285F4?style=flat-square)](https://translate.google.com)

---

## ✨ Funcționalități

- 🌐 **Suport bilingv:** comutare instantă RO ↔ EN printr-un sistem `i18n` custom.
- 🌍 **Google Translate friendly:** HTML semantic și structură curată, compatibile cu traducerea directă din browser.
- 🌓 **3 teme integrate:** `Default` (Terminal Green), `Carbon` (dark neutru inspirat de interfețe de cod), `Sepia` transformată în temă deschisă printer-friendly alb/gri. Preferința se salvează în `localStorage`.
- 🖨️ **Print friendly:** regulă `@media print` pentru randare alb/negru curată la imprimare.
- 📱 **Responsive:** taburi adaptive, input-uri optimizate pentru touch și layout stabil pe mobil/tabletă/desktop.
- 🧩 **Arhitectură modulară:** module încărcate dinamic via `import()`, doar când sunt necesare.
- 📐 **Domenii matematice:** aritmetică, aritmetică modulară, algebră, trigonometrie, analiză, numere complexe, statistică, probabilități.
- ⚡ **MathJax 3 local:** formulele LaTeX sunt randate din `vendor/mathjax`, deci site-ul clonat nu depinde de CDN pentru MathJax.
- ✅ **Verificări locale:** scripturi pentru sintaxă JS, chei i18n și importuri de module.
- 🚀 **Optimizat pentru GitHub Pages:** structură statică simplă, potrivită pentru hosting direct.

---

## 🛠️ Stack tehnologic

| Componentă | Tehnologie |
|------------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript, ES Modules |
| Randare matematică | MathJax 3 `tex-mml-chtml`, vendorizat local |
| Styling | CSS variables, Flexbox/Grid, teme custom |
| Hosting | GitHub Pages / orice server static |
| Verificări | Node.js scripts |
| AI helper | Qwen AI, OpenAI Codex |

---

## 📁 Structura proiectului

```text
math-hub/
├── index.html              # UI principal, taburi, container module
├── main.js                 # Routing, loader module, teme, limbă
├── css/
│   └── style.css           # Stiluri globale, teme, responsive, print
├── utils/
│   └── i18n.js             # Dicționar RO/EN + applyLang()
├── modules/                # Module funcționale încărcate la cerere
│   ├── algebra/            # Identități, inegalități
│   ├── aritmetica/         # Fracții, factori, baze, prime, combinări
│   ├── modulara/           # Operații modulo, diofantice, Pell, Möbius, fracții continue
│   ├── trig/               # Valori exacte, formule trigonometrice, tan/arctan
│   ├── analiza/            # Derivate, integrale, Taylor, grafice Canvas
│   ├── complexe/           # Baze, calculator, ecuații complexe
│   ├── statistica/         # Prezentare și calculator statistic
│   └── probabilitati/      # Prezentare și calculator probabilități
├── vendor/
│   └── mathjax/            # MathJax local + licență Apache-2.0
├── scripts/
│   ├── check-js.mjs
│   ├── check-i18n.mjs
│   └── check-imports.mjs
├── resources.html
├── package.json
└── readme.md
|─ core/
│   └── python_engine.py
|   └──requirements.txt
```

---

## ▶️ Rulare locală

Clonează repository-ul:

```bash
git clone https://github.com/exceliorxtreme/math-hub.git
cd math-hub
```

Rulează un server static local:

```bash
python -m http.server 8000
```

Apoi deschide:

```text
http://localhost:8000
```

Notă: aplicația folosește ES Modules, deci este recomandat server local în loc de deschidere directă cu dublu-click pe `index.html`.

---

## ✅ Verificări

Dacă ai Node.js instalat:

```bash
npm install
npm run check
```

`npm run check` rulează:

- `check:js` — verifică sintaxa fișierelor JS ale aplicației;
- `check:i18n` — verifică dacă toate cheile `data-i18n` și `t(...)` există în RO/EN;
- `check:imports` — verifică importurile ES ale modulelor din `modules/`.

---

## 📦 MathJax local

MathJax este inclus în:

```text
vendor/mathjax/
```

Fișierul principal încărcat de aplicație este:

```text
vendor/mathjax/es5/tex-mml-chtml.js
```

MathJax este distribuit sub licența Apache-2.0, iar licența este păstrată în `vendor/mathjax/LICENSE`.

---
## ⚡ Arhitectură de Calcul Hibridă (Web vs. Native CPU)

Acest proiect folosește o abordare duală pentru validarea descompunerilor Goldbach, separând calculul de explorare vizuală de cel de performanță extremă:

1. **Interfața Web (JavaScript/BigInt):** Optimizată pentru vizualizări dinamice, generare de rapoarte LaTeX în timp real și analize de pînă la $10^7$. Include sisteme automate de protecție (guardrails) pentru a preveni blocarea thread-ului principal de execuție al browserului.
2. **Motorul Core (Python/Numba JIT):** Dedicat "senzațiilor tari". Destinat explorărilor asimptotice de ordinul sutelor de milioane (ex: $503,222,000$). Execută alocări de biți direct în RAM și rulează algoritmii la viteza limbajului C prin compilare Just-In-Time pe mașina locală.

### Rularea Motorului de Înaltă Performanță (Local)

```bash
cd core
pip install -r requirements.txt
python python_engine.py
## 🤖 AI helper

Proiectul a fost dezvoltat și rafinat cu asistență AI:

- Qwen AI
- OpenAI Codex

---

💚 Construit pentru rapiditate, precizie și claritate matematică.
