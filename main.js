// main.js
import { applyLang, initLangSwitcher } from './utils/i18n.js';

const cache = new Map();
const workspace = document.getElementById('workspace');
const subNav = document.getElementById('sub-nav');
const resultBox = document.getElementById('result');
let currentLang = localStorage.getItem('app_lang') || 'ro'; // ✅ Sincronizat cu i18n.js

function showSubTabs(category) {
  document.querySelectorAll('.s-tab').forEach(btn => btn.classList.toggle('visible', btn.dataset.cat === category));
  const firstVisible = subNav.querySelector('.s-tab.visible');
  if (firstVisible && !subNav.querySelector('.s-tab.active.visible')) {
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

subNav.addEventListener('click', (e) => {
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
    applyLang();
    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise().catch(()=>{}));
    return;
  }
  if (workspace) workspace.innerHTML = `<div class="loader">⏳ Loading...</div>`;
  try {
    const mod = await import(`./modules/${path}.js`);
    cache.set(path, mod);
    if (workspace) workspace.innerHTML = '';
    mod.initUI?.();
    applyLang();
    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise().catch(()=>{}));
  } catch (err) {
    console.error(`❌ Eroare încărcare ${path}:`, err);
    if (workspace) workspace.innerHTML = `<div style="text-align:center;color:#ff5555;padding:20px;border:1px dashed #ff5555;border-radius:6px">⚠️ Modulul <code>${path}.js</code> nu a fost găsit.<br><small style="color:var(--text-muted)">Verifică consola (F12).</small></div>`;
  }
}

// 🚀 Inițializare
initLangSwitcher();
const initialCat = document.querySelector('.m-tab.active')?.dataset.cat || 'aritmetica';
showSubTabs(initialCat);
