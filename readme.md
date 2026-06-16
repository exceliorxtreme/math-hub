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
```
math-hub/
├── .gitignore
├── .nojekyll
├── LICENCE
├── SECURITY.md
├── core/
│   ├── python_engine.py
│   └── requirements.txt
├── css/
│   └── style.css
├── index.html
├── main.js
├── modules/
│   ├── algebra/
│   │   ├── identitati.js
│   │   └── inegalitati.js
│   ├── analiza/
│   │   ├── deriv.js
│   │   ├── dersup.js
│   │   ├── grafice.js
│   │   ├── hiperb.js
│   │   ├── integrale.js
│   │   ├── inversetrig.js
│   │   ├── limite.js
│   │   ├── reguli.js
│   │   └── taylor.js
│   ├── aritmetica/
│   │   ├── baze.js
│   │   ├── combinari.js
│   │   ├── factori.js
│   │   ├── fractii.js
│   │   ├── functii_num.js
│   │   ├── pitagorice.js
│   │   ├── prime.js
│   │   └── suma_puteri.js
│   ├── complexe/
│   │   ├── calc.js
│   │   ├── ecuatii.js
│   │   └── intro.js
│   ├── modulara/
│   │   ├── continue.js
│   │   ├── diofantice.js
│   │   ├── mobius.js
│   │   ├── op_modulo.js
│   │   └── pell.js
│   ├── probabilitati/
│   │   ├── calc.js
│   │   └── prezentare.js
│   ├── statistica/
│   │   ├── calc.js
│   │   └── prezentare.js
│   └── trig/
│       ├── trig_form.js
│       └── trig_val.js
├── package-lock.json
├── package.json
├── readme.md
├── resources.html
├── scripts/
│   ├── check-i18n.mjs
│   ├── check-imports.mjs
│   └── check-js.mjs
├── utils/
│   └── i18n.js
└── vendor/
    └── mathjax/
        ├── LICENSE
        └── es5/
            ├── a11y/
            │   ├── assistive-mml.js
            │   ├── complexity.js
            │   ├── explorer.js
            │   ├── semantic-enrich.js
            │   └── sre.js
            ├── adaptors/
            │   └── liteDOM.js
            ├── core.js
            ├── input/
            │   ├── asciimath.js
            │   ├── mml.js
            │   ├── mml/
            │   │   ├── entities.js
            │   │   └── extensions/
            │   │       ├── mml3.js
            │   │       └── mml3.sef.json
            │   ├── tex-base.js
            │   ├── tex-full.js
            │   ├── tex.js
            │   └── tex/
            │       └── extensions/
            │           ├── action.js
            │           ├── all-packages.js
            │           ├── ams.js
            │           ├── amscd.js
            │           ├── autoload.js
            │           ├── bbox.js
            │           ├── boldsymbol.js
            │           ├── braket.js
            │           ├── bussproofs.js
            │           ├── cancel.js
            │           ├── cases.js
            │           ├── centernot.js
            │           ├── color.js
            │           ├── colortbl.js
            │           ├── colorv2.js
            │           ├── configmacros.js
            │           ├── empheq.js
            │           ├── enclose.js
            │           ├── extpfeil.js
            │           ├── gensymb.js
            │           ├── html.js
            │           ├── mathtools.js
            │           ├── mhchem.js
            │           ├── newcommand.js
            │           ├── noerrors.js
            │           ├── noundefined.js
            │           ├── physics.js
            │           ├── require.js
            │           ├── setoptions.js
            │           ├── tagformat.js
            │           ├── textcomp.js
            │           ├── textmacros.js
            │           ├── unicode.js
            │           ├── upgreek.js
            │           └── verb.js
            ├── latest.js
            ├── loader.js
            ├── mml-chtml.js
            ├── mml-svg.js
            ├── node-main.js
            ├── output/
            │   ├── chtml.js
            │   ├── chtml/
            │   │   └── fonts/
            │   │       ├── tex.js
            │   │       └── woff-v2/
            │   │           ├── MathJax_AMS-Regular.woff
            │   │           ├── MathJax_Calligraphic-Bold.woff
            │   │           ├── MathJax_Calligraphic-Regular.woff
            │   │           ├── MathJax_Fraktur-Bold.woff
            │   │           ├── MathJax_Fraktur-Regular.woff
            │   │           ├── MathJax_Main-Bold.woff
            │   │           ├── MathJax_Main-Italic.woff
            │   │           ├── MathJax_Main-Regular.woff
            │   │           ├── MathJax_Math-BoldItalic.woff
            │   │           ├── MathJax_Math-Italic.woff
            │   │           ├── MathJax_Math-Regular.woff
            │   │           ├── MathJax_SansSerif-Bold.woff
            │   │           ├── MathJax_SansSerif-Italic.woff
            │   │           ├── MathJax_SansSerif-Regular.woff
            │   │           ├── MathJax_Script-Regular.woff
            │   │           ├── MathJax_Size1-Regular.woff
            │   │           ├── MathJax_Size2-Regular.woff
            │   │           ├── MathJax_Size3-Regular.woff
            │   │           ├── MathJax_Size4-Regular.woff
            │   │           ├── MathJax_Typewriter-Regular.woff
            │   │           ├── MathJax_Vector-Bold.woff
            │   │           ├── MathJax_Vector-Regular.woff
            │   │           └── MathJax_Zero.woff
            │   ├── svg.js
            │   └── svg/
            │       └── fonts/
            │           └── tex.js
            ├── sre/
            │   └── mathmaps/
            │       ├── base.json
            │       ├── ca.json
            │       ├── da.json
            │       ├── de.json
            │       ├── en.json
            │       ├── es.json
            │       ├── fr.json
            │       ├── hi.json
            │       ├── it.json
            │       ├── nb.json
            │       ├── nemeth.json
            │       ├── nn.json
            │       └── sv.json
            ├── startup.js
            ├── tex-chtml-full-speech.js
            ├── tex-chtml-full.js
            ├── tex-chtml.js
            ├── tex-mml-chtml.js
            ├── tex-mml-svg.js
            ├── tex-svg-full.js
            ├── tex-svg.js
            └── ui/
                ├── lazy.js
                ├── menu.js
                └── safe.js

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
