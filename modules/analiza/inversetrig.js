// modules/analiza/inversetrig.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');

    ws.innerHTML = `
    <h2 data-i18n="invtrig_title">${t('invtrig_title')}</h2>
    <div class="description" data-i18n="invtrig_desc">${t('invtrig_desc')}</div>
    <div style="overflow-x:auto; margin-top:10px; border:1px solid var(--border); border-radius:6px;">
    <table style="width:100%; border-collapse:collapse; font-size:0.88rem; white-space:nowrap;">
    <thead>
    <tr style="background:var(--hover-bg); border-bottom:2px solid var(--accent-dark);">
    <th style="padding:8px 12px; text-align:left;" data-i18n="invtrig_col_f">f(x)</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="invtrig_col_dom">Domeniu</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="invtrig_col_ran">Imagine</th>
    <th style="padding:8px 12px; text-align:left;" data-i18n="invtrig_col_df">Derivata</th>
    </tr>
    </thead>
    <tbody>
    <tr><td style="padding:6px 12px;">\\(\\arcsin x\\)</td><td style="padding:6px 12px;">\\([-1, 1]\\)</td><td style="padding:6px 12px;">\\([-\\frac{\\pi}{2}, \\frac{\\pi}{2}]\\)</td><td style="padding:6px 12px;">\\(\\frac{1}{\\sqrt{1-x^2}}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\arccos x\\)</td><td style="padding:6px 12px;">\\([-1, 1]\\)</td><td style="padding:6px 12px;">\\([0, \\pi]\\)</td><td style="padding:6px 12px;">\\(-\\frac{1}{\\sqrt{1-x^2}}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\arctan x\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td><td style="padding:6px 12px;">\\((-\\frac{\\pi}{2}, \\frac{\\pi}{2})\\)</td><td style="padding:6px 12px;">\\(\\frac{1}{1+x^2}\\)</td></tr>
    <tr><td style="padding:6px 12px;">\\(\\text{arccot } x\\)</td><td style="padding:6px 12px;">\\(\\mathbb{R}\\)</td><td style="padding:6px 12px;">\\((0, \\pi)\\)</td><td style="padding:6px 12px;">\\(-\\frac{1}{1+x^2}\\)</td></tr>
    </tbody>
    </table>
    </div>
    <div style="margin-top:12px; font-size:0.85rem; color:var(--text-muted); line-height:1.6; background:var(--input-bg); padding:10px; border-radius:6px;">
    <strong data-i18n="invtrig_note_title">${t('invtrig_note_title')}</strong><br>
    <span data-i18n="invtrig_note_text">${t('invtrig_note_text')}</span>
    </div>
    `;

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
