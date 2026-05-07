// modules/analiza/integrale.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');

    ws.innerHTML = `
    <h2 data-i18n="int_title">${t('int_title')}</h2>
    <div class="description" data-i18n="int_desc">${t('int_desc')}</div>

    <!-- Primitive Uzuale -->
    <div class="fsec" style="background:linear-gradient(90deg,#16a085,#1abc9c)" data-i18n="int_basic">${t('int_basic')}</div>
    <div style="overflow-x:auto; margin-top:10px; border:1px solid var(--border); border-radius:6px;">
    <table style="width:100%; border-collapse:collapse; font-size:0.88rem; white-space:nowrap;">
    <thead>
    <tr style="background:var(--hover-bg); border-bottom:2px solid var(--accent-dark);">
    <th style="padding:8px 12px; text-align:left;" data-i18n="int_col_f">f(x)</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="int_col_F">∫f(x)dx</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="int_col_note">Condiții</th>
    </tr>
    </thead>
    <tbody>
    <tr><td style="padding:6px 12px;">\\(0\\)</td><td style="padding:6px 12px;">\\(C\\)</td><td style="padding:6px 12px;">\\(C \\in \\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(x^n\\)</td><td style="padding:6px 12px;">\\(\\frac{x^{n+1}}{n+1} + C\\)</td><td style="padding:6px 12px;">\\(n \\neq -1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\frac{1}{x}\\)</td><td style="padding:6px 12px;">\\(\\ln|x| + C\\)</td><td style="padding:6px 12px;">\\(x \\neq 0\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(e^x\\)</td><td style="padding:6px 12px;">\\(e^x + C\\)</td><td style="padding:6px 12px;">\\(x \\in \\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(a^x\\)</td><td style="padding:6px 12px;">\\(\\frac{a^x}{\\ln a} + C\\)</td><td style="padding:6px 12px;">\\(a>0, a\\neq1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\sin x\\)</td><td style="padding:6px 12px;">\\(-\\cos x + C\\)</td><td style="padding:6px 12px;">\\(x \\in \\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\cos x\\)</td><td style="padding:6px 12px;">\\(\\sin x + C\\)</td><td style="padding:6px 12px;">\\(x \\in \\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\frac{1}{\\cos^2 x}\\)</td><td style="padding:6px 12px;">\\(\\tan x + C\\)</td><td style="padding:6px 12px;">\\(x \\neq \\frac{\\pi}{2}+k\\pi\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\frac{1}{\\sin^2 x}\\)</td><td style="padding:6px 12px;">\\(-\\cot x + C\\)</td><td style="padding:6px 12px;">\\(x \\neq k\\pi\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\frac{1}{\\sqrt{1-x^2}}\\)</td><td style="padding:6px 12px;">\\(\\arcsin x + C\\)</td><td style="padding:6px 12px;">\\(|x|<1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(-\\frac{1}{\\sqrt{1-x^2}}\\)</td><td style="padding:6px 12px;">\\(\\arccos x + C\\)</td><td style="padding:6px 12px;">\\(|x|<1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\frac{1}{1+x^2}\\)</td><td style="padding:6px 12px;">\\(\\arctan x + C\\)</td><td style="padding:6px 12px;">\\(x \\in \\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\sinh x\\)</td><td style="padding:6px 12px;">\\(\\cosh x + C\\)</td><td style="padding:6px 12px;">\\(x \\in \\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\cosh x\\)</td><td style="padding:6px 12px;">\\(\\sinh x + C\\)</td><td style="padding:6px 12px;">\\(x \\in \\mathbb{R}\\)</td></tr>
    </tbody>
    </table>
    </div>

    <!-- Forme Speciale -->
    <div class="fsec" style="background:linear-gradient(90deg,#e67e22,#d35400); margin-top:15px;" data-i18n="int_special">${t('int_special')}</div>
    <div style="overflow-x:auto; margin-top:10px; border:1px solid var(--border); border-radius:6px;">
    <table style="width:100%; border-collapse:collapse; font-size:0.88rem; white-space:nowrap;">
    <tbody>
    <tr><td style="padding:6px 12px;">\\(\\int \\frac{dx}{a^2+x^2}\\)</td><td style="padding:6px 12px;">\\(\\frac{1}{a}\\arctan\\frac{x}{a} + C\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\int \\frac{dx}{\\sqrt{a^2-x^2}}\\)</td><td style="padding:6px 12px;">\\(\\arcsin\\frac{x}{a} + C\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\int \\frac{dx}{\\sqrt{x^2\\pm a^2}}\\)</td><td style="padding:6px 12px;">\\(\\ln|x+\\sqrt{x^2\\pm a^2}| + C\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\int \\tan x\\,dx\\)</td><td style="padding:6px 12px;">\\(-\\ln|\\cos x| + C\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\int \\cot x\\,dx\\)</td><td style="padding:6px 12px;">\\(\\ln|\\sin x| + C\\)</td></tr>
    </tbody>
    </table>
    </div>

    <!-- Tehnici de Integrare -->
    <div class="fsec" style="background:linear-gradient(90deg,#9b59b6,#8e44ad); margin-top:15px;" data-i18n="int_tech">${t('int_tech')}</div>
    <div class="fcards">
    <div class="fcard"><div class="fhead" data-i18n="int_subst">${t('int_subst')}</div><div class="fbody">
    <div class="fline">\\(\\int f(g(x))g'(x)dx = \\int f(u)du\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem">cu \\(u = g(x)\\)</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="int_parts">${t('int_parts')}</div><div class="fbody">
    <div class="fline">\\(\\int u\\,dv = uv - \\int v\\,du\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem">Alege \\(u\\) care se simplifică la derivare</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="int_frac">${t('int_frac')}</div><div class="fbody">
    <div class="fline">\\(\\frac{P(x)}{Q(x)} = \\sum \\frac{A_k}{(x-r_k)^{m_k}} + \\sum \\frac{B_jx+C_j}{(x^2+p_jx+q_j)^{n_j}}\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem">Descompunere în fracții simple</div>
    </div></div>
    </div>

    <div style="margin-top:12px; font-size:0.85rem; color:var(--text-muted); line-height:1.6; background:var(--input-bg); padding:10px; border-radius:6px;">
    <strong data-i18n="int_note_title">${t('int_note_title')}</strong><br>
    <span data-i18n="int_note_text">${t('int_note_text')}</span>
    </div>
    `;

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
