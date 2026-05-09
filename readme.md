# 🧮 Math Suite — Modular

> O aplicație web matematică modulară, interactivă și rapidă, construită cu JavaScript vanilla, CSS și MathJax. Fără framework-uri, fără build steps. Doar matematică, clară și accesibilă.

🔗 **Live Demo:** [exceliorxtreme.github.io/math-hub](https://exceliorxtreme.github.io/math-hub/)
[![Google Translate Friendly](https://img.shields.io/badge/Translate-Google%20Translate%20✅-4285F4?style=flat-square)](https://translate.google.com)
## ✨ Funcționalități
- 🌐 **Suport Bilingv:** Comutare instantă RO ↔ EN printr-un sistem `i18n` custom.
- Proiectul este construit cu HTML semantic și structură curată, ceea ce îl face perfect compatibil cu Google Translate (click dreapta → „Translate to...").
Deși aplicația include deja suport nativ RO ↔ EN, această compatibilitate permite utilizatorilor să traducă rapid conținutul în peste 100 de limbi, direct din browser, fără configurări suplimentare.
- 🌓 **3 Teme Integrate:** `Default` (Terminal Green), `Carbon` (Dark Modern), `Sepia` (Luminos/Eye-friendly). Preferința se salvează în `localStorage`.
- 📱 **100% Responsive:** Taburi adaptive, input-uri optimizate pentru touch, layout care se comportă natural pe mobil/tabletă/desktop.
- 🧩 **Arhitectură Modulară:** Încărcare dinamică via `import()`. Se rulează doar ce este necesar. Zero overhead.
- 📐 **7+ Domenii Matematice:** Aritmetică, Aritmetică Modulară, Trigonometrie, Analiză, Numere Complexe, Statistică, Probabilități.
- ⚡ **MathJax 3:** Randare instantă a formulelor LaTeX în carduri, tabele și rezultate.
- 🚀 **Optimizat pentru GitHub Pages:** Structură statică curată + sistem de cache-busting pentru update-uri fără eroare.

## 🛠️ Stack Tehnologic
- **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox/Grid), Vanilla JavaScript (ES6 Modules)
- **Randare Matematică:** MathJax 3 (`tex-mml-chtml`)
- **Hosting:** GitHub Pages
- **Dependențe:** Zero (niciun framework, niciun bundler)

## 📁 Structura Proiectului
```text
math-hub/
├── index.html              # Structura UI, taburi, container module
├── main.js                 # Logică centrală: routing, loader, init teme/limbă
├── style.css               # Stiluri globale, variabile, responsive breakpoints
├── utils/
│   └── i18n.js             # Dicționar traduceri + funcția applyLang()
├── modules/ Module funcționale (încărcate la cerere)
|   ├── algebra/
│   ├── aritmetica/
│   ├── modulara/
│   ├── trig/
│   ├── analiza/
│   ├── complexe/
│   ├── statistica/
│   └── probabilitati/
└── README.md
