// modules/aritmetica/combinari.js
import { t } from '../../utils/i18n.js';

// ✅ LOGICĂ PURĂ (BigInt)
function bigC(n, k) {
    if (k < 0n || k > n) return 0n;
    if (k === 0n || k === n) return 1n;
    if (k > n - k) k = n - k;
    let r = 1n;
    for (let i = 0n; i < k; i++) r = r * (n - i) / (i + 1n);
    return r;
}

function bigA(n, k) {
    if (k < 0n || k > n) return 0n;
    let r = 1n;
    for (let i = n - k + 1n; i <= n; i++) r *= i;
    return r;
}

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="comb_title">${t('comb_title')}</h2>
    <div class="description" data-i18n="comb_desc">${t('comb_desc')}</div>
    <div style="display:flex; gap:10px; margin-bottom:12px;">
    <div class="input-group" style="flex:1;">
    <label data-i18n="comb_lbl_n">${t('comb_lbl_n')}</label>
    <input id="c-n" type="number" min="0" placeholder="Ex: 10">
    </div>
    <div class="input-group" style="flex:1;">
    <label data-i18n="comb_lbl_k">${t('comb_lbl_k')}</label>
    <input id="c-k" type="number" min="0" placeholder="Ex: 3">
    </div>
    </div>
    <div class="btn-group">
    <button id="btn-c" style="background:#e67e22;" data-i18n="comb_btn_c">${t('comb_btn_c')}</button>
    <button id="btn-a" style="background:#555; color:#fff; border-color:#444;" data-i18n="comb_btn_a">${t('comb_btn_a')}</button>
    </div>
    `;

    function show(html, err = false) {
        resBox.style.display = 'block';
        resBox.innerHTML = html;
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        requestAnimationFrame(() => {
            if (window.MathJax?.typesetPromise) MathJax.typesetPromise([resBox]).catch(() => {});
        });
    }

    document.getElementById('btn-c').addEventListener('click', () => {
        try {
            const n = BigInt(document.getElementById('c-n').value);
            const k = BigInt(document.getElementById('c-k').value);
            if (n < 0n || k < 0n || k > n) throw new Error(t('comb_err_range') || "0 ≤ k ≤ n");
            const rez = bigC(n, k);
            show(`\\(C(${n}, ${k}) = \\frac{${n}!}{${k}!(${n}-${k})!} = \\) <span style="font-size:1.4em;color:var(--accent)">${rez}</span>`);
        } catch (e) {
            show(`❌ ${e.message}`, true);
        }
    });

    document.getElementById('btn-a').addEventListener('click', () => {
        try {
            const n = BigInt(document.getElementById('c-n').value);
            const k = BigInt(document.getElementById('c-k').value);
            if (n < 0n || k < 0n || k > n) throw new Error(t('comb_err_range') || "0 ≤ k ≤ n");
            const rez = bigA(n, k);
            show(`\\(A(${n}, ${k}) = \\frac{${n}!}{(${n}-${k})!} = \\) <span style="font-size:1.4em;color:var(--accent)">${rez}</span>`);
        } catch (e) {
            show(`❌ ${e.message}`, true);
        }
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
