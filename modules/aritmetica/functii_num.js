// modules/aritmetica/functii_num.js
import { t } from '../../utils/i18n.js';

function calcNumTheory(n) {
    if (n < 1) throw new Error("n trebuie să fie ≥ 1");
    let temp = n, factors = [];
    for (let p = 2; p * p <= temp; p++) {
        if (temp % p === 0) {
            let count = 0;
            while (temp % p === 0) { temp /= p; count++; }
            factors.push({ p, count });
        }
    }
    if (temp > 1) factors.push({ p: temp, count: 1 });

    let d_val = 1;
    let sigma_val = 1n;
    let phi_val = BigInt(n); // ✅ Start corect

    let factorStr = factors.length ? factors.map(f => `${f.p}^{${f.count}}`).join(' \\times ') : "1";

    for (let f of factors) {
        let p = BigInt(f.p);
        let a = f.count;

        d_val *= (a + 1);
        sigma_val *= (p ** BigInt(a + 1) - 1n) / (p - 1n);

        // ✅ FIX: Formulă safe pentru BigInt (evită trunchierea la 0)
        phi_val = phi_val - (phi_val / p);
    }

    return { factorStr, d_val, sigma_val, phi_val };
}

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="nt_title">${t('nt_title')}</h2>
    <div class="description" data-i18n="nt_desc">${t('nt_desc')}</div>
    <div class="input-group">
    <label data-i18n="nt_lbl">${t('nt_lbl')}</label>
    <input id="fn-n" type="number" min="1" max="100000000000000" placeholder="Ex: 360, 1001">
    </div>
    <div class="btn-group btn-group-1">
    <button id="btn-fn-calc" data-i18n="nt_btn">${t('nt_btn')}</button>
    </div>
    `;

    function show(html, err = false) {
        resBox.style.display = 'block'; resBox.innerHTML = html;
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        requestAnimationFrame(() => { if (window.MathJax?.typesetPromise) MathJax.typesetPromise([resBox]).catch(() => {}); });
    }

    document.getElementById('btn-fn-calc').addEventListener('click', () => {
        try {
            const val = document.getElementById('fn-n').value.trim();
            if (!val) throw new Error(t('nt_err_empty') || "Introduceți un număr.");
            const n = Number(val);
            if (n > 1e14) throw new Error(t('nt_err_max') || "Număr prea mare. Maxim 10¹⁴.");

            const res = calcNumTheory(n);
            const out = `
            <div style="text-align:left;line-height:1.85;font-size:0.95rem;padding:5px 0;">
            <strong>${t('nt_res_fact')}</strong><br>\\(n = ${res.factorStr}\\)<br><br>
            <strong>${t('nt_res_d')}</strong><br>\\(d(n) = \\prod (a_i+1) = ${res.d_val}\\)<br><br>
            <strong>${t('nt_res_sigma')}</strong><br>\\(\\sigma(n) = \\prod \\frac{p_i^{a_i+1}-1}{p_i-1} = ${res.sigma_val}\\)<br><br>
            <strong>${t('nt_res_phi')}</strong><br>\\(\\varphi(n) = n \\prod (1-\\frac{1}{p_i}) = ${res.phi_val}\\)
            </div>`;
            show(out);
        } catch(e) { show(`❌ ${e.message}`, true); }
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]));
}
