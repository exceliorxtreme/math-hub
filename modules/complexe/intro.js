// modules/complexe/intro.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');
    ws.innerHTML = `
    <h2 data-i18n="cx_title">${t('cx_title')}</h2>
    <div class="description" data-i18n="cx_desc">${t('cx_desc')}</div>

    <div class="fsec" style="background:linear-gradient(90deg,#3498db,#2980b9)" data-i18n="cx_forms">${t('cx_forms')}</div>
    <div class="fcard"><div class="fbody">
    <div class="fline"><strong>Algebrică:</strong> \\(z = a + bi\\)</div>
    <div class="fline"><strong>Trigonometrică:</strong> \\(z = r(\\cos\\theta + i\\sin\\theta)\\)</div>
    <div class="fline"><strong>Exponențială:</strong> \\(z = r e^{i\\theta}\\)</div>
    <div class="fline" style="margin-top:5px;color:var(--text-muted)"><em>\\(r = |z| = \\sqrt{a^2+b^2}\\), \\(\\theta = \\arg(z)\\)</em></div>
    </div></div>

    <div class="fsec" style="background:linear-gradient(90deg,#e67e22,#d35400)" data-i18n="cx_ops">${t('cx_ops')}</div>
    <div class="fcards">
    <div class="fcard"><div class="fhead">Adunare / Scădere</div><div class="fbody">
    <div class="fline">\\(z_1 \\pm z_2 = (a_1\\pm a_2) + i(b_1\\pm b_2)\\)</div>
    </div></div>
    <div class="fcard"><div class="fhead">Înmulțire</div><div class="fbody">
    <div class="fline">\\(z_1 z_2 = (a_1a_2-b_1b_2) + i(a_1b_2+a_2b_1)\\)</div>
    <div class="fline">\\(r_1 r_2 e^{i(\\theta_1+\\theta_2)}\\)</div>
    </div></div>
    <div class="fcard"><div class="fhead">Împărțire</div><div class="fbody">
    <div class="fline">\\(\\frac{z_1}{z_2} = \\frac{z_1 \\bar{z_2}}{|z_2|^2}\\)</div>
    <div class="fline">\\(\\frac{r_1}{r_2} e^{i(\\theta_1-\\theta_2)}\\)</div>
    </div></div>
    </div>

    <div class="fsec" style="background:linear-gradient(90deg,#9b59b6,#8e44ad)" data-i18n="cx_euler">${t('cx_euler')}</div>
    <div class="fcard"><div class="fbody">
    <div class="fline"><strong>Formula lui Euler:</strong> \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\)</div>
    <div class="fline"><strong>Identitatea lui Euler:</strong> \\(e^{i\\pi} + 1 = 0\\)</div>
    <div class="fline"><strong>De Moivre:</strong> \\(z^n = r^n e^{in\\theta} = r^n(\\cos n\\theta + i\\sin n\\theta)\\)</div>
    </div></div>

    <div style="margin-top:12px;font-size:0.85rem;color:var(--text-muted);line-height:1.6;background:var(--input-bg);padding:10px;border-radius:6px;">
    <strong data-i18n="cx_note_title">${t('cx_note_title')}</strong><br>
    <span data-i18n="cx_note_text">${t('cx_note_text')}</span>
    </div>
    `;

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]));
}
