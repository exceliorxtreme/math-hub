// modules/probabilitati/prezentare.js
import { t } from '../../utils/i18n.js';

export function initUI() {
  const ws = document.getElementById('workspace');
  ws.innerHTML = `
  <h2 data-i18n="prob_title">${t('prob_title')}</h2>
  <div class="description" data-i18n="prob_desc">${t('prob_desc')}</div>

  <div class="fsec" style="background:linear-gradient(90deg,#2ecc71,#27ae60)" data-i18n="prob_def_sec">${t('prob_def_sec')}</div>
  <div class="fcards">
  <div class="fcard"><div class="fhead" data-i18n="prob_classic">${t('prob_classic')}</div><div class="fbody">
  <div class="fline">\\(P(A) = \\frac{|A|}{|\\Omega|}\\)</div>
  <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="prob_classic_note">${t('prob_classic_note')}</div>
  </div></div>
  <div class="fcard"><div class="fhead" data-i18n="prob_cond">${t('prob_cond')}</div><div class="fbody">
  <div class="fline">\\(P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\; P(B)>0\\)</div>
  <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="prob_cond_note">${t('prob_cond_note')}</div>
  </div></div>
  <div class="fcard"><div class="fhead" data-i18n="prob_indep">${t('prob_indep')}</div><div class="fbody">
  <div class="fline">\\(A \\perp B \\iff P(A \\cap B) = P(A) \\cdot P(B)\\)</div>
  <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="prob_indep_note">${t('prob_indep_note')}</div>
  </div></div>
  </div>

  <div class="fsec" style="background:linear-gradient(90deg,#9b59b6,#8e44ad);margin-top:15px" data-i18n="prob_bayes_sec">${t('prob_bayes_sec')}</div>
  <div class="fcards">
  <div class="fcard"><div class="fhead" data-i18n="prob_total">${t('prob_total')}</div><div class="fbody">
  <div class="fline">\\(P(A) = \\sum_{i=1}^{n} P(A|B_i) \\cdot P(B_i)\\)</div>
  </div></div>
  <div class="fcard"><div class="fhead" data-i18n="prob_bayes">${t('prob_bayes')}</div><div class="fbody">
  <div class="fline">\\(P(B_k|A) = \\frac{P(A|B_k) \\cdot P(B_k)}{\\sum_{i=1}^{n} P(A|B_i) \\cdot P(B_i)}\\)</div>
  <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="prob_bayes_note">${t('prob_bayes_note')}</div>
  </div></div>
  <div class="fcard"><div class="fhead" data-i18n="prob_exp">${t('prob_exp')}</div><div class="fbody">
  <div class="fline">\\(E[X] = \\sum_{i} x_i \\cdot p_i\\)</div>
  <div class="fline" style="color:var(--text-muted);font-size:0.85rem" data-i18n="prob_exp_note">${t('prob_exp_note')}</div>
  </div></div>
  </div>
  `;
  if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
