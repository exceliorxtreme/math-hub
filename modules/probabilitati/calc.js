// modules/probabilitati/calc.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="prob_calc_title">${t('prob_calc_title')}</h2>
    <div class="description" data-i18n="prob_calc_desc">${t('prob_calc_desc')}</div>
    <div class="input-group">
    <label data-i18n="prob_mode">${t('prob_mode')}</label>
    <select id="prob-mode">
    <option value="classic" data-i18n="prob_mode_classic">${t('prob_mode_classic')}</option>
    <option value="cond" data-i18n="prob_mode_cond">${t('prob_mode_cond')}</option>
    <option value="bayes" data-i18n="prob_mode_bayes">${t('prob_mode_bayes')}</option>
    <option value="exp" data-i18n="prob_mode_exp">${t('prob_mode_exp')}</option>
    </select>
    </div>
    <div id="prob-inputs"></div>
    <div class="btn-group btn-group-1">
    <button type="button" id="btn-calc-prob" data-i18n="prob_btn_calc">${t('prob_btn_calc')}</button>
    </div>
    `;

    const inputsContainer = document.getElementById('prob-inputs');
    const modeSelect = document.getElementById('prob-mode');

    const templates = {
        classic: `<div class="input-group"><label data-i18n="prob_lbl_fav">${t('prob_lbl_fav')}</label><input id="p-fav" type="number" step="any"></div>
        <div class="input-group"><label data-i18n="prob_lbl_total">${t('prob_lbl_total')}</label><input id="p-total" type="number" step="any"></div>`,
        cond: `<div class="input-group"><label data-i18n="prob_label_pab">${t('prob_label_pab')}</label><input id="p-inter" type="number" step="any"></div>
        <div class="input-group"><label data-i18n="prob_label_pb">${t('prob_label_pb')}</label><input id="p-b" type="number" step="any"></div>`,
        bayes: `<div class="input-group"><label data-i18n="prob_label_pab">${t('prob_label_pab')}</label><input id="p-pab" type="number" step="any"></div>
        <div class="input-group"><label data-i18n="prob_label_pb">${t('prob_label_pb')}</label><input id="p-pb" type="number" step="any"></div>
        <div class="input-group"><label data-i18n="prob_label_panb">${t('prob_label_panb')}</label><input id="p-panb" type="number" step="any"></div>
        <div class="input-group"><label data-i18n="prob_label_pnb">${t('prob_label_pnb')}</label><input id="p-pnb" type="number" step="any"></div>`,
        exp: `<div class="input-group"><label data-i18n="prob_lbl_pairs">${t('prob_lbl_pairs')}</label>
        <textarea id="p-pairs" rows="3" placeholder="${t('prob_hint_example')}"></textarea>
        <small style="color:var(--text-muted)" data-i18n="prob_pairs_hint">${t('prob_pairs_hint')}</small></div>`
    };

    // Funcție helper pentru re-randare traduceri dinamice
    function refreshInputs() {
        inputsContainer.innerHTML = templates[modeSelect.value];
    }

    modeSelect.addEventListener('change', refreshInputs);
    modeSelect.dispatchEvent(new Event('change'));

    // 🔁 Re-traduce inputurile când se schimbă limba global
    document.addEventListener('lang:changed', refreshInputs);

    function show(html, err = false) {
        resBox.style.display = 'block';
        resBox.innerHTML = html;
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        if (window.MathJax?.typesetPromise) {
            requestAnimationFrame(() => MathJax.typesetPromise([resBox]).catch(() => {}));
        }
    }

    document.getElementById('btn-calc-prob').onclick = () => {
        try {
            const m = modeSelect.value;
            if (m === 'classic') {
                const f = parseFloat(document.getElementById('p-fav').value), total = parseFloat(document.getElementById('p-total').value);
                if (isNaN(f)||isNaN(total)||total<=0||f<0||f>total) throw new Error(t('prob_err_classic') || "Valori invalide.");
                const p = f/total; show(`\\(P = \\frac{${f}}{${total}} = ${p.toFixed(4)} = ${(p*100).toFixed(2)}\\%\\)`);
            } else if (m === 'cond') {
                const i = parseFloat(document.getElementById('p-inter').value), b = parseFloat(document.getElementById('p-b').value);
                if (isNaN(i)||isNaN(b)||b<=0) throw new Error(t('prob_err_cond') || "P(B) trebuie > 0.");
                const p = i/b; show(`\\(P(A|B) = \\frac{${i}}{${b}} = ${p.toFixed(4)} = ${(p*100).toFixed(2)}\\%\\)`);
            } else if (m === 'bayes') {
                const ab=parseFloat(document.getElementById('p-pab').value), pb=parseFloat(document.getElementById('p-pb').value);
                const anb=parseFloat(document.getElementById('p-panb').value), pnb=parseFloat(document.getElementById('p-pnb').value);
                if ([ab,pb,anb,pnb].some(v=>isNaN(v)||v<0||v>1)) throw new Error(t('prob_err_bayes') || "Probabilități între 0 și 1.");
                const num = ab*pb, den = num + anb*pnb, res = num/den;
                show(`\\(P(B|A) = \\frac{${num.toFixed(4)}}{${den.toFixed(4)}} = ${res.toFixed(4)} = ${(res*100).toFixed(2)}\\%\\)`);
            } else if (m === 'exp') {
                const raw = document.getElementById('p-pairs').value;
                const pairs = raw.split(/[;\n]+/).map(s=>s.split(/[, ]+/).map(Number)).filter(a=>a.length===2&&!isNaN(a[0])&&!isNaN(a[1]));
                if (!pairs.length) throw new Error(t('prob_err_exp') || "Introduceți perechi valide.");
                let exp=0, sumP=0;
                pairs.forEach(([v,p])=>{ if(p<0||p>1) throw new Error(t('prob_err_prob_range')); exp+=v*p; sumP+=p; });
                if (Math.abs(sumP-1)>1e-5) throw new Error((t('prob_err_sum_p') || "Σp ≠ 1") + ` (${sumP.toFixed(3)})`);
                show(`\\(E[X] = \\sum x_i p_i = ${exp.toFixed(4)}\\)`);
            }
        } catch(e) { show(`❌ ${e.message}`, true); }
    };

    if (window.MathJaz?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]));
}
