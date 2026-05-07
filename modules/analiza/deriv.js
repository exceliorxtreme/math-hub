// modules/analiza/deriv.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');
    ws.innerHTML = `
    <h2 data-i18n="deriv_title">${t('deriv_title')}</h2>
    <div class="description" data-i18n="deriv_desc">${t('deriv_desc')}</div>
    <div style="overflow-x:auto; margin-top:10px; border:1px solid var(--border); border-radius:6px;">
    <table class="deriv-t" style="width:100%; border-collapse:collapse; font-size:0.88rem; white-space:nowrap;">
    <thead>
    <tr style="background:var(--hover-bg); border-bottom:2px solid var(--accent-dark);">
    <th style="padding:8px 12px; text-align:left;" data-i18n="deriv_col_f">f(x)</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="deriv_col_df">f'(x)</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="deriv_dom">Domeniu</th>
    </tr>
    </thead>
    <tbody>
    <tr><td style="padding:6px 12px;">\\(c\\)</td><td style="padding:6px 12px;">\\(0\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(x^n\\)</td><td style="padding:6px 12px;">\\(n x^{n-1}\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\) (sau \\(x>0\\))</td></tr>
    <tr><td style="padding:6px 12px;">\\(e^x\\)</td><td style="padding:6px 12px;">\\(e^x\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(a^x\\)</td><td style="padding:6px 12px;">\\(a^x \\ln a\\)</td><td style="padding:6px 12px;">\\(a>0, a\\neq 1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\ln x\\)</td><td style="padding:6px 12px;">\\(\\frac{1}{x}\\)</td><td style="padding:6px 12px;">\\(x>0\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\log_a x\\)</td><td style="padding:6px 12px;">\\(\\frac{1}{x \\ln a}\\)</td><td style="padding:6px 12px;">\\(a>0, a\\neq 1, x>0\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\sin x\\)</td><td style="padding:6px 12px;">\\(\\cos x\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\cos x\\)</td><td style="padding:6px 12px;">\\(-\\sin x\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\tan x\\)</td><td style="padding:6px 12px;">\\(\\frac{1}{\\cos^2 x}\\)</td><td style="padding:6px 12px;">\\(x \\neq \\frac{\\pi}{2}+k\\pi\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\cot x\\)</td><td style="padding:6px 12px;">\\(-\\frac{1}{\\sin^2 x}\\)</td><td style="padding:6px 12px;">\\(x \\neq k\\pi\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\arcsin x\\)</td><td style="padding:6px 12px;">\\(\\frac{1}{\\sqrt{1-x^2}}\\)</td><td style="padding:6px 12px;">\\(|x|<1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\arccos x\\)</td><td style="padding:6px 12px;">\\(-\\frac{1}{\\sqrt{1-x^2}}\\)</td><td style="padding:6px 12px;">\\(|x|<1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\arctan x\\)</td><td style="padding:6px 12px;">\\(\\frac{1}{1+x^2}\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\text{arccot } x\\)</td><td style="padding:6px 12px;">\\(-\\frac{1}{1+x^2}\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\sinh x\\)</td><td style="padding:6px 12px;">\\(\\cosh x\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\cosh x\\)</td><td style="padding:6px 12px;">\\(\\sinh x\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\tanh x\\)</td><td style="padding:6px 12px;">\\(\\frac{1}{\\cosh^2 x}\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\coth x\\)</td><td style="padding:6px 12px;">\\(-\\frac{1}{\\sinh^2 x}\\)</td><td style="padding:6px 12px;">\\(x \\neq 0\\)</td></tr>
    </tbody>
    </table>
    </div>
    <div style="margin-top:12px;font-size:0.85rem;color:var(--text-muted);text-align:center;line-height:1.5;">
    <span data-i18n="deriv_note">${t('deriv_note')}</span>
    </div>
    `;

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
