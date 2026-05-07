// modules/complexe/calc.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="cx_calc_title">${t('cx_calc_title')}</h2>
    <div class="description" data-i18n="cx_calc_desc">${t('cx_calc_desc')}</div>

    <div style="background:var(--input-bg); padding:12px; border-radius:6px; margin-bottom:15px; border-left:3px solid var(--accent); line-height:1.6;">
    <strong data-i18n="cx_def_title">${t('cx_def_title')}</strong><br>
    <span data-i18n="cx_def_text">${t('cx_def_text')}</span>
    </div>

    <div class="fsec" style="background:linear-gradient(90deg,#16a085,#1abc9c)" data-i18n="cx_cart_to_pol">${t('cx_cart_to_pol')}</div>
    <div style="display:flex; gap:10px; margin:10px 0;">
    <input id="cx-a" type="number" step="any" placeholder="a (Re)" style="flex:1;">
    <input id="cx-b" type="number" step="any" placeholder="b (Im)" style="flex:1;">
    </div>
    <div class="btn-group btn-group-1"><button id="cx-btn-cart-pol" data-i18n="cx_btn_cart_pol">${t('cx_btn_cart_pol')}</button></div>

    <div class="fsec" style="background:linear-gradient(90deg,#e67e22,#d35400); margin-top:15px;" data-i18n="cx_pol_to_cart">${t('cx_pol_to_cart')}</div>
    <div style="display:flex; gap:10px; margin:10px 0;">
    <input id="cx-r" type="number" step="any" placeholder="r (modul)" style="flex:1;">
    <input id="cx-theta" type="number" step="any" placeholder="θ (grade)" style="flex:1;">
    </div>
    <div class="btn-group btn-group-1"><button id="cx-btn-pol-cart" data-i18n="cx_btn_pol_cart">${t('cx_btn_pol_cart')}</button></div>

    <div class="btn-group btn-group-1" style="margin-top:10px;">
    <button id="cx-btn-props" style="background:#9b59b6;" data-i18n="cx_btn_props">${t('cx_btn_props')}</button>
    </div>
    `;

    function show(html, err = false) {
        resBox.style.display = 'block';
        resBox.innerHTML = html;
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        requestAnimationFrame(() => {
            if (window.MathJax?.typesetPromise) MathJax.typesetPromise([resBox]).catch(() => {});
        });
    }

    // 🔄 Cartezian → Polar
    document.getElementById('cx-btn-cart-pol').onclick = () => {
        try {
            const a = parseFloat(document.getElementById('cx-a').value);
            const b = parseFloat(document.getElementById('cx-b').value);
            if (isNaN(a) || isNaN(b)) throw new Error(t('cx_err_input'));
            const r = Math.hypot(a, b);
            const thetaRad = Math.atan2(b, a);
            const thetaDeg = thetaRad * 180 / Math.PI;
            const thetaPi = (thetaDeg / 180).toFixed(4).replace(/\.?0+$/, '');
            show(`
            <div style="text-align:left; line-height:1.8; padding:5px 0;">
            \\(r = |z| = \\sqrt{${a}^2 + ${b}^2} = ${r.toFixed(4)}\\)<br>
            \\(\\theta = \\operatorname{atan2}(${b}, ${a}) = ${thetaRad.toFixed(4)} \\text{ rad} \\approx ${thetaDeg.toFixed(2)}^\\circ\\)<br>
            <strong style="color:var(--accent)">\\(z = ${r.toFixed(4)} \\cdot e^{i \\cdot ${thetaPi}\\pi}\\)</strong>
            </div>`);
        } catch (e) { show(`❌ ${e.message}`, true); }
    };

    // 🔄 Polar → Cartezian
    document.getElementById('cx-btn-pol-cart').onclick = () => {
        try {
            const r = parseFloat(document.getElementById('cx-r').value);
            const thetaDeg = parseFloat(document.getElementById('cx-theta').value);
            if (isNaN(r) || isNaN(thetaDeg)) throw new Error(t('cx_err_input'));
            const thetaRad = thetaDeg * Math.PI / 180;
            const a = r * Math.cos(thetaRad);
            const b = r * Math.sin(thetaRad);
            show(`
            <div style="text-align:left; line-height:1.8; padding:5px 0;">
            \\(a = ${r} \\cos(${thetaDeg}^\\circ) = ${a.toFixed(4)}\\)<br>
            \\(b = ${r} \\sin(${thetaDeg}^\\circ) = ${b.toFixed(4)}\\)<br>
            <strong style="color:var(--accent)">\\(z = ${a.toFixed(4)} + ${b.toFixed(4)}i\\)</strong>
            </div>`);
        } catch (e) { show(`❌ ${e.message}`, true); }
    };

    // 📊 Proprietăți (Modul, Arg, Conjugat, Invers)
    document.getElementById('cx-btn-props').onclick = () => {
        try {
            const a = parseFloat(document.getElementById('cx-a').value);
            const b = parseFloat(document.getElementById('cx-b').value);
            if (isNaN(a) || isNaN(b)) throw new Error(t('cx_err_input'));
            const r = Math.hypot(a, b);
            const arg = Math.atan2(b, a);
            const conjA = a, conjB = -b;
            let invA, invB;
            if (r === 0) throw new Error(t('cx_err_div0'));
            invA = a / (r * r);
            invB = -b / (r * r);

            show(`
            <div style="text-align:left; line-height:1.9; padding:5px 0;">
            \\(\\bullet\\; |z| = ${r.toFixed(4)}\\)<br>
            \\(\\bullet\\; \\arg(z) = ${arg.toFixed(4)} \\text{ rad}\\)<br>
            \\(\\bullet\\; \\bar{z} = ${conjA.toFixed(4)} ${conjB >= 0 ? '+' : '-'} ${Math.abs(conjB).toFixed(4)}i\\)<br>
            \\(\\bullet\\; z^{-1} = \\frac{\\bar{z}}{|z|^2} = ${invA.toFixed(4)} ${invB >= 0 ? '+' : '-'} ${Math.abs(invB).toFixed(4)}i\\)
            </div>`);
        } catch (e) { show(`❌ ${e.message}`, true); }
    };

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]));
}
