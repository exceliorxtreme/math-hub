// modules/statistica/prezentare.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');
    ws.innerHTML = `
    <h2 data-i18n="stat_prez_title">${t('stat_prez_title')}</h2>
    <div class="description" data-i18n="stat_prez_desc">${t('stat_prez_desc')}</div>

    <div class="fsec" style="background:linear-gradient(90deg,#16a085,#1abc9c)" data-i18n="stat_mean_sec">${t('stat_mean_sec')}</div>
    <div class="fcards">
    <div class="fcard"><div class="fhead" data-i18n="stat_mean_arith">${t('stat_mean_arith')}</div><div class="fbody">
    <div class="fline">\\(\\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="stat_mean_arith_note">${t('stat_mean_arith_note')}</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="stat_mean_weight">${t('stat_mean_weight')}</div><div class="fbody">
    <div class="fline">\\(\\bar{x}_w = \\frac{\\sum w_i x_i}{\\sum w_i}\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="stat_mean_weight_note">${t('stat_mean_weight_note')}</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="stat_mean_geom">${t('stat_mean_geom')}</div><div class="fbody">
    <div class="fline">\\(G = \\sqrt[n]{\\prod_{i=1}^{n} x_i}\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="stat_mean_geom_note">${t('stat_mean_geom_note')}</div>
    </div></div>
    </div>

    <div class="fsec" style="background:linear-gradient(90deg,#e67e22,#d35400);margin-top:15px" data-i18n="stat_disp_sec">${t('stat_disp_sec')}</div>
    <div class="fcards">
    <div class="fcard"><div class="fhead" data-i18n="stat_var">${t('stat_var')}</div><div class="fbody">
    <div class="fline">\\(s^2 = \\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="stat_var_note">${t('stat_var_note')}</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="stat_std">${t('stat_std')}</div><div class="fbody">
    <div class="fline">\\(s = \\sqrt{s^2}\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="stat_std_note">${t('stat_std_note')}</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="stat_cv">${t('stat_cv')}</div><div class="fbody">
    <div class="fline">\\(CV = \\frac{s}{|\\bar{x}|} \\cdot 100\\%\\)</div>
    <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="stat_cv_note">${t('stat_cv_note')}</div>
    </div></div>
    </div>
    `;

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
