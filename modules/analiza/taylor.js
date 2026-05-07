// modules/analiza/taylor.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');

    ws.innerHTML = `
    <h2 data-i18n="taylor_title">${t('taylor_title')}</h2>
    <div class="description" data-i18n="taylor_desc">${t('taylor_desc')}</div>

    <div class="fsec" style="background:linear-gradient(90deg,#16a085,#1abc9c)" data-i18n="taylor_series">${t('taylor_series')}</div>
    <div style="overflow-x:auto; margin-top:10px; border:1px solid var(--border); border-radius:6px;">
    <table style="width:100%; border-collapse:collapse; font-size:0.9rem; white-space:nowrap;">
    <thead>
    <tr style="background:var(--hover-bg); border-bottom:2px solid var(--accent-dark);">
    <th style="padding:8px 12px; text-align:left;" data-i18n="taylor_col_f">f(x)</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="taylor_col_series">Seria Maclaurin</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="taylor_col_conv">Raza de Conv.</th>
    </tr>
    </thead>
    <tbody>
    <tr><td style="padding:6px 12px;">\\(e^x\\)</td><td style="padding:6px 12px;">\\(\\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\dots\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\sin x\\)</td><td style="padding:6px 12px;">\\(\\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\dots\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\cos x\\)</td><td style="padding:6px 12px;">\\(\\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\dots\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\frac{1}{1-x}\\)</td><td style="padding:6px 12px;">\\(\\sum_{n=0}^{\\infty} x^n = 1 + x + x^2 + \\dots\\)</td><td style="padding:6px 12px;">\\(|x| < 1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\ln(1+x)\\)</td><td style="padding:6px 12px;">\\(\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1} x^n}{n} = x - \\frac{x^2}{2} + \\dots\\)</td><td style="padding:6px 12px;">\\((-1, 1]\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\((1+x)^\\alpha\\)</td><td style="padding:6px 12px;">\\(1 + \\alpha x + \\frac{\\alpha(\\alpha-1)}{2!}x^2 + \\dots\\)</td><td style="padding:6px 12px;">\\(|x| < 1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\arctan x\\)</td><td style="padding:6px 12px;">\\(\\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{2n+1}\\)</td><td style="padding:6px 12px;">\\(|x| \\leq 1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\tan x\\)</td><td style="padding:6px 12px;">\\(x + \\frac{x^3}{3} + \\frac{2x^5}{15} + \\dots\\)</td><td style="padding:6px 12px;">\\(|x| < \\frac{\\pi}{2}\\)</td></tr>
    </tbody>
    </table>
    </div>

    <div style="margin-top:12px; font-size:0.85rem; color:var(--text-muted); line-height:1.6; background:var(--input-bg); padding:10px; border-radius:6px;">
    <strong data-i18n="taylor_note_title">${t('taylor_note_title')}</strong><br>
    <span data-i18n="taylor_note_text">${t('taylor_note_text')}</span>
    </div>
    `;

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
