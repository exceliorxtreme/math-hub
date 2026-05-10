// modules/modulara/continue.js
import { t } from '../../utils/i18n.js';

const MAX_ITER = 200;

const calcContFracSqrt = (D) => {
    D = Math.floor(D);
    if (D <= 0) return { error: 'invalid_d' };
    const a0 = Math.floor(Math.sqrt(D));
    if (a0 * a0 === D) return { error: 'perfect_square' };

    let m = 0, d = 1, a = a0;
    const period = [];
    for (let k = 0; k < MAX_ITER; k++) {
        m = d * a - m;
        d = (D - m * m) / d;
        if (d === 0) return { error: 'calc_error' };
        a = Math.floor((a0 + m) / d);
        period.push(a);
        if (a === 2 * a0) break;
    }
    return { success: true, a0, period, D };
};

const getConvergents = (a0, period, count = 6) => {
    const fullSeq = [a0];
    for (let i = 0; i < count; i++) fullSeq.push(period[i % period.length]);

    let p_m2 = 0n, p_m1 = 1n;
    let q_m2 = 1n, q_m1 = 0n;
    const res = [];

    for (let i = 0; i <= count; i++) {
        const a = BigInt(fullSeq[i]);
        const p = a * p_m1 + p_m2;
        const q = a * q_m1 + q_m2;
        res.push({ p, q, a });
        p_m2 = p_m1; p_m1 = p;
        q_m2 = q_m1; q_m1 = q;
    }
    return res;
};

export function initUI() {
    const ws = document.getElementById('workspace');
    ws.innerHTML = `
    <h2 data-i18n="cf_title">${t('cf_title')}</h2>
    <div class="description" data-i18n="cf_desc">${t('cf_desc')}</div>

    <!-- 1️⃣ Formă & Periodicitate -->
    <div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#6c3483); margin-top:15px;">${t('cf_sec_theory')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="cf_basic">${t('cf_basic')}</div>
    <div class="fbody">
    <div class="fline">\\(\\sqrt{D} = [a_0; \\overline{a_1, a_2, \\dots, a_k}]\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('cf_basic_note')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="cf_conv">${t('cf_conv')}</div>
    <div class="fbody">
    <div class="fline">\\(\\frac{p_k}{q_k} = a_0 + \\cfrac{1}{a_1 + \\cfrac{1}{\\ddots + \\cfrac{1}{a_k}}}\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('cf_conv_note')}</div>
    </div>
    </div>
    </div>

    <!-- 2️⃣ Calculator & Convergenți -->
    <div class="fsec" style="background:linear-gradient(90deg,#2980b9,#3498db); margin-top:15px;">${t('cf_sec_calc')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="cf_calc_title">${t('cf_calc_title')}</div>
    <div class="fbody">
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
    <input id="cf-d" type="number" min="2" max="9999" placeholder="D (ex: 2, 3, 7, 61)" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <button id="btn-cf" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;">${t('cf_btn_calc')}</button>
    </div>
    <div id="out-cf" style="font-size:0.9rem; line-height:1.6; color:var(--text);"></div>
    <div id="table-cf" style="margin-top:10px; overflow-x:auto;"></div>
    </div>
    </div>
    </div>
    `;

    document.getElementById('btn-cf').addEventListener('click', () => {
        const D = Number(document.getElementById('cf-d').value);
        const out = document.getElementById('out-cf');
        const tbl = document.getElementById('table-cf');
        const btn = document.getElementById('btn-cf');

        if (!Number.isFinite(D) || D < 2) {
            out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t('cf_err_input')}</span>`;
            return;
        }

        btn.disabled = true;
        btn.textContent = '⏳ Calculez...';
        out.innerHTML = '';
        tbl.innerHTML = '';

        setTimeout(() => {
            try {
                const res = calcContFracSqrt(D);
                if (res.error) {
                    const errKey = `cf_err_${res.error}`;
                    out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t(errKey) || 'Eroare de calcul.'}</span>`;
                } else {
                    const periodStr = `[${res.a0}; \\overline{${res.period.join(', ')}}]`;
                    out.innerHTML = `
                    <div class="fline">\\(\\sqrt{${res.D}} = ${periodStr}\\)</div>
                    <div class="fline" style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">${t('cf_period_note')} ${res.period.length}</div>
                    `;

                    const convs = getConvergents(res.a0, res.period, 5);
                    let html = `<table style="width:100%; border-collapse:collapse; font-size:0.88rem; color:var(--text);">
                    <tr style="border-bottom:1px solid var(--border);">
                    <th style="padding:6px; text-align:left;">k</th>
                    <th style="padding:6px;">aₖ</th>
                    <th style="padding:6px;">pₖ / qₖ</th>
                    <th style="padding:6px;">Valoare</th>
                    <th style="padding:6px;">Eroare</th>
                    </tr>`;

                    const trueVal = Math.sqrt(res.D);
                    convs.forEach((c, i) => {
                        const val = Number(c.p) / Number(c.q);
                        const err = Math.abs(val - trueVal).toExponential(4);
                        html += `<tr style="border-bottom:1px dashed var(--border);">
                        <td style="padding:4px;">${i}</td>
                        <td style="padding:4px; text-align:center;">${c.a}</td>
                        <td style="padding:4px; text-align:center;">\\(\\frac{${c.p}}{${c.q}}\\)</td>
                        <td style="padding:4px; text-align:center;">${val.toFixed(6)}</td>
                        <td style="padding:4px; text-align:center; color:var(--text-muted);">${err}</td>
                        </tr>`;
                    });
                    html += '</table>';
                    tbl.innerHTML = html;
                }
            } catch (e) {
                out.innerHTML = `<span style="color:#e74c3c;">❌ ${t('cf_err_calc')}</span>`;
            } finally {
                // ✅ Garantăm reactivarea butonului indiferent de rezultat
                btn.disabled = false;
                btn.textContent = t('cf_btn_calc');
                if (window.MathJax?.typesetPromise) MathJax.typesetPromise([out, tbl]).catch(() => {});
            }
        }, 50);
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
