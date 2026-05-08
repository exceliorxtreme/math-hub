// main.js
import { applyLang, initLangSwitcher } from './utils/i18n.js';

const cache = new Map();
const workspace = document.getElementById('workspace');
const subNav = document.getElementById('sub-nav');
const resultBox = document.getElementById('result');
let currentLang = localStorage.getItem('app_lang') || 'ro';

function showSubTabs(category, autoLoad = true) {
  document.querySelectorAll('.s-tab').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.toggle('visible', btn.dataset.cat === category);
  });
  const firstVisible = subNav?.querySelector('.s-tab.visible');
  if (firstVisible && autoLoad) { // ⭐ Încarcă doar dacă autoLoad e true
    firstVisible.classList.add('active');
    if (firstVisible.dataset.path) loadModule(firstVisible.dataset.path);
  }
}

document.querySelectorAll('.m-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.m-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    showSubTabs(tab.dataset.cat);
  });
});

subNav?.addEventListener('click', (e) => {
  const btn = e.target.closest('.s-tab');
  if (!btn || !btn.classList.contains('visible')) return;
  document.querySelectorAll('.s-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  if (btn.dataset.path) loadModule(btn.dataset.path);
});

export async function loadModule(path) {
  if (resultBox) { resultBox.style.display = 'none'; resultBox.innerHTML = ''; }
  if (cache.has(path)) {
    cache.get(path).initUI?.();
    applyLang(currentLang);
    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise().catch(()=>{}));
    return;
  }

  if (workspace) workspace.innerHTML = `<div class="loader">⏳ Loading...</div>`;
  try {
    const mod = await import(`./modules/${path}.js`);
    cache.set(path, mod);
    if (workspace) workspace.innerHTML = '';
    mod.initUI?.();
    applyLang(currentLang);
    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise().catch(()=>{}));
  } catch (err) {
    console.error(`❌ Eroare încărcare ${path}:`, err);
    if (workspace) workspace.innerHTML = `<div style="text-align:center;color:#ff5555;padding:20px;border:1px dashed #ff5555;border-radius:6px">⚠️ Modul nu a fost găsit.<br><small>Verifică consola (F12).</small></div>`;
  }
}

// 🌍 1. LIMBA (SE ÎNCARCĂ ÎNTOTDEAUNA PRIMUL)
initLangSwitcher();
currentLang = localStorage.getItem('app_lang') || 'ro';
applyLang(currentLang);

// 🌓 Theme Logic (asigură-te că selectorul e corect)
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  const themes = ['default', 'carbon', 'sepia'];
  const saved = localStorage.getItem('app_theme') || 'default';
  if (saved !== 'default') document.documentElement.setAttribute('data-theme', saved);

  themeBtn.addEventListener('click', (e) => {
    e.preventDefault(); // ⛔ Previne comportamentul de tab
    const current = document.documentElement.getAttribute('data-theme') || 'default';
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    if (next === 'default') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('app_theme', next === 'default' ? 'default' : next);
  });
}

// 🚀 3. PRIMUL MODUL
const initialCat = document.querySelector('.m-tab.active')?.dataset.cat || 'aritmetica';
showSubTabs(initialCat, false);
