// modules/complexe/ecuatii.js
import { t } from '../../utils/i18n.js';

// 🧮 Helper Complex Numbers
const C = {
    sqrt: (a, b) => {
        const r = Math.hypot(a, b), th = Math.atan2(b, a);
        return { re: Math.sqrt(r) * Math.cos(th/2), im: Math.sqrt(r) * Math.sin(th/2) };
    },
    polar: (a, b) => ({ r: Math.hypot(a, b), th: Math.atan2(b, a) }),
    div: (r1, i1, r2, i2) => {
        const d = r2*r2 + i2*i2;
        return { re: (r1*r2 + i1*i2)/d, im: (i1*r2 - r1*i2)/d };
    },
    fmt: (re, im, dec=4) => {
        if (Math.abs(re) < 1e-9 && Math.abs(im) < 1e-9) return "0";
        const r = re.toFixed(dec).replace(/\.?0+$/, '');
        const i = Math.abs(im).toFixed(dec).replace(/\.?0+$/, '');
        if (Math.abs(im) < 1e-9) return r;
        return im > 0 ? `${r} + ${i}i` : `${r} - ${i}i`;
    }
};

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');
    const get = id => parseFloat(document.getElementById(id).value) || 0;

    ws.innerHTML = `
    <h2 data-i18n="eq_title">${t('eq_title')}</h2>
    <div class="description" data-i18n="eq_desc">${t('eq_desc')}</div>

    <div class="fsec" style="background:linear-gradient(90deg,#16a085,#1abc9c)" data-i18n="eq2_title">${t('eq2_title')}</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin:10px 0;">
    <input id="eq2-a-re" type="number" step="any" placeholder="Re(a)" style="flex:1"><input id="eq2-a-im" type="number" step="any" placeholder="Im(a)" style="flex:1">
    <input id="eq2-b-re" type="number" step="any" placeholder="Re(b)" style="flex:1"><input id="eq2-b-im" type="number" step="any" placeholder="Im(b)" style="flex:1">
    <input id="eq2-c-re" type="number" step="any" placeholder="Re(c)" style="flex:1"><input id="eq2-c-im" type="number" step="any" placeholder="Im(c)" style="flex:1">
    </div>
    <div class="btn-group btn-group-1"><button id="btn-eq2" data-i18n="eq_btn_solve">${t('eq_btn_solve')}</button></div>

    <div class="fsec" style="background:linear-gradient(90deg,#e67e22,#d35400);margin-top:15px" data-i18n="eqn_title">${t('eqn_title')}</div>
    <div style="display:flex;gap:8px;margin:10px 0;">
    <input id="eqn-n" type="number" min="1" max="20" value="3" style="width:60px" placeholder="n">
    <input id="eqn-c-re" type="number" step="any" placeholder="Re(c)" style="flex:1"><input id="eqn-c-im" type="number" step="any" placeholder="Im(c)" style="flex:1">
    </div>
    <div class="btn-group btn-group-1"><button id="btn-eqn" data-i18n="eq_btn_solve">${t('eq_btn_solve')}</button></div>

    <div class="fsec" style="background:linear-gradient(90deg,#9b59b6,#8e44ad);margin-top:15px" data-i18n="eq1_title">${t('eq1_title')}</div>
    <div style="display:flex;gap:8px;margin:10px 0;">
    <input id="eq1-n" type="number" min="1" max="20" value="4" style="width:60px" placeholder="n">
    </div>
    <div class="btn-group btn-group-1"><button id="btn-eq1" data-i18n="eq_btn_solve">${t('eq_btn_solve')}</button></div>

    <div class="fsec" style="background:linear-gradient(90deg,#3498db,#2980b9);margin-top:15px" data-i18n="eq4_title">${t('eq4_title')}</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin:10px 0;">
    <input id="eq4-a-re" type="number" step="any" placeholder="Re(a)" style="flex:1"><input id="eq4-a-im" type="number" step="any" placeholder="Im(a)" style="flex:1">
    <input id="eq4-b-re" type="number" step="any" placeholder="Re(b)" style="flex:1"><input id="eq4-b-im" type="number" step="any" placeholder="Im(b)" style="flex:1">
    <input id="eq4-c-re" type="number" step="any" placeholder="Re(c)" style="flex:1"><input id="eq4-c-im" type="number" step="any" placeholder="Im(c)" style="flex:1">
    </div>
    <div class="btn-group btn-group-1"><button id="btn-eq4" data-i18n="eq_btn_solve">${t('eq_btn_solve')}</button></div>
    `;

    function show(html, err=false) {
        resBox.style.display='block'; resBox.innerHTML=html; resBox.style.borderLeftColor=err?'#ff5555':'var(--accent)';
        requestAnimationFrame(()=>{ if(window.MathJax?.typesetPromise) MathJax.typesetPromise([resBox]).catch(()=>{}); });
    }

    // 📐 Gradul II (formatare riguroasă: Δ < 0 sau complex → δ²)
    document.getElementById('btn-eq2').onclick = () => {
        try {
            const ar=get('eq2-a-re'), ai=get('eq2-a-im');
            if (ar===0 && ai===0) throw new Error(t('eq_err_a0'));
            const br=get('eq2-b-re'), bi=get('eq2-b-im');
            const cr=get('eq2-c-re'), ci=get('eq2-c-im');
            const b2re = br*br - bi*bi, b2im = 2*br*bi;
            const ac4re = 4*(ar*cr - ai*ci), ac4im = 4*(ar*ci + ai*cr);
            const dre = b2re - ac4re, dim = b2im - ac4im;
            const sq = C.sqrt(dre, dim);
            const x1 = C.div(-br + sq.re, -bi + sq.im, 2*ar, 2*ai);
            const x2 = C.div(-br - sq.re, -bi - sq.im, 2*ar, 2*ai);

            let deltaStr = C.fmt(dre, dim);
            let deltaSym = `\\sqrt{\\Delta}`;
            let deltaVal = C.fmt(sq.re, sq.im);

            const isComplex = Math.abs(dim) > 1e-9;
            const isNegReal = !isComplex && dre < 0;

            if (isNegReal) {
                const absDre = (-dre).toFixed(4).replace(/\.?0+$/, '');
                deltaStr = `-${absDre}`;
                deltaSym = `\\delta`;
                deltaVal = `i\\cdot\\sqrt{${absDre}}`;
            } else if (isComplex) {
                deltaSym = `\\delta`;
                deltaVal = C.fmt(sq.re, sq.im);
            }

            show(`\\(\\Delta = ${deltaStr} = ${deltaSym}^2 \\Rightarrow ${deltaSym} = ${deltaVal}\\)<br>
            \\(x_{1,2} = \\frac{-b \\pm ${deltaSym}}{2a} \\Rightarrow x_1 = ${C.fmt(x1.re, x1.im)}, \\; x_2 = ${C.fmt(x2.re, x2.im)}\\)`);
        } catch(e) { show(`❌ ${e.message}`, true); }
    };

    // 🔢 Binomă
    document.getElementById('btn-eqn').onclick = () => {
        try {
            const n = parseInt(document.getElementById('eqn-n').value);
            if (n<1 || n>20) throw new Error(t('eq_err_n'));
            const cre=get('eqn-c-re'), cim=get('eqn-c-im');
            const pol = C.polar(cre, cim);
            const r_n = Math.pow(pol.r, 1/n);
            let roots = '';
            for(let k=0; k<n; k++){
                const th = (pol.th + 2*Math.PI*k)/n;
                roots += `\\(x_{${k}} = ${C.fmt(r_n*Math.cos(th), r_n*Math.sin(th))} \\quad \\text{sau}\\quad r=${r_n.toFixed(3)}e^{i\\frac{${(pol.th*180/Math.PI).toFixed(2)}+${(k*360/n).toFixed(0)}^\\circ}{n}}\\)<br>`;
            }
            show(`<strong>${t('eqn_res')} \\(x^n = ${C.fmt(cre, cim)}\\)</strong><br>${roots}`);
        } catch(e) { show(`❌ ${e.message}`, true); }
    };

    // 🌟 Rădăcini unitate
    document.getElementById('btn-eq1').onclick = () => {
        try {
            const n = parseInt(document.getElementById('eq1-n').value);
            if (n<1 || n>20) throw new Error(t('eq_err_n'));
            let roots = '';
            for(let k=0; k<n; k++){
                const th = 2*Math.PI*k/n;
                roots += `\\(\\omega_{${k}} = ${C.fmt(Math.cos(th), Math.sin(th))}\\)<br>`;
            }
            show(`<strong>${t('eq1_res')} \\(x^n = 1\\)</strong><br>${roots}`);
        } catch(e) { show(`❌ ${e.message}`, true); }
    };

    // 📊 Biquadratică (fără ±√y, afișare directă a celor 4 rădăcini)
    document.getElementById('btn-eq4').onclick = () => {
        try {
            const ar=get('eq4-a-re'), ai=get('eq4-a-im');
            if (ar===0 && ai===0) throw new Error(t('eq_err_a0'));
            const br=get('eq4-b-re'), bi=get('eq4-b-im');
            const cr=get('eq4-c-re'), ci=get('eq4-c-im');
            const b2re = br*br - bi*bi, b2im = 2*br*bi;
            const ac4re = 4*(ar*cr - ai*ci), ac4im = 4*(ar*ci + ai*cr);
            const dre = b2re - ac4re, dim = b2im - ac4im;
            const sq = C.sqrt(dre, dim);
            const y1 = C.div(-br + sq.re, -bi + sq.im, 2*ar, 2*ai);
            const y2 = C.div(-br - sq.re, -bi - sq.im, 2*ar, 2*ai);
            const sx1 = C.sqrt(y1.re, y1.im), sx2 = C.sqrt(y2.re, y2.im);

            show(`\\(y_{1} = ${C.fmt(y1.re, y1.im)}, \\quad y_{2} = ${C.fmt(y2.re, y2.im)}\\)<br>
            \\(x_1 = ${C.fmt(sx1.re, sx1.im)}, \\quad x_2 = ${C.fmt(-sx1.re, -sx1.im)}\\)<br>
            \\(x_3 = ${C.fmt(sx2.re, sx2.im)}, \\quad x_4 = ${C.fmt(-sx2.re, -sx2.im)}\\)`);
        } catch(e) { show(`❌ ${e.message}`, true); }
    };

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]));
}
