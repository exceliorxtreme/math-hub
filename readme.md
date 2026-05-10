# 🧮 Math Suite — Modular

> O aplicație web matematică modulară, interactivă și rapidă, construită cu JavaScript vanilla, CSS și MathJax. Fără framework-uri, fără build steps. Doar matematică, clară și accesibilă.

🔗 **Live Demo:** [exceliorxtreme.github.io/math-hub](https://exceliorxtreme.github.io/math-hub/)  
[![Google Translate Friendly](https://img.shields.io/badge/Translate-Google%20Translate%20✅-4285F4?style=flat-square)](https://translate.google.com)

---

## ✨ Funcționalități

- 🌐 **Suport Bilingv:** Comutare instantă RO ↔ EN printr-un sistem `i18n` custom.
- 🌍 **Google Translate Friendly:** Proiectul este construit cu HTML semantic și structură curată, ceea ce îl face perfect compatibil cu Google Translate (click dreapta → „Translate to..."). Deși aplicația include deja suport nativ RO ↔ EN, această compatibilitate permite utilizatorilor să traducă rapid conținutul în peste 100 de limbi, direct din browser, fără configurări suplimentare.
- 🌓 **3 Teme Integrate:** `Default` (Terminal Green), `Carbon` (Dark Modern), `Sepia` (Luminos/Eye-friendly). Preferința se salvează în `localStorage`.
- 📱 **100% Responsive:** Taburi adaptive, input-uri optimizate pentru touch, layout care se comportă natural pe mobil/tabletă/desktop.
- 🧩 **Arhitectură Modulară:** Încărcare dinamică via `import()`. Se rulează doar ce este necesar. Zero overhead.
- 📐 **8+ Domenii Matematice:** Aritmetică, Aritmetică Modulară, Trigonometrie, Analiză, Numere Complexe, Statistică, Probabilități, Inegalități.
- ⚡ **MathJax 3:** Randare instantă a formulelor LaTeX în carduri, tabele și rezultate.
- 🚀 **Optimizat pentru GitHub Pages:** Structură statică curată + sistem de cache-busting (`?v=`) pentru update-uri fără erori.

---

## 🛠️ Stack Tehnologic

| Componentă | Tehnologie |
|------------|-----------|
| **Frontend** | HTML5, CSS3 (Variables, Flexbox/Grid), Vanilla JavaScript (ES6 Modules) |
| **Randare Matematică** | MathJax 3 (tex-mml-chtml) |
| **Hosting** | GitHub Pages |
| **Dependențe** | Zero (niciun framework, niciun bundler) |
|🔗 **Qwen AI** | 🤖 Dezvoltat cu Asistență AI  https://qwen.ai

---

## 📁 Structura Proiectului


```text
math-hub/
├── index.html              # Structura UI, taburi, container module
├── main.js                 # Logică centrală: routing, loader, init teme/limbă
├── style.css               # Stiluri globale, variabile, responsive breakpoints
├── utils/
│   └── i18n.js             # Dicționar traduceri + funcția applyLang()
├── modules/                # Module funcționale (încărcate la cerere)
│   ├── algebra/            # Identități, Pascal, Lagrange, Inegalități
│   ├── aritmetica/         # Fracții, factori, CMMDC/CMMMC, sume puteri
│   ├── modulara/           # ℤₙ, invers modular, diofantice, Pell, fracții continue, Möbius
│   ├── trig/               # Valori exacte, formule sumă/dublu/triplu, reducere puteri
│   ├── analiza/            # Derivate, integrale, Taylor, grafice Canvas
│   ├── complexe/           # Reprezentări, operații, ecuații grad II/binomă/unitate
│   ├── statistica/         # Medii, varianță, abatere standard, coeficient variație
│   └── probabilitati/      # Combinări, aranjamente, permutări, distribuții
└── README.md

💚 Construit cu pasiune pentru matematică clară, riguroasă și accesibilă.
Built with passion for clear, rigorous, and accessible mathematics.
# 1. Clonează repository-ul
git clone https://github.com/exceliorxtreme/math-hub.git
cd math-hub

# 2. Deschide local
# Opțiunea A: Deschide index.html direct în browser
# Opțiunea B: Rulează un server local
python3 -m http.server 8000  # apoi accesează http://localhost:8000
✨ Construit pentru rapiditate, precizie și claritate matematică. Optimizat pentru studenți, profesori și pasionați.

