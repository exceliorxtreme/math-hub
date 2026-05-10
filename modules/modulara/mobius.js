// modules/modulara/mobius.js
import { t } from '../../utils/i18n.js';

// 🔧 Funcții auxiliare (optimizate pentru n ≤ 10^7)
const primeFactors = (n) => {
    const factors = [];
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            let exp = 0;
            while (n % i === 0) { n /= i; exp++; }
            factors.push({ p: i, exp });
        }
    }
    if (n > 1) factors.push({ p: n, exp: 1 });
    return factors;
};

const mobius = (n) => {
    if (n === 1) return 1;
    const f = primeFactors(n);
    return f.some(x => x.exp > 1) ? 0 : (f.length % 2 === 0 ? 1 : -1);
};

const totient = (n) => {
    let res = n;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            while (n % i === 0) n /= i;
            res -= res / i;
        }
    }
    return n > 1 ? res - res / n : res;
};

const tau = (n) => primeFactors(n).reduce((a, f) => a * (f.exp + 1), 1);
const sigma = (n) => primeFactors(n).reduce((a, f) => {
    const p = f.p, k = f.exp;
    return a * (Math.pow(p, k + 1) - 1) / (p - 1);
}, 1);

export function initUI() {
    const ws = document.getElementById('workspace');
    ws.innerHTML = `
    <h2 data-i18n="mobius_title">${t('mobius_title')}</h2>
    <div class="description" data-i18n="mobius_desc">${t('mobius_desc')}</div>

    <!-- 1️⃣ Funcții de Bază -->
    <div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#6c3483); margin-top:15px;">${t('mobius_sec_funcs')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="mobius_mu">${t('mobius_mu')}</div>
    <div class="fbody">
    <div class="fline">\\(\\mu(n) = \\begin{cases} 1 & n=1 \\\\ (-1)^k & n=p_1p_2\\dots p_k \\\\ 0 & \\exists p^2 \\mid n \\end{cases}\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('mobius_mu_note')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="mobius_phi">${t('mobius_phi')}</div>
    <div class="fbody">
    <div class="fline">\\(\\varphi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right)\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('mobius_phi_note')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="mobius_tau">${t('mobius_tau')}</div>
    <div class="fbody">
    <div class="fline">\\(\\tau(n) = \\prod_{i=1}^k (e_i + 1) \\quad (n = \\prod p_i^{e_i})\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('mobius_tau_note')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="mobius_sigma">${t('mobius_sigma')}</div>
    <div class="fbody">
    <div class="fline">\\(\\sigma(n) = \\prod_{i=1}^k \\frac{p_i^{e_i+1}-1}{p_i-1}\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('mobius_sigma_note')}</div>
    </div>
    </div>
    </div>

    <!-- 2️⃣ Proprietăți & Inversiune -->
    <div class="fsec" style="background:linear-gradient(90deg,#2980b9,#3498db); margin-top:15px;">${t('mobius_sec_props')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="mobius_mult_title">${t('mobius_mult_title')}</div>
    <div class="fbody">
    <div class="fline">\\(f(mn) = f(m)f(n) \\quad \\text{dacă } \\gcd(m,n)=1\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('mobius_mult_note')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="mobius_inv_title">${t('mobius_inv_title')}</div>
    <div class="fbody">
    <div class="fline">\\(g(n) = \\sum_{d \\mid n} f(d) \\iff f(n) = \\sum_{d \\mid n} \\mu(d) g\\left(\\frac{n}{d}\\right)\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('mobius_inv_note')}</div>
    </div>
    </div>
    </div>

    <!-- 3️⃣ Calculator Interactiv -->
    <div class="fsec" style="background:linear-gradient(90deg,#27ae60,#2ecc71); margin-top:15px;">${t('mobius_sec_calc')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="mobius_calc_title">${t('mobius_calc_title')}</div>
    <div class="fbody">
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
    <input id="mob-n" type="number" min="1" max="10000000" placeholder="n (ex: 12, 30, 100)" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <button id="btn-mob" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;">${t('mobius_btn_calc')}</button>
    </div>
    <div id="out-mob" style="font-size:0.9rem; line-height:1.6; color:var(--text);"></div>
    </div>
    </div>
    </div>
    `;

    // 🔹 Calculator
    document.getElementById('btn-mob').addEventListener('click', () => {
        const n = Number(document.getElementById('mob-n').value);
        const out = document.getElementById('out-mob');
        if (!Number.isInteger(n) || n < 1) return out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t('mobius_err_input')}</span>`;
        if (n > 10000000) return out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t('mobius_err_limit')}</span>`;

        const f = primeFactors(n);
        const factorStr = f.map(x => `p=${x.p}, e=${x.exp}`).join(', ') || (n===1 ? 'n=1' : '');

        out.innerHTML = `
        <div class="fline">\\(n = ${n} \\implies \\text{factori: } ${factorStr}\\)</div>
        <div class="fline">\\(\\mu(${n}) = ${mobius(n)}\\)</div>
        <div class="fline">\\(\\varphi(${n}) = ${totient(n)}\\)</div>
        <div class="fline">\\(\\tau(${n}) = ${tau(n)}\\)</div>
        <div class="fline">\\(\\sigma(${n}) = ${sigma(n)}\\)</div>
        <div class="fline" style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">${t('mobius_calc_note')}</div>
        `;
        if (window.MathJax?.typesetPromise) MathJax.typesetPromise([out]).catch(() => {});
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
