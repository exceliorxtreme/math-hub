// modules/analiza/hiperb.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');

    ws.innerHTML = `
    <h2 data-i18n="hiperb_title">${t('hiperb_title')}</h2>
    <div class="description" data-i18n="hiperb_desc">${t('hiperb_desc')}</div>
    <div style="overflow-x:auto; margin-top:10px; border:1px solid var(--border); border-radius:6px;">
    <table style="width:100%; border-collapse:collapse; font-size:0.88rem; white-space:nowrap;">
    <thead>
    <tr style="background:var(--hover-bg); border-bottom:2px solid var(--accent-dark);">
    <th style="padding:8px 12px; text-align:left;" data-i18n="hiperb_col_f">f(x)</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="hiperb_col_df">Derivata f'(x)</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="hiperb_col_dom">Domeniu</th>
    </tr>
    </thead>
    <tbody>
    <tr><td style="padding:6px 12px;">\\(\\sinh x = \\frac{e^x - e^{-x}}{2}\\)</td><td style="padding:6px 12px;">\\(\\cosh x\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\cosh x = \\frac{e^x + e^{-x}}{2}\\)</td><td style="padding:6px 12px;">\\(\\sinh x\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\tanh x = \\frac{\\sinh x}{\\cosh x}\\)</td><td style="padding:6px 12px;">\\(\\frac{1}{\\cosh^2 x}\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\coth x = \\frac{\\cosh x}{\\sinh x}\\)</td><td style="padding:6px 12px;">\\(-\\frac{1}{\\sinh^2 x}\\)</td><td style="padding:6px 12px;">\\(x \\neq 0\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\text{sech } x = \\frac{1}{\\cosh x}\\)</td><td style="padding:6px 12px;">\\(-\\frac{\\sinh x}{\\cosh^2 x}\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\text{csch } x = \\frac{1}{\\sinh x}\\)</td><td style="padding:6px 12px;">\\(-\\frac{\\cosh x}{\\sinh^2 x}\\)</td><td style="padding:6px 12px;">\\(x \\neq 0\\)</td></tr>
    </tbody>
    </table>
    </div>
    <div style="margin-top:12px; font-size:0.85rem; color:var(--text-muted); line-height:1.6; background:var(--input-bg); padding:10px; border-radius:6px;">
    <strong data-i18n="hiperb_note_title">${t('hiperb_note_title')}</strong><br>
    <span data-i18n="hiperb_note_text">${t('hiperb_note_text')}</span>
    </div>
    `;

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
