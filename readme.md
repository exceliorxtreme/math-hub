# 🧮 Math Hub — Aplicație Educațională Bilingvă

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MathJax](https://img.shields.io/badge/Rendered%20with-MathJax-007ACC.svg)](https://www.mathjax.org)
[![Languages](https://img.shields.io/badge/Languages-RO%2F%20EN-green.svg)](#languages)

> O aplicație web modulară, rapidă și riguroasă pentru învățarea și verificarea matematicii — de la aritmetică la analiză complexă și statistică descriptivă.

---

## 🌍 Limbi / Languages

| 🇷🇴 Română | 🇬🇧 English |
|------------|------------|
| Comutare instant, fără reload | Instant switch, no refresh |
| Toate formulele și interfețele traduse | All formulas & UI fully localized |

---

## ✨ Caracteristici Principale / Key Features

### 🔹 Arhitectură Curată
- **SPA modulară** — fiecare capitol este un fișier JS independent, încărcat la cerere
- **Zero framework-uri** — Vanilla JS + MathJax + CSS variables
- **i18n nativ** — dicționar centralizat, comutare RO/EN instant
- **MathJax sync** — formule LaTeX randate corect la fiecare schimbare de limbă sau modul

### 🔹 Rigurozitate Matematică
- `i = (0,1)` în `ℝ²` — definiție formală, zero `√(-1)` magic
- `Δ < 0 → δ²` — notație clară pentru discriminant negativ în ecuații complexe
- Corecția Bessel (`n-1`) explicită în statistică
- Formule LaTeX profesionale, verificate și randate nativ

### 🔹 Conținut Complet
| Domeniu | Module |
|---------|--------|
| 📐 Aritmetică | Fracții, factori primi, CMMDC/CMMMC, funcții numerice, sume de puteri, triple pitagorice |
| 🔢 Aritmetică Modulară | Operații în `ℤₙ`, invers modular, exponențiere rapidă |
| 📐 Trigonometrie | Valori exacte (4 cadrane), formule complete (sumă, dublu, triplu, produs↔sumă, reducere puteri) |
| 📈 Analiză | Derivate, grafice Canvas, funcții inverse trig, hiperbolice, reguli de derivare, derivate superioare, serii Taylor, integrale |
| 🔵 Numere Complexe | Reprezentări, operații, conversii Cartezian↔Polar, ecuații (grad II, binomă, rădăcini unitate, biquadratică) |
| 📊 Statistică | Medii (aritmetică, ponderată, geometrică), varianță, abatere standard, coeficient de variație |

---

## 🚀 Utilizare Rapidă / Quick Start

### 1. Deschide local
```bash
git clone https://github.com/exceliorxtreme/math-hub.git
cd math-hub
# Deschide index.html direct în browser SAU rulează un server local:
python3 -m http.server 8000  # apoi http://localhost:8000