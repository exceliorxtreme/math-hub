// modules/algebra/identitati.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');
    ws.innerHTML = `
    <h2 data-i18n="alg_id_title">${t('alg_id_title')}</h2>
    <div class="description" data-i18n="alg_id_desc">${t('alg_id_desc')}</div>

    <!-- 1. IDENTITĂȚI DE BAZĂ -->
    <div class="fsec" style="background:linear-gradient(90deg,#16a085,#1abc9c)" data-i18n="alg_sec_basic">${t('alg_sec_basic')}</div>
    <div class="fcards">
    <div class="fcard"><div class="fhead" data-i18n="alg_sq">${t('alg_sq')}</div><div class="fbody">
    <div class="fline">\\((a\\pm b)^2 = a^2 \\pm 2ab + b^2\\)</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="alg_cb">${t('alg_cb')}</div><div class="fbody">
    <div class="fline">\\((a\\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3\\)</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="alg_sq_diff">${t('alg_sq_diff')}</div><div class="fbody">
    <div class="fline">\\(a^2 - b^2 = (a-b)(a+b)\\)</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="alg_cb_sumdiff">${t('alg_cb_sumdiff')}</div><div class="fbody">
    <div class="fline">\\(a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)\\)</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="alg_4th">${t('alg_4th')}</div><div class="fbody">
    <div class="fline">\\(a^4 - b^4 = (a^2-b^2)(a^2+b^2)\\)</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="alg_3var_sq">${t('alg_3var_sq')}</div><div class="fbody">
    <div class="fline">\\((a+b+c)^2 = a^2+b^2+c^2+2ab+2ac+2bc\\)</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="alg_sym_cubes">${t('alg_sym_cubes')}</div><div class="fbody">
    <div class="fline">\\(a^3+b^3+c^3-3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="alg_sym_cubes_note">${t('alg_sym_cubes_note')}</div>
    </div></div>
    </div>

    <!-- 2. IDENTITĂȚI AVANSATE -->
    <div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#6c3483); margin-top:15px;" data-i18n="alg_sec_advanced">${t('alg_sec_advanced')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="alg_lagrange_real">${t('alg_lagrange_real')} <span class="badge" data-i18n="badge_advanced">${t('badge_advanced')}</span></div>
    <div class="fbody">
    <div class="fline">\\(\\left(\\sum_{i=1}^n x_i^2\\right)\\left(\\sum_{i=1}^n y_i^2\\right) - \\left(\\sum_{i=1}^n x_i y_i\\right)^2 = \\sum_{1 \\le i < j \\le n} (x_i y_j - x_j y_i)^2\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="alg_lagrange_real_note">${t('alg_lagrange_real_note')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="alg_lagrange_complex">${t('alg_lagrange_complex')} <span class="badge" data-i18n="badge_advanced">${t('badge_advanced')}</span></div>
    <div class="fbody">
    <div class="fline">\\(\\left(\\sum_{i=1}^n |z_i|^2\\right)\\left(\\sum_{i=1}^n |w_i|^2\\right) - \\left|\\sum_{i=1}^n z_i \\overline{w_i}\\right|^2 = \\sum_{1 \\le i < j \\le n} |z_i \\overline{w_j} - z_j \\overline{w_i}|^2\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="alg_lagrange_complex_note">${t('alg_lagrange_complex_note')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="alg_abel_sum">${t('alg_abel_sum')} <span class="badge" data-i18n="badge_advanced">${t('badge_advanced')}</span></div>
    <div class="fbody">
    <div class="fline" style="color:var(--text-muted);font-size:0.83rem; line-height:1.5;" data-i18n="alg_abel_def">${t('alg_abel_def')}</div>
    <div class="fline" style="margin-top:8px; font-size:1.05rem; font-weight:600;" data-i18n="alg_abel_formula">${t('alg_abel_formula')}</div>
    </div>
    </div>
    </div>

    <!-- 3. TRIUNGHIUL PASCAL & BINOM -->
    <div class="fsec" style="background:linear-gradient(90deg,#e67e22,#d35400); margin-top:15px;" data-i18n="alg_sec_binom">${t('alg_sec_binom')}</div>
    <div style="margin-top:12px; padding:12px; background:var(--input-bg); border:1px solid var(--border); border-radius:8px; text-align:center;">
    <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:center; margin-bottom:12px;">
    <label data-i18n="alg_pascal_label">${t('alg_pascal_label')}</label>
    <input id="pascal-n" type="number" min="0" max="8" value="3" style="width:60px; text-align:center; padding:6px;">
    <button id="btn-pascal" type="button" data-i18n="alg_pascal_btn">${t('alg_pascal_btn')}</button>
    </div>
    <div id="pascal-grid" style="overflow-x:auto; padding:8px 0; min-height:50px;"></div>
    <div id="pascal-result" class="result-box" style="margin-top:10px; display:block; text-align:center;" aria-live="polite"></div>
    </div>

    <!-- NOTE -->
    <div style="margin-top:15px; font-size:0.85rem; color:var(--text-muted); line-height:1.6; background:var(--input-bg); padding:10px; border-radius:6px;">
    <strong data-i18n="alg_note_title">${t('alg_note_title')}</strong><br>
    <span data-i18n="alg_note_text">${t('alg_note_text')}</span>
    </div>
    `;

    // 📐 Logică Pascal & Binom
    const renderPascal = () => {
        const nInput = document.getElementById('pascal-n');
        let n = parseInt(nInput.value);
        if (isNaN(n) || n < 0) n = 0;
        if (n > 8) n = 8;
        nInput.value = n;

        const grid = document.getElementById('pascal-grid');
        const res = document.getElementById('pascal-result');
        let html = '';
        let coeffs = [];

        for (let i = 0; i <= n; i++) {
            let row = [];
            for (let j = 0; j <= i; j++) {
                row.push(j === 0 || j === i ? 1 : row[j - 1] + (coeffs[i - 1] ? coeffs[i - 1][j] : 0));
            }
            coeffs.push(row);
            html += `<div style="display:flex; justify-content:center; gap:5px; margin:4px 0;">`;
            row.forEach(v => {
                const hl = i === n ? 'background:var(--accent); color:#000; font-weight:bold; border-color:var(--accent);' : '';
                html += `<span style="padding:5px 8px; border-radius:6px; background:var(--hover-bg); border:1px solid var(--border); ${hl} min-width:28px; display:inline-block;">${v}</span>`;
            });
            html += `</div>`;
        }
        grid.innerHTML = html;

        // Expansiune (a+b)^n
        let terms = coeffs[n].map((c, k) => {
            let t = '';
            if (c > 1) t += `${c}`;
            if (n - k > 0) t += `a${n - k > 1 ? `^{${n - k}}` : ''}`;
            if (k > 0) t += `b${k > 1 ? `^{${k}}` : ''}`;
            return t;
        }).join(' + ');

        res.innerHTML = `\\(${t('alg_binom_res') || '(a+b)^n = '}\\ ${terms}\\)`;
        if (window.MathJax?.typesetPromise) {
            MathJax.typesetPromise([res]).catch(() => {});
        }
    };

    document.getElementById('btn-pascal').addEventListener('click', renderPascal);
    document.getElementById('pascal-n').addEventListener('change', renderPascal);
    renderPascal(); // Randare inițială

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}

