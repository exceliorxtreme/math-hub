// modules/trig/trig_form.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');
    ws.innerHTML = `
    <h2 data-i18n="trigform_title">${t('trigform_title')}</h2>

    <div class="fsec" data-i18n="tf_fund">${t('tf_fund')}</div>
    <div class="fcard"><div class="fbody">
    <div class="fline"><span class="fn">①</span> \\(\\sin^2\\alpha + \\cos^2\\alpha = 1\\)</div>
    <div class="fline"><span class="fn">②</span> \\(1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}\\)</div>
    <div class="fline"><span class="fn">③</span> \\(1 + \\cot^2\\alpha = \\frac{1}{\\sin^2\\alpha}\\)</div>
    <div class="fline"><span class="fn">④</span> \\(\\tan\\alpha \\cdot \\cot\\alpha = 1\\)</div>
    <div class="fline"><span class="fn">⑤</span> \\(\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}, \\; \\cot\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha}\\)</div>
    </div></div>

    <div class="fsec" data-i18n="tf_signs">${t('tf_signs')}</div>
    <div style="overflow-x:auto"><table class="sign-t"><thead><tr><th>Cadran</th><th>Unghi</th><th>sin</th><th>cos</th><th>tan</th><th>cot</th></tr></thead><tbody>
    <tr><td class="badge">I</td><td>0°–90°</td><td style="color:#4eff7a">+</td><td style="color:#4eff7a">+</td><td style="color:#4eff7a">+</td><td style="color:#4eff7a">+</td></tr>
    <tr><td class="badge">II</td><td>90°–180°</td><td style="color:#4eff7a">+</td><td style="color:#ff6b6b">−</td><td style="color:#ff6b6b">−</td><td style="color:#ff6b6b">−</td></tr>
    <tr><td class="badge">III</td><td>180°–270°</td><td style="color:#ff6b6b">−</td><td style="color:#ff6b6b">−</td><td style="color:#4eff7a">+</td><td style="color:#4eff7a">+</td></tr>
    <tr><td class="badge">IV</td><td>270°–360°</td><td style="color:#ff6b6b">−</td><td style="color:#4eff7a">+</td><td style="color:#ff6b6b">−</td><td style="color:#ff6b6b">−</td></tr>
    </tbody></table></div>

    <div class="fsec" style="background:linear-gradient(90deg,#9b59b6,#8e44ad)" data-i18n="tf_reduce">${t('tf_reduce')}</div>
    <div style="background:rgba(255,85,85,0.05);border:1px dashed var(--border);border-radius:6px;padding:8px;text-align:left;font-size:0.88rem;color:var(--text-muted);line-height:1.6" data-i18n="tf_rules">${t('tf_rules')}</div>
    <div style="overflow-x:auto;margin:15px 0"><table><thead><tr><th>Expresie</th><th>sin</th><th>cos</th><th>tan</th><th>cot</th></tr></thead><tbody>
    <tr><td>\\(\\frac{\\pi}{2} - \\alpha\\)</td><td>\\(\\cos \\alpha\\)</td><td>\\(\\sin \\alpha\\)</td><td>\\(\\cot \\alpha\\)</td><td>\\(\\tan \\alpha\\)</td></tr>
    <tr><td>\\(\\frac{\\pi}{2} + \\alpha\\)</td><td>\\(\\cos \\alpha\\)</td><td>\\(-\\sin \\alpha\\)</td><td>\\(-\\cot \\alpha\\)</td><td>\\(-\\tan \\alpha\\)</td></tr>
    <tr><td>\\(\\pi - \\alpha\\)</td><td>\\(\\sin \\alpha\\)</td><td>\\(-\\cos \\alpha\\)</td><td>\\(-\\tan \\alpha\\)</td><td>\\(-\\cot \\alpha\\)</td></tr>
    <tr><td>\\(\\pi + \\alpha\\)</td><td>\\(-\\sin \\alpha\\)</td><td>\\(-\\cos \\alpha\\)</td><td>\\(\\tan \\alpha\\)</td><td>\\(\\cot \\alpha\\)</td></tr>
    <tr><td>\\(\\frac{3\\pi}{2} - \\alpha\\)</td><td>\\(-\\cos \\alpha\\)</td><td>\\(-\\sin \\alpha\\)</td><td>\\(\\cot \\alpha\\)</td><td>\\(\\tan \\alpha\\)</td></tr>
    <tr><td>\\(\\frac{3\\pi}{2} + \\alpha\\)</td><td>\\(-\\cos \\alpha\\)</td><td>\\(\\sin \\alpha\\)</td><td>\\(-\\cot \\alpha\\)</td><td>\\(-\\tan \\alpha\\)</td></tr>
    <tr><td>\\(2\\pi - \\alpha\\)</td><td>\\(-\\sin \\alpha\\)</td><td>\\(\\cos \\alpha\\)</td><td>\\(-\\tan \\alpha\\)</td><td>\\(-\\cot \\alpha\\)</td></tr>
    <tr><td>\\(2\\pi + \\alpha\\)</td><td>\\(\\sin \\alpha\\)</td><td>\\(\\cos \\alpha\\)</td><td>\\(\\tan \\alpha\\)</td><td>\\(\\cot \\alpha\\)</td></tr>
    </tbody></table></div>

    <div class="fsec" style="background:linear-gradient(90deg,#16a085,#1abc9c)" data-i18n="tf_sum">${t('tf_sum')}</div>
    <div class="fcards">
    <div class="fcard"><div class="fhead" data-i18n="tf_sum_plus">${t('tf_sum_plus')}</div><div class="fbody">
    <div class="fline">\\(\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta\\)</div>
    <div class="fline">\\(\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta\\)</div>
    </div></div>
    <div class="fcard"><div class="fhead" data-i18n="tf_sum_minus">${t('tf_sum_minus')}</div><div class="fbody">
    <div class="fline">\\(\\sin(\\alpha-\\beta) = \\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta\\)</div>
    <div class="fline">\\(\\cos(\\alpha-\\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta\\)</div>
    </div></div>

    <div class="fcard"><div class="fhead" data-i18n="tf_tan_arctan">${t('tf_tan_arctan')}</div><div class="fbody">
    <div class="fline">\\(\\tan(\\alpha+\\beta) = \\frac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta}\\)</div>
    <div class="fline">\\(\\tan(\\alpha-\\beta) = \\frac{\\tan\\alpha - \\tan\\beta}{1 + \\tan\\alpha\\tan\\beta}\\)</div>
    <div class="fline">\\(\\cot(\\alpha \\pm \\beta) = \\frac{\\cot \\alpha \\cot \\beta \\mp 1}{\\cot \\beta \\pm \\cot \\alpha}\\)</div>
    <div class="fline">\\(\\tan 2\\alpha = \\frac{2\\tan\\alpha}{1 - \\tan^2\\alpha}\\)</div>
    <div class="fline">\\(\\cot 2x = \\frac{\\cot^2 x - 1}{2\\cot x}\\)</div>
    <div class="fline">\\(\\tan 3\\alpha = \\frac{3\\tan\\alpha - \\tan^3\\alpha}{1 - 3\\tan^2\\alpha}\\)</div>
    <div class="fline">\\(\\cot 3x = \\frac{\\cot^3 x - 3\\cot x}{3\\cot^2 x - 1}\\)</div>
    <div class="fline">\\(\\tan\\frac{\\alpha}{2} = \\frac{\\sin\\alpha}{1+\\cos\\alpha} = \\frac{1-\\cos\\alpha}{\\sin\\alpha}\\)</div>
    <div class="fline">\\(\\tan^2\\alpha = \\frac{1 - \\cos 2\\alpha}{1 + \\cos 2\\alpha}\\)</div>
    <div class="fline">\\(\\tan(\\arctan x) = x, \\quad x \\in \\mathbb{R}\\)</div>
    <div class="fline">\\(\\arctan(\\tan x) = x, \\quad x \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)\\)</div>
    <div class="fline">\\(\\arctan x + \\arctan y = \\arctan\\left(\\frac{x+y}{1-xy}\\right), \\quad xy < 1\\)</div>
    <div class="fline">\\(\\arctan x + \\arctan y = \\arctan\\left(\\frac{x+y}{1-xy}\\right) + \\pi, \\quad x>0,\\; y>0,\\; xy>1\\)</div>
    <div class="fline">\\(\\arctan x + \\arctan y = \\arctan\\left(\\frac{x+y}{1-xy}\\right) - \\pi, \\quad x<0,\\; y<0,\\; xy>1\\)</div>
    <div class="fline">\\(\\arctan x - \\arctan y = \\arctan\\left(\\frac{x-y}{1+xy}\\right), \\quad xy > -1\\)</div>
    <div class="fline">\\(2\\arctan x = \\arctan\\left(\\frac{2x}{1-x^2}\\right), \\quad |x| < 1\\)</div>
    <div class="fline">\\(\\arctan x + \\arctan\\frac{1}{x} = \\frac{\\pi}{2}\\; (x>0), \\quad -\\frac{\\pi}{2}\\; (x<0)\\)</div>
    <div class="fline">\\(\\arctan x = \\arcsin\\left(\\frac{x}{\\sqrt{1+x^2}}\\right), \\quad x \\in \\mathbb{R}\\)</div>
    </div></div>
    </div>

    <div class="fsec" style="background:linear-gradient(90deg,#e67e22,#d35400)" data-i18n="tf_dbl">${t('tf_dbl')}</div>
    <div class="fcards">
    <div class="fcard"><div class="fhead">Unghi Dublu \\(2\\alpha\\)</div><div class="fbody">
    <div class="fline">\\(\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha\\)</div>
    <div class="fline">\\(\\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha = 2\\cos^2\\alpha - 1\\)</div>

    <div class="fcard"><div class="fhead">Unghi pe Jumătate \\(\\frac{\\alpha}{2}\\)</div><div class="fbody">
    <div class="fline">\\(\\sin\\frac{\\alpha}{2} = \\pm\\sqrt{\\frac{1 - \\cos\\alpha}{2}}\\)</div>
    <div class="fline">\\(\\cos\\frac{\\alpha}{2} = \\pm\\sqrt{\\frac{1 + \\cos\\alpha}{2}}\\)</div>
    </div></div>
    </div>

    <div class="fsec" style="background:linear-gradient(90deg,#3498db,#2980b9)" data-i18n="tf_triple">${t('tf_triple')}</div>
    <div class="fcard"><div class="fbody">
    <div class="fline">\\(\\sin 3\\alpha = 3\\sin\\alpha - 4\\sin^3\\alpha\\)</div>
    <div class="fline">\\(\\cos 3\\alpha = 4\\cos^3\\alpha - 3\\cos\\alpha\\)</div>
    </div></div>

    <!-- FORMULE NOI ADĂUGATE -->
    <div class="fsec" style="background:linear-gradient(90deg,#27ae60,#2ecc71)" data-i18n="tf_prod_sum">${t('tf_prod_sum')}</div>
    <div class="fcard"><div class="fbody">
    <div class="fline">\\(\\sin\\alpha \\cos\\beta = \\frac12 [\\sin(\\alpha+\\beta) + \\sin(\\alpha-\\beta)]\\)</div>
    <div class="fline">\\(\\cos\\alpha \\sin\\beta = \\frac12 [\\sin(\\alpha+\\beta) - \\sin(\\alpha-\\beta)]\\)</div>
    <div class="fline">\\(\\cos\\alpha \\cos\\beta = \\frac12 [\\cos(\\alpha+\\beta) + \\cos(\\alpha-\\beta)]\\)</div>
    <div class="fline">\\(\\sin\\alpha \\sin\\beta = \\frac12 [\\cos(\\alpha-\\beta) - \\cos(\\alpha+\\beta)]\\)</div>
    </div></div>

    <div class="fsec" style="background:linear-gradient(90deg,#e74c3c,#c0392b)" data-i18n="tf_sum_prod">${t('tf_sum_prod')}</div>
    <div class="fcard"><div class="fbody">
    <div class="fline">\\(\\sin A + \\sin B = 2 \\sin\\frac{A+B}{2} \\cos\\frac{A-B}{2}\\)</div>
    <div class="fline">\\(\\sin A - \\sin B = 2 \\cos\\frac{A+B}{2} \\sin\\frac{A-B}{2}\\)</div>
    <div class="fline">\\(\\cos A + \\cos B = 2 \\cos\\frac{A+B}{2} \\cos\\frac{A-B}{2}\\)</div>
    <div class="fline">\\(\\cos A - \\cos B = -2 \\sin\\frac{A+B}{2} \\sin\\frac{A-B}{2}\\)</div>
    </div></div>

    <div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#9b59b6)" data-i18n="tf_power">${t('tf_power')}</div>
    <div class="fcard"><div class="fbody">
    <div class="fline">\\(\\sin^2\\alpha = \\frac{1 - \\cos 2\\alpha}{2}\\)</div>
    <div class="fline">\\(\\cos^2\\alpha = \\frac{1 + \\cos 2\\alpha}{2}\\)</div>
    </div></div>
    `;

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]));
}
