// modules/modulara/pell.js
import { t } from '../../utils/i18n.js';

const MAX_ITER = 3000;
const MAX_DIGITS = 250;

const pellFundamental = (D, target = 1n) => {
    D = BigInt(D); target = BigInt(target);
    if (D <= 0n) return { error: 'invalid_d' };
    const a0 = BigInt(Math.floor(Number(D) ** 0.5));
    if (a0 * a0 === D) return { error: 'perfect_square' };

    let m = 0n, d = 1n, a = a0;
    let p1 = a0, p0 = 1n;
    let q1 = 1n, q0 = 0n;

    for (let k = 0; k < MAX_ITER; k++) {
        const val = p1 * p1 - D * q1 * q1;
        if (val === target) return { success: true, x: p1, y: q1, eq: Number(target) };

        // 🛑 Safety guard: prevenire explozie memorie
        if (k % 100 === 0) {
            const pStr = p1.toString(), qStr = q1.toString();
            if (pStr.length > MAX_DIGITS || qStr.length > MAX_DIGITS) return { error: 'size_limit' };
        }

        m = d * a - m;
        d = (D - m * m) / d;
        if (d === 0n) break;
        a = (a0 + m) / d;

        const p2 = a * p1 + p0;
        const q2 = a * q1 + q0;
        p0 = p1; p1 = p2;
        q0 = q1; q1 = q2;
    }
    return { error: 'iter_limit' };
};

export function initUI() {
    const ws = document.getElementById('workspace');
    ws.innerHTML = `
    <h2 data-i18n="pell_title">${t('pell_title')}</h2>
    <div class="description" data-i18n="pell_desc">${t('pell_desc')}</div>

    <!-- 1️⃣ Formă & Condiții -->
    <div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#6c3483); margin-top:15px;">${t('pell_sec_form')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="pell_basic_title">${t('pell_basic_title')}</div>
    <div class="fbody">
    <div class="fline">\\(x^2 - D y^2 = 1 \\quad (\\text{clasica})\\)</div>
    <div class="fline">\\(x^2 - D y^2 = -1 \\quad (\\text{există doar pt. anumite } D)\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('pell_basic_cond')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="pell_general_title">${t('pell_general_title')}</div>
    <div class="fbody">
    <div class="fline">\\(x_k + y_k\\sqrt{D} = (x_1 + y_1\\sqrt{D})^k, \\quad k \\in \\mathbb{N}\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('pell_general_note')}</div>
    </div>
    </div>
    </div>

    <!-- 2️⃣ Solver Fundamental -->
    <div class="fsec" style="background:linear-gradient(90deg,#2980b9,#3498db); margin-top:15px;">${t('pell_sec_solver')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="pell_fund_title">${t('pell_fund_title')}</div>
    <div class="fbody">
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
    <input id="pell-d" type="number" placeholder="D (ex: 2, 3, 5)" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <select id="pell-target" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <option value="1">= 1</option>
    <option value="-1">= -1</option>
    </select>
    <button id="btn-pell" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;">${t('pell_btn_solve')}</button>
    </div>
    <div id="out-pell" style="font-size:0.9rem; line-height:1.6; color:var(--text);"></div>
    </div>
    </div>
    </div>

    <!-- 3️⃣ Verificare -->
    <div class="fsec" style="background:linear-gradient(90deg,#27ae60,#2ecc71); margin-top:15px;">${t('pell_sec_verify')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="pell_verify_title">${t('pell_verify_title')}</div>
    <div class="fbody">
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
    <input id="v-x" type="number" placeholder="x" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <input id="v-y" type="number" placeholder="y" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <input id="v-d" type="number" placeholder="D" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <button id="btn-verify" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;">${t('pell_btn_verify')}</button>
    </div>
    <div id="out-verify" style="font-size:0.9rem; line-height:1.6; color:var(--text);"></div>
    </div>
    </div>
    </div>
    `;

    // 🔹 Solver Fundamental (cu protecții)
    document.getElementById('btn-pell').addEventListener('click', () => {
        const D = Number(document.getElementById('pell-d').value);
        const target = Number(document.getElementById('pell-target').value);
        const out = document.getElementById('out-pell');
        const btn = document.getElementById('btn-pell');

        if (!Number.isFinite(D) || D < 2) return out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t('pell_err_d')}</span>`;

        btn.disabled = true; btn.textContent = '⏳ Calculez...';

        // 🔁 Yield pentru a nu bloca UI
        setTimeout(() => {
            try {
                const res = pellFundamental(D, target);
                if (res.success) {
                    out.innerHTML = `
                    <div class="fline">\\(x^2 - ${D} y^2 = ${res.eq}\\)</div>
                    <div class="fline">\\(x_1 = ${res.x}, \\quad y_1 = ${res.y}\\)</div>
                    <div class="fline" style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">${res.eq === 1 ? t('pell_fund_note') : t('pell_minus1_note')}</div>
                    `;
                } else {
                    let msg = '';
                    if (res.error === 'perfect_square') msg = t('pell_err_perfect_sq');
                    else if (res.error === 'size_limit') msg = t('pell_err_size');
                    else if (res.error === 'iter_limit') msg = t('pell_err_limit');
                    else msg = target === -1 ? t('pell_err_no_minus1') : t('pell_err_nosol');
                    out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${msg}</span>`;
                }
            } catch (e) {
                out.innerHTML = `<span style="color:#e74c3c;">❌ ${t('pell_err_calc')}</span>`;
            }
            btn.disabled = false; btn.textContent = t('pell_btn_solve');
            if (window.MathJax?.typesetPromise) MathJax.typesetPromise([out]).catch(() => {});
        }, 50);
    });

    // 🔹 Verificare
    document.getElementById('btn-verify').addEventListener('click', () => {
        const x = BigInt(document.getElementById('v-x').value || '0');
        const y = BigInt(document.getElementById('v-y').value || '0');
        const D = BigInt(document.getElementById('v-d').value || '1');
        const out = document.getElementById('out-verify');

        if (D <= 0n) return out.innerHTML = `<span style="color:#e74c3c;">⚠️ D > 0 necesar.</span>`;
        const res = x*x - D*y*y;
        const ok = res === 1n || res === -1n;
        out.innerHTML = `
        <div class="fline">\\(${x}^2 - ${D} \\cdot ${y}^2 = ${res}\\)</div>
        <div class="fline" style="color:${ok ? 'var(--accent)' : '#e74c3c'}; font-weight:600; margin-top:4px;">${ok ? (res === 1n ? '✅ Soluție validă pentru = 1' : '✅ Soluție validă pentru = -1') : '❌ Nu satisface Pell'}</div>
        `;
        if (window.MathJax?.typesetPromise) MathJax.typesetPromise([out]).catch(() => {});
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
