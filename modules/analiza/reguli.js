// modules/analiza/reguli.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');

    ws.innerHTML = `
    <h2 data-i18n="reguli_title">${t('reguli_title')}</h2>
    <div class="description" data-i18n="reguli_desc">${t('reguli_desc')}</div>
    <div style="overflow-x:auto; margin-top:10px; border:1px solid var(--border); border-radius:6px;">
    <table style="width:100%; border-collapse:collapse; font-size:0.9rem; white-space:nowrap;">
    <thead>
    <tr style="background:var(--hover-bg); border-bottom:2px solid var(--accent-dark);">
    <th style="padding:8px 12px; text-align:left;" data-i18n="reguli_col_rule">Regula</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="reguli_col_formula">Formula</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="reguli_col_cond">Condiție</th>
    </tr>
    </thead>
    <tbody>
    <tr><td style="padding:6px 12px;" data-i18n="reguli_sum">Suma / Diferența</td><td style="padding:6px 12px;">\\((u \\pm v)' = u' \\pm v'\\)</td><td style="padding:6px 12px;">\\(u, v\\) derivabile</td></tr>
    <tr><td style="padding:6px 12px;" data-i18n="reguli_prod">Produsul</td><td style="padding:6px 12px;">\\((u \\cdot v)' = u'v + uv'\\)</td><td style="padding:6px 12px;">\\(u, v\\) derivabile</td></tr>
    <tr><td style="padding:6px 12px;" data-i18n="reguli_quot">Câtul</td><td style="padding:6px 12px;">\\(\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}\\)</td><td style="padding:6px 12px;">\\(v \\neq 0\\)</td></tr>
    <tr><td style="padding:6px 12px;" data-i18n="reguli_chain">Lanțului</td><td style="padding:6px 12px;">\\((f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)\\)</td><td style="padding:6px 12px;">\\(g\\) deriv. în \\(x\\), \\(f\\) în \\(g(x)\\)</td></tr>
    <tr><td style="padding:6px 12px;" data-i18n="reguli_const">Constantă × f(x)</td><td style="padding:6px 12px;">\\((c \\cdot f(x))' = c \\cdot f'(x)\\)</td><td style="padding:6px 12px;">\\(c \\in \\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;" data-i18n="reguli_inv">Funcția inversă</td><td style="padding:6px 12px;">\\((f^{-1})'(y) = \\frac{1}{f'(x)}\\)</td><td style="padding:6px 12px;">\\(y = f(x), f'(x) \\neq 0\\)</td></tr>
    </tbody>
    </table>
    </div>
    <div style="margin-top:12px; font-size:0.85rem; color:var(--text-muted); line-height:1.6; background:var(--input-bg); padding:10px; border-radius:6px;">
    <strong data-i18n="reguli_note_title">${t('reguli_note_title')}</strong><br>
    <span data-i18n="reguli_note_text">${t('reguli_note_text')}</span>
    </div>
    `;

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
