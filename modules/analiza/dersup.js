// modules/analiza/dersup.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');

    ws.innerHTML = `
    <h2 data-i18n="dersup_title">${t('dersup_title')}</h2>
    <div class="description" data-i18n="dersup_desc">${t('dersup_desc')}</div>
    <div style="overflow-x:auto; margin-top:10px; border:1px solid var(--border); border-radius:6px;">
    <table style="width:100%; border-collapse:collapse; font-size:0.9rem; white-space:nowrap;">
    <thead>
    <tr style="background:var(--hover-bg); border-bottom:2px solid var(--accent-dark);">
    <th style="padding:8px 12px; text-align:left;" data-i18n="dersup_col_f">f(x)</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="dersup_col_dnf">f⁽ⁿ⁾(x)</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="dersup_col_note">Observație</th>
    </tr>
    </thead>
    <tbody>
    <tr><td style="padding:6px 12px;">\\(x^m\\)</td><td style="padding:6px 12px;">\\(m(m-1)\\cdots(m-n+1)x^{m-n}\\)</td><td style="padding:6px 12px;">\\(n \\leq m\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(e^{ax}\\)</td><td style="padding:6px 12px;">\\(a^n e^{ax}\\)</td><td style="padding:6px 12px;">\\(a \\in \\mathbb{R}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\sin(ax+b)\\)</td><td style="padding:6px 12px;">\\(a^n \\sin\\left(ax+b + \\frac{n\\pi}{2}\\right)\\)</td><td style="padding:6px 12px;">\\(a \\neq 0\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\cos(ax+b)\\)</td><td style="padding:6px 12px;">\\(a^n \\cos\\left(ax+b + \\frac{n\\pi}{2}\\right)\\)</td><td style="padding:6px 12px;">\\(a \\neq 0\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\ln x\\)</td><td style="padding:6px 12px;">\\((-1)^{n-1} \\frac{(n-1)!}{x^n}\\)</td><td style="padding:6px 12px;">\\(n \\geq 1\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\frac{1}{ax+b}\\)</td><td style="padding:6px 12px;">\\((-1)^n \\frac{n! \\, a^n}{(ax+b)^{n+1}}\\)</td><td style="padding:6px 12px;">\\(ax+b \\neq 0\\)</td></tr>
    </tbody>
    </table>
    </div>
    <div style="margin-top:12px; font-size:0.85rem; color:var(--text-muted); line-height:1.6; background:var(--input-bg); padding:10px; border-radius:6px;">
    <strong data-i18n="dersup_note_title">${t('dersup_note_title')}</strong><br>
    <span data-i18n="dersup_note_text">${t('dersup_note_text')}</span>
    </div>
    `;

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
