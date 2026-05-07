// modules/aritmetica/suma_puteri.js
import { t } from '../../utils/i18n.js';

function sumaPuteri(n, p) {
    if (n < 0 || p < 0) throw new Error(t('sp_err_neg') || "n și p trebuie să fie ≥ 0");
    const bigN = BigInt(n);
    const bigP = BigInt(p);

    // Formule închise rapide
    if (p === 0) return bigN;
    if (p === 1) return (bigN * (bigN + 1n)) / 2n;
    if (p === 2) return (bigN * (bigN + 1n) * (2n * bigN + 1n)) / 6n;
    if (p === 3) {
        const s1 = (bigN * (bigN + 1n)) / 2n;
        return s1 * s1;
    }

    // Fallback exact pentru p >= 4
    let suma = 0n;
    for (let k = 1n; k <= bigN; k++) suma += k ** bigP;
    return suma;
}

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="sp_title">${t('sp_title')}</h2>
    <div class="description" data-i18n="sp_desc">${t('sp_desc')}</div>
    <div class="input-group">
    <label data-i18n="sp_lbl_n">${t('sp_lbl_n')}</label>
    <input id="sp-n" type="number" min="0" max="100000" placeholder="Ex: 100">
    </div>
    <div class="input-group">
    <label data-i18n="sp_lbl_p">${t('sp_lbl_p')}</label>
    <input id="sp-p" type="number" min="0" max="10" value="2">
    </div>
    <div class="btn-group btn-group-1">
    <button id="btn-calc-suma" data-i18n="sp_btn">${t('sp_btn')}</button>
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

    document.getElementById('btn-calc-suma').addEventListener('click', () => {
        try {
            const nVal = Number(document.getElementById('sp-n').value);
            const pVal = Number(document.getElementById('sp-p').value);
            if (isNaN(nVal) || isNaN(pVal) || nVal < 0 || pVal < 0) throw new Error(t('sp_err_input') || "Completează corect n și p (≥ 0)");

            const rez = sumaPuteri(nVal, pVal);
            show(`\\(\\sum_{k=1}^{${nVal}} k^{${pVal}} = \\) <span style="font-size:1.3em;color:var(--accent)">${rez}</span>`);
        } catch (e) {
            show(`❌ ${e.message}`, true);
        }
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
