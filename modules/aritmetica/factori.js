// modules/aritmetica/factori.js
import { t } from '../../utils/i18n.js';

function gcd(a, b) {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b) { [a, b] = [b, a % b]; }
    return a;
}

function lcm(a, b) {
    if (a === 0n || b === 0n) return 0n;
    return (a < 0n ? -a : a) * (b < 0n ? -b : b) / gcd(a, b);
}

function factorize(n) {
    if (n < 2) throw new Error(t('fact_err_min') || "Numerele trebuie să fie ≥ 2");
    const factors = [];
    let temp = n;
    for (let p = 2; p * p <= temp; p++) {
        if (temp % p === 0) {
            let count = 0;
            while (temp % p === 0) { temp /= p; count++; }
            factors.push({ p, count });
        }
    }
    if (temp > 1) factors.push({ p: temp, count: 1 });
    return factors;
}

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="fact_title">${t('fact_title')}</h2>
    <div class="description" data-i18n="fact_desc">${t('fact_desc')}</div>
    <div class="input-group">
    <label data-i18n="fact_lbl_a">${t('fact_lbl_a')}</label>
    <input id="fact-a" type="number" min="1" max="100000000000000" placeholder="Ex: 360">
    </div>
    <div class="input-group">
    <label data-i18n="fact_lbl_b">${t('fact_lbl_b')}</label>
    <input id="fact-b" type="number" min="1" max="100000000000000" placeholder="Ex: 1001">
    </div>
    <div class="btn-group btn-group-3">
    <button id="btn-factor" data-i18n="fact_btn">${t('fact_btn')}</button>
    <button id="btn-gcd" style="background:#e67e22" data-i18n="fact_btn_gcd">${t('fact_btn_gcd')}</button>
    <button id="btn-lcm" style="background:#2ecc71" data-i18n="fact_btn_lcm">${t('fact_btn_lcm')}</button>
    </div>
    `;

    function show(content, err = false, allowHtml = false) {
        resBox.style.display = 'block';
        resBox.textContent = content;
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        requestAnimationFrame(() => {
            if (window.MathJax?.typesetPromise) MathJax.typesetPromise([resBox]).catch(() => {});
        });
    }

    const getVal = id => BigInt(document.getElementById(id).value.trim() || '0');

    document.getElementById('btn-factor').addEventListener('click', () => {
        try {
            const a = getVal('fact-a');
            if (a < 2n) throw new Error(t('fact_err_min') || "Numărul trebuie să fie ≥ 2");
            if (a > 100000000000000n) throw new Error(t('fact_err_max') || "Maxim 10¹⁴");
            const factors = factorize(Number(a));
            const latex = factors.map(f => f.count === 1 ? `${f.p}` : `${f.p}^{${f.count}}`).join(' \\times ');
            show(`\\(${a} = ${latex}\\)`, false, true);
        } catch (e) { show(`❌ ${e.message}`, true); }
    });

    document.getElementById('btn-gcd').addEventListener('click', () => {
        try {
            const a = getVal('fact-a');
            const b = getVal('fact-b');
            if (a < 1n || b < 1n) throw new Error(t('fact_err_min') || "Numerele trebuie să fie ≥ 1");
            const rez = gcd(a, b);
            show(`\\(CMMDC(${a}, ${b}) = ${rez}\\)`, false, true);
        } catch (e) { show(`❌ ${e.message}`, true); }
    });

    document.getElementById('btn-lcm').addEventListener('click', () => {
        try {
            const a = getVal('fact-a');
            const b = getVal('fact-b');
            if (a < 1n || b < 1n) throw new Error(t('fact_err_min') || "Numerele trebuie să fie ≥ 1");
            const rez = lcm(a, b);
            show(`\\(CMMMC(${a}, ${b}) = ${rez}\\)`, false, true);
        } catch (e) { show(`❌ ${e.message}`, true); }
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]));
}
