// modules/trig/trig_val.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');
    ws.innerHTML = `
    <h2 data-i18n="trigval_title">${t('trigval_title')}</h2>
    <div class="description" data-i18n="trigval_desc">${t('trigval_desc')}</div>

    <!-- CADRANUL I -->
    <div class="trig-q" data-i18n="trig_q1">${t('trig_q1')}</div>
    <div class="trig-scroll"><table class="trig-t"><tbody>
    <tr class="r-deg"><td class="tl" data-i18n="trig_deg">${t('trig_deg')}</td><td>0</td><td>15</td><td>30</td><td>45</td><td>60</td><td>75</td><td>90</td></tr>
    <tr class="r-rpi"><td class="tl">\\(\\pi\\)</td><td>0</td><td>\\(\\frac{\\pi}{12}\\)</td><td>\\(\\frac{\\pi}{6}\\)</td><td>\\(\\frac{\\pi}{4}\\)</td><td>\\(\\frac{\\pi}{3}\\)</td><td>\\(\\frac{5\\pi}{12}\\)</td><td>\\(\\frac{\\pi}{2}\\)</td></tr>
    <tr class="r-rdec"><td class="tl">\\(\\approx\\)</td><td>0.000</td><td>0.262</td><td>0.524</td><td>0.785</td><td>1.047</td><td>1.309</td><td>1.571</td></tr>
    <tr class="r-sin"><td class="tl">\\(\\sin\\)</td><td>0</td><td>\\(\\frac{\\sqrt{6}-\\sqrt{2}}{4}\\)</td><td>\\(\\frac12\\)</td><td>\\(\\frac{\\sqrt2}{2}\\)</td><td>\\(\\frac{\\sqrt3}{2}\\)</td><td>\\(\\frac{\\sqrt{6}+\\sqrt{2}}{4}\\)</td><td>1</td></tr>
    <tr class="r-cos"><td class="tl">\\(\\cos\\)</td><td>1</td><td>\\(\\frac{\\sqrt{6}+\\sqrt{2}}{4}\\)</td><td>\\(\\frac{\\sqrt3}{2}\\)</td><td>\\(\\frac{\\sqrt2}{2}\\)</td><td>\\(\\frac12\\)</td><td>\\(\\frac{\\sqrt{6}-\\sqrt{2}}{4}\\)</td><td>0</td></tr>
    <tr class="r-tan"><td class="tl">\\(\\tan\\)</td><td>0</td><td>\\(2-\\sqrt3\\)</td><td>\\(\\frac{\\sqrt3}{3}\\)</td><td>1</td><td>\\(\\sqrt3\\)</td><td>\\(2+\\sqrt3\\)</td><td>∞</td></tr>
    </tbody></table></div>

    <!-- CADRANUL II -->
    <div class="trig-q" style="background:linear-gradient(90deg,#2ecc71,#27ae60)" data-i18n="trig_q2">${t('trig_q2')}</div>
    <div class="trig-scroll"><table class="trig-t"><tbody>
    <tr class="r-deg"><td class="tl" data-i18n="trig_deg">${t('trig_deg')}</td><td>90</td><td>105</td><td>120</td><td>135</td><td>150</td><td>165</td><td>180</td></tr>
    <tr class="r-rpi"><td class="tl">\\(\\pi\\)</td><td>\\(\\frac{\\pi}{2}\\)</td><td>\\(\\frac{7\\pi}{12}\\)</td><td>\\(\\frac{2\\pi}{3}\\)</td><td>\\(\\frac{3\\pi}{4}\\)</td><td>\\(\\frac{5\\pi}{6}\\)</td><td>\\(\\frac{11\\pi}{12}\\)</td><td>\\(\\pi\\)</td></tr>
    <tr class="r-rdec"><td class="tl">\\(\\approx\\)</td><td>1.571</td><td>1.833</td><td>2.094</td><td>2.356</td><td>2.618</td><td>2.880</td><td>3.142</td></tr>
    <tr class="r-sin"><td class="tl">\\(\\sin\\)</td><td>1</td><td>\\(\\frac{\\sqrt{6}+\\sqrt{2}}{4}\\)</td><td>\\(\\frac{\\sqrt3}{2}\\)</td><td>\\(\\frac{\\sqrt2}{2}\\)</td><td>\\(\\frac12\\)</td><td>\\(\\frac{\\sqrt{6}-\\sqrt{2}}{4}\\)</td><td>0</td></tr>
    <tr class="r-cos"><td class="tl">\\(\\cos\\)</td><td>0</td><td class="neg">\\(-\\frac{\\sqrt{6}-\\sqrt{2}}{4}\\)</td><td class="neg">\\(-\\frac12\\)</td><td class="neg">\\(-\\frac{\\sqrt2}{2}\\)</td><td class="neg">\\(-\\frac{\\sqrt3}{2}\\)</td><td class="neg">\\(-\\frac{\\sqrt{6}+\\sqrt{2}}{4}\\)</td><td class="neg">\\(-1\\)</td></tr>
    <tr class="r-tan"><td class="tl">\\(\\tan\\)</td><td>∞</td><td class="neg">\\(-(2+\\sqrt3)\\)</td><td class="neg">\\(-\\sqrt3\\)</td><td class="neg">\\(-1\\)</td><td class="neg">\\(-\\frac{\\sqrt3}{3}\\)</td><td class="neg">\\(-(2-\\sqrt3)\\)</td><td>0</td></tr>
    </tbody></table></div>

    <!-- CADRANUL III -->
    <div class="trig-q" style="background:linear-gradient(90deg,#e67e22,#d35400)" data-i18n="trig_q3">${t('trig_q3')}</div>
    <div class="trig-scroll"><table class="trig-t"><tbody>
    <tr class="r-deg"><td class="tl" data-i18n="trig_deg">${t('trig_deg')}</td><td>180</td><td>195</td><td>210</td><td>225</td><td>240</td><td>255</td><td>270</td></tr>
    <tr class="r-rpi"><td class="tl">\\(\\pi\\)</td><td>\\(\\pi\\)</td><td>\\(\\frac{13\\pi}{12}\\)</td><td>\\(\\frac{7\\pi}{6}\\)</td><td>\\(\\frac{5\\pi}{4}\\)</td><td>\\(\\frac{4\\pi}{3}\\)</td><td>\\(\\frac{17\\pi}{12}\\)</td><td>\\(\\frac{3\\pi}{2}\\)</td></tr>
    <tr class="r-rdec"><td class="tl">\\(\\approx\\)</td><td>3.142</td><td>3.403</td><td>3.665</td><td>3.927</td><td>4.189</td><td>4.451</td><td>4.712</td></tr>
    <tr class="r-sin"><td class="tl">\\(\\sin\\)</td><td>0</td><td class="neg">\\(-\\frac{\\sqrt{6}-\\sqrt{2}}{4}\\)</td><td class="neg">\\(-\\frac12\\)</td><td class="neg">\\(-\\frac{\\sqrt2}{2}\\)</td><td class="neg">\\(-\\frac{\\sqrt3}{2}\\)</td><td class="neg">\\(-\\frac{\\sqrt{6}+\\sqrt{2}}{4}\\)</td><td class="neg">\\(-1\\)</td></tr>
    <tr class="r-cos"><td class="tl">\\(\\cos\\)</td><td class="neg">\\(-1\\)</td><td class="neg">\\(-\\frac{\\sqrt{6}+\\sqrt{2}}{4}\\)</td><td class="neg">\\(-\\frac{\\sqrt3}{2}\\)</td><td class="neg">\\(-\\frac{\\sqrt2}{2}\\)</td><td class="neg">\\(-\\frac12\\)</td><td class="neg">\\(-\\frac{\\sqrt{6}-\\sqrt{2}}{4}\\)</td><td>0</td></tr>
    <tr class="r-tan"><td class="tl">\\(\\tan\\)</td><td>0</td><td>\\(2-\\sqrt3\\)</td><td>\\(\\frac{\\sqrt3}{3}\\)</td><td>1</td><td>\\(\\sqrt3\\)</td><td>\\(2+\\sqrt3\\)</td><td>∞</td></tr>
    </tbody></table></div>

    <!-- CADRANUL IV -->
    <div class="trig-q" style="background:linear-gradient(90deg,#9b59b6,#8e44ad)" data-i18n="trig_q4">${t('trig_q4')}</div>
    <div class="trig-scroll"><table class="trig-t"><tbody>
    <tr class="r-deg"><td class="tl" data-i18n="trig_deg">${t('trig_deg')}</td><td>270</td><td>285</td><td>300</td><td>315</td><td>330</td><td>345</td><td>360</td></tr>
    <tr class="r-rpi"><td class="tl">\\(\\pi\\)</td><td>\\(\\frac{3\\pi}{2}\\)</td><td>\\(\\frac{19\\pi}{12}\\)</td><td>\\(\\frac{5\\pi}{3}\\)</td><td>\\(\\frac{7\\pi}{4}\\)</td><td>\\(\\frac{11\\pi}{6}\\)</td><td>\\(\\frac{23\\pi}{12}\\)</td><td>\\(2\\pi\\)</td></tr>
    <tr class="r-rdec"><td class="tl">\\(\\approx\\)</td><td>4.712</td><td>4.974</td><td>5.236</td><td>5.498</td><td>5.760</td><td>6.021</td><td>6.283</td></tr>
    <tr class="r-sin"><td class="tl">\\(\\sin\\)</td><td class="neg">\\(-1\\)</td><td class="neg">\\(-\\frac{\\sqrt{6}+\\sqrt{2}}{4}\\)</td><td class="neg">\\(-\\frac{\\sqrt3}{2}\\)</td><td class="neg">\\(-\\frac{\\sqrt2}{2}\\)</td><td class="neg">\\(-\\frac12\\)</td><td class="neg">\\(-\\frac{\\sqrt{6}-\\sqrt{2}}{4}\\)</td><td>0</td></tr>
    <tr class="r-cos"><td class="tl">\\(\\cos\\)</td><td>0</td><td>\\(\\frac{\\sqrt{6}-\\sqrt{2}}{4}\\)</td><td>\\(\\frac12\\)</td><td>\\(\\frac{\\sqrt2}{2}\\)</td><td>\\(\\frac{\\sqrt3}{2}\\)</td><td>\\(\\frac{\\sqrt{6}+\\sqrt{2}}{4}\\)</td><td>1</td></tr>
    <tr class="r-tan"><td class="tl">\\(\\tan\\)</td><td>∞</td><td class="neg">\\(-(2+\\sqrt3)\\)</td><td class="neg">\\(-\\sqrt3\\)</td><td class="neg">\\(-1\\)</td><td class="neg">\\(-\\frac{\\sqrt3}{3}\\)</td><td class="neg">\\(-(2-\\sqrt3)\\)</td><td>0</td></tr>
    </tbody></table></div>
    `;

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
