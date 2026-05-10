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

function bigFact(n) {
    if (n < 0n) return 0n;
    let r = 1n;
    for (let i = 2n; i <= n; i++) r *= i;
    return r;
}

function stirlingApprox(n) {
    if (n < 1n) return 1;
    const ln2PI = Math.log(2 * Math.PI);
    const nn = Number(n);
    const lnFact = nn * Math.log(nn) - nn + 0.5 * (ln2PI + Math.log(nn));
    return Math.floor(lnFact / Math.LN10) + 1;
}

export function initUI() {
    const ws = document.getElementById('workspace');

    // ✅ 1. Injectăm HTML-ul mai întâi
    ws.innerHTML = `
    <h2 data-i18n="comb_title">${t('comb_title')}</h2>
    <div class="description" data-i18n="comb_desc">${t('comb_desc')}</div>

    <!-- Inputs C/A/Pₙ -->
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

    <!-- Butoane C / A / Pₙ -->
    <div class="btn-group">
    <button id="btn-c" style="background:#e67e22;" data-i18n="comb_btn_c">${t('comb_btn_c')}</button>
    <button id="btn-a" style="background:#555; color:#fff; border-color:#444;" data-i18n="comb_btn_a">${t('comb_btn_a')}</button>
    <button id="btn-p" style="background:linear-gradient(90deg,#9b59b6,#8e44ad); color:#fff;" data-i18n="comb_btn_p">${t('comb_btn_p')}</button>
    </div>

    <!-- ✅ CASETA DE REZULTAT (poziționată CORECT: după butoane, înainte de Legendre) -->
    <div id="comb-result" class="result-box" style="display:none; margin:12px 0 20px 0; padding:12px; background:var(--input-bg); border-left:4px solid var(--accent); border-radius:6px;" aria-live="polite"></div>

    <!-- 🔢 Legendre Section -->
    <div class="fsec" style="background:linear-gradient(90deg,#2980b9,#3498db); margin-top:15px;" data-i18n="leg_title">
    ${t('leg_title')}
    </div>
    <div style="margin-top:12px; padding:12px; background:var(--input-bg); border:1px solid var(--border); border-radius:8px;">
    <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:10px;">
    <label data-i18n="leg_lbl_n">${t('leg_lbl_n')}</label>
    <input id="leg-n" type="number" min="1" max="10000" value="10" style="width:60px; text-align:center; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <label data-i18n="leg_lbl_p" style="margin-left:8px;">${t('leg_lbl_p')}</label>
    <input id="leg-p" type="number" min="2" max="997" value="2" style="width:60px; text-align:center; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <button id="btn-leg" type="button" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;" data-i18n="leg_btn">${t('leg_btn')}</button>
    </div>
    <div id="leg-output" style="font-size:0.95rem; line-height:1.6; color:var(--text);"></div>
    </div>
    `;

    // ✅ 2. ACUM elementul există în DOM → putem să-l referențiem
    const resBox = document.getElementById('comb-result');

    // 🔢 Legendre's Formula (i18n + MathJax sync)
    const calcLegendre = () => {
        const n = parseInt(document.getElementById('leg-n').value);
        const p = parseInt(document.getElementById('leg-p').value);
        const out = document.getElementById('leg-output');

        if (isNaN(n) || n < 1) return out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t('leg_err_n')}</span>`;
        if (isNaN(p) || p < 2) return out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t('leg_err_p')}</span>`;

        const isPrime = num => {
            if (num < 2) return false;
            for (let i = 2; i * i <= num; i++) if (num % i === 0) return false;
            return true;
        };
        if (!isPrime(p)) return out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t('leg_err_not_prime')}</span>`;

        let exp = 0, power = p;
        const steps = [];
        while (power <= n) {
            steps.push(`\\left\\lfloor \\frac{${n}}{${power}} \\right\\rfloor`);
            exp += Math.floor(n / power);
            if (n / p < power) break;
            power *= p;
        }

        const formula = `\\(E_${p}(${n}!) = \\sum_{k=1}^{\\infty} \\left\\lfloor \\frac{${n}}{${p}^k} \\right\\rfloor = {\\color{#3498db}${exp}}\\)`;
        const stepsLatex = steps.join(' + ') + ' + \\cdots = ' + exp;

        out.innerHTML = `
        <div style="margin-bottom:8px;">${formula}</div>
        <div style="color:var(--text-muted); font-size:0.85rem;">${t('leg_detail_label')} \\(${stepsLatex}\\)</div>
        `;
        if (window.MathJax?.typesetPromise) MathJax.typesetPromise([out]).catch(() => {});
    };

    document.getElementById('btn-leg').addEventListener('click', calcLegendre);
    document.getElementById('leg-n').addEventListener('change', calcLegendre);
    document.getElementById('leg-p').addEventListener('change', calcLegendre);
    calcLegendre();

    // 📦 Funcție helper pentru afișarea rezultatelor C/A/Pₙ
    function show(html, err = false) {
        if (!resBox) return; // ✅ Guard clause
        resBox.style.display = 'block';
        resBox.innerHTML = html;
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        if (window.MathJax?.typesetPromise) MathJax.typesetPromise([resBox]).catch(() => {});
    }

    // 🔹 Combinări C(n,k)
    document.getElementById('btn-c').addEventListener('click', () => {
        try {
            const n = BigInt(document.getElementById('c-n').value);
            const k = BigInt(document.getElementById('c-k').value);
            if (n < 0n || k < 0n || k > n) throw new Error(t('comb_err_range'));
            const rez = bigC(n, k);
            show(`\\(C(${n}, ${k}) = \\frac{${n}!}{${k}!(${n}-${k})!} = \\) <span style="font-size:1.4em;color:var(--accent)">${rez}</span>`);
        } catch (e) { show(`❌ ${e.message}`, true); }
    });

    // 🔹 Aranjamente A(n,k)
    document.getElementById('btn-a').addEventListener('click', () => {
        try {
            const n = BigInt(document.getElementById('c-n').value);
            const k = BigInt(document.getElementById('c-k').value);
            if (n < 0n || k < 0n || k > n) throw new Error(t('comb_err_range'));
            const rez = bigA(n, k);
            show(`\\(A(${n}, ${k}) = \\frac{${n}!}{(${n}-${k})!} = \\) <span style="font-size:1.4em;color:var(--accent)">${rez}</span>`);
        } catch (e) { show(`❌ ${e.message}`, true); }
    });

    // 🔹 Permutări Pₙ = n! + Stirling
    document.getElementById('btn-p').addEventListener('click', () => {
        try {
            const n = BigInt(document.getElementById('c-n').value);
            if (n < 0n) throw new Error(t('comb_err_nonneg'));
            const rez = bigFact(n);
            const digits = n >= 1n ? stirlingApprox(n) : 1;
            const stirling = n >= 1n
            ? `<br><small style="color:var(--text-muted)">📐 ${t('comb_stirling_note')} ~10^${digits} (${digits} ${t('comb_stirling_digits')})</small>`
            : '';
            show(`\\(P_{${n}} = ${n}! = \\) <span style="font-size:1.3em;color:var(--accent)">${rez}</span>${stirling}`);
        } catch (e) { show(`❌ ${e.message}`, true); }
    });

    // 🎯 MathJax initial render
    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
