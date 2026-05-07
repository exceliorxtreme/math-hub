// modules/statistica/calc.js
import { t } from '../../utils/i18n.js';

function parseNums(str) {
    if (!str || !str.trim()) return [];
    return str.split(/[\s,;]+/).map(Number).filter(v => !isNaN(v) && isFinite(v));
}

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="stat_calc_title">${t('stat_calc_title')}</h2>
    <div class="description" data-i18n="stat_calc_desc">${t('stat_calc_desc')}</div>
    <div class="input-group">
    <label data-i18n="stat_lbl_vals">${t('stat_lbl_vals')}</label>
    <textarea id="st-vals" rows="3" placeholder="Ex: 4, 7, 2, 9, 5"></textarea>
    </div>
    <div class="input-group">
    <label data-i18n="stat_lbl_weights">${t('stat_lbl_weights')}</label>
    <textarea id="st-weights" rows="2" placeholder="Ex: 1, 3, 2, 1, 3 (opțional)"></textarea>
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin:8px 0;">
    <input type="checkbox" id="st-sample" checked>
    <label for="st-sample" data-i18n="stat_lbl_sample">${t('stat_lbl_sample')}</label>
    </div>
    <div class="btn-group btn-group-1">
    <button id="btn-calc-stat" data-i18n="stat_btn_calc">${t('stat_btn_calc')}</button>
    </div>
    `;

    function show(html, err = false) {
        if (!resBox) return;
        resBox.style.display = 'block';
        resBox.innerHTML = html;
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        requestAnimationFrame(() => {
            if (window.MathJax?.typesetPromise) MathJax.typesetPromise([resBox]).catch(() => {});
        });
    }

    document.getElementById('btn-calc-stat').onclick = () => {
        try {
            const vals = parseNums(document.getElementById('st-vals').value);
            if (vals.length < 2) throw new Error(t('stat_err_min') || "Introduceți cel puțin 2 valori valide.");

            const wRaw = parseNums(document.getElementById('st-weights').value);
            const useWeights = wRaw.length === vals.length;
            if (wRaw.length > 0 && !useWeights) throw new Error(t('stat_err_wlen') || "Numărul ponderilor trebuie să coincidă cu cel al valorilor.");

            const n = vals.length;
            const isSample = document.getElementById('st-sample').checked;
            const divisor = isSample ? n - 1 : n;

            let mean, wSum = 0;
            if (useWeights) {
                const wTotal = wRaw.reduce((a,b)=>a+b,0);
                mean = vals.reduce((acc, v, i) => acc + wRaw[i]*v, 0) / wTotal;
                wSum = wTotal;
            } else {
                mean = vals.reduce((a,b)=>a+b,0) / n;
            }

            const varNum = vals.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
            const variance = varNum / divisor;
            const stdDev = Math.sqrt(variance);
            const cv = Math.abs(mean) > 1e-9 ? (stdDev / Math.abs(mean)) * 100 : 0;

            const denLabel = isSample ? 'n-1' : 'n';
            const noteHtml = useWeights
            ? `<span style="color:var(--text-muted); margin-left:8px;">${t('stat_note_w')}, \\(\\sum w = ${wSum.toFixed(2)}\\)</span>`
            : `<span style="color:var(--text-muted); margin-left:8px;">${t('stat_note_u')}</span>`;

            show(`
            <div style="text-align:left; line-height:1.9; padding:5px 0;">
            \\(n = ${n}\\) ${noteHtml}<br>
            \\(\\bar{x} = ${mean.toFixed(4)}\\)<br>
            \\(s^2_{${denLabel}} = \\frac{${varNum.toFixed(4)}}{${divisor}} = ${variance.toFixed(4)}\\)<br>
            \\(s = ${stdDev.toFixed(4)}\\)<br>
            \\(CV = ${cv.toFixed(2)}\\%\\)<br>
            \\(\\min = ${Math.min(...vals).toFixed(4)} \\quad \\max = ${Math.max(...vals).toFixed(4)}\\)
            </div>
            `);
        } catch (e) {
            show(`❌ ${e.message}`, true);
        }
    };

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]));
}
