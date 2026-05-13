// modules/analiza/limite.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="lim_title">${t('lim_title')}</h2>
    <div class="description" data-i18n="lim_desc">${t('lim_desc')}</div>

    <!-- 1️⃣ Șiruri Fundamentale -->
    <div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#6c3483); margin-top:15px;">${t('lim_sec_seq')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead">${t('lim_seq_euler')}</div>
    <div class="fbody">
    <div class="fline">\\(H_n = \\sum_{k=1}^n \\frac{1}{k} = 1 + \\frac{1}{2} + \\frac{1}{3} + \\dots + \\frac{1}{n}\\)</div>
    <div class="fline">\\(\\lim_{n \\to \\infty} (H_n - \\ln n) = \\gamma \\approx 0.5772\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lim_seq_note_euler')}</div>
    </div>

    </div>
    <div class="fcard">
    <div class="fhead">${t('lim_seq_e')}</div>
    <div class="fbody">
    <div class="fline">\\(\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e\\)</div>
    <div class="fline">\\(\\lim_{n \\to \\infty} \\left(1 + \\frac{k}{n}\\right)^n = e^k\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lim_seq_note_e')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead">${t('lim_seq_root')}</div>
    <div class="fbody">
    <div class="fline">\\(\\lim_{n \\to \\infty} \\sqrt[n]{a} = 1 \\; (a > 0)\\)</div>
    <div class="fline">\\(\\lim_{n \\to \\infty} \\sqrt[n]{n} = 1\\)</div>
    </div>
    </div>
    </div>

    <!-- 2️⃣ Ierarhia Vitezelor de Creștere -->
    <div class="fsec" style="background:linear-gradient(90deg,#2980b9,#3498db); margin-top:15px;">${t('lim_sec_growth')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead">${t('lim_growth_basic')}</div>
    <div class="fbody">
    <div class="fline">\\(\\lim_{n \\to \\infty} \\frac{\\ln n}{n^k} = 0 \\quad (k > 0)\\)</div>
    <div class="fline">\\(\\lim_{n \\to \\infty} \\frac{n^k}{a^n} = 0 \\quad (a > 1, k > 0)\\)</div>
    <div class="fline">\\(\\lim_{n \\to \\infty} \\frac{n!}{n^n} = 0\\)</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead">${t('lim_growth_order')}</div>
    <div class="fbody">
    <div class="fline">\\(\\ln^\\alpha n \\ll n^\\beta \\ll c^n \\ll n! \\ll n^n \\quad (n \\to \\infty)\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lim_growth_note')}</div>
    </div>
    </div>
    </div>

    <!-- 3️⃣ Limite de Funcții (Pre-L'Hospital) -->
    <div class="fsec" style="background:linear-gradient(90deg,#27ae60,#2ecc71); margin-top:15px;">${t('lim_sec_func')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead">${t('lim_func_xx')}</div>
    <div class="fbody">
    <div class="fline">\\(\\lim_{x \\to 0^+} x^x = \\lim_{x \\to 0^+} e^{x \\ln x} = e^0 = 1\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lim_func_xx_note')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead">${t('lim_func_trig_exp')}</div>
    <div class="fbody">
    <div class="fline">\\(\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\implies (\\sin x)' = \\cos x\\)</div>
    <div class="fline">\\(\\lim_{x \\to 0} \\frac{1-\\cos x}{x^2} = \\frac12\\)</div>
    <div class="fline">\\(\\lim_{x \\to 0} \\frac{e^x-1}{x} = 1 \\implies (e^x)' = e^x\\)</div>
    <div class="fline">\\(\\lim_{x \\to 0} \\frac{\\ln(1+x)}{x} = 1 \\implies (\\ln x)' = \\frac1x\\)</div>
    </div>
    </div>
    </div>

    <!-- 4️⃣ Criterii: Cesàro-Stolz & Rădăcină/Raport -->
    <div class="fsec" style="background:linear-gradient(90deg,#d35400,#e67e22); margin-top:15px;">${t('lim_sec_crit')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead">${t('lim_crit_cesaro')}</div>
    <div class="fbody">
    <div class="fline">\\(\\text{Dacă } (b_n) \\nearrow, \\; b_n \\to \\infty, \\; \\lim \\frac{a_{n+1}-a_n}{b_{n+1}-b_n} = L \\implies \\lim \\frac{a_n}{b_n} = L\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lim_crit_cesaro_note')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead">${t('lim_crit_cauchy')}</div>
    <div class="fbody">
    <div class="fline">\\(\\lim \\sqrt[n]{|a_n|} = L < 1 \\implies a_n \\to 0 \\quad \\text{(Cauchy)}\\)</div>
    <div class="fline">\\(\\lim \\left|\\frac{a_{n+1}}{a_n}\\right| = L < 1 \\implies a_n \\to 0 \\quad \\text{(D'Alembert)}\\)</div>
    </div>
    </div>
    </div>

    <!-- 5️⃣ Echivalente Asimptotice & Reguli -->
    <div class="fsec" style="background:linear-gradient(90deg,#16a085,#1abc9c); margin-top:15px;">${t('lim_sec_equiv')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead">${t('lim_equiv_table')}</div>
    <div class="fbody">
    <div class="fline">\\(x \\to 0: \\quad \\sin x \\sim x, \\; \\tan x \\sim x, \\; 1-\\cos x \\sim \\frac{x^2}{2}\\)</div>
    <div class="fline">\\(e^x-1 \\sim x, \\; \\ln(1+x) \\sim x, \\; (1+x)^\\alpha-1 \\sim \\alpha x\\)</div>
    <div class="fline" style="color:#e74c3c; font-weight:600; margin-top:6px;">${t('lim_equiv_warn')}</div>
    </div>
    </div>
    </div>

    <!-- 6️⃣ Regula lui L'Hospital & Forme Nedeterminate -->
    <div class="fsec" style="background:linear-gradient(90deg,#c0392b,#e74c3c); margin-top:15px;">${t('lim_sec_lh')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead">${t('lim_lh_direct')}</div>
    <div class="fbody">
    <div class="fline">\\(\\frac{0}{0} \\text{ sau } \\frac{\\infty}{\\infty} \\implies \\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lim_lh_cond')}</div>
    </div>
    </div>
       <div class="fcard">
       <div class="fcard">
       <div class="fhead">${t('lim_lh_indirect')}</div>
       <div class="fbody">
       <div class="fline">\\(0 \\cdot \\infty \\implies \\frac{0}{1/\\infty} \\text{ sau } \\frac{\\infty}{1/0}\\)</div>
       <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lim_lh_type_prod')}</div>

       <!-- ✅ FIX: MathJax pur + text traductibil separat -->
       <div class="fline">\\(\\infty - \\infty\\)</div>
       <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lim_lh_type_diff')}</div>

       <div class="fline">\\(1^\\infty, 0^0, \\infty^0 \\implies \\ln y = g(x) \\cdot \\ln f(x)\\)</div>
       <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lim_lh_type_pow')}</div>
       </div>
       </div>
    <div class="fcard">
    <div class="fhead">${t('lim_lh_examples')}</div>
    <div class="fbody">
    <div class="fline">\\(\\lim_{x \\to 0} \\frac{x - \\sin x}{x^3} = \\frac16\\)</div>
    <div class="fline">\\(\\lim_{x \\to \\infty} \\frac{\\ln x}{x} = 0\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lim_lh_note')}</div>
    </div>
    </div>
    </div>
    `;

    // 🔒 Safe-by-default show function
    function show(content, err = false, allowHtml = false) {
        resBox.style.display = 'block';
        if (allowHtml) resBox.innerHTML = content;
        else resBox.textContent = content;
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        if (window.MathJax?.typesetPromise) {
            MathJax.typesetPromise([resBox]).catch(() => {});
        }
    }

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
