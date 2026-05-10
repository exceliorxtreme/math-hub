// modules/algebra/inegalitati.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');

    ws.innerHTML = `
    <h2 data-i18n="ineq_title">${t('ineq_title')}</h2>
    <div class="description" data-i18n="ineq_desc">${t('ineq_desc')}</div>

    <!-- 1️⃣ Elementare & Medii -->
    <div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#6c3483); margin-top:15px;">${t('ineq_sec_elem')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="ineq_amgm_title">${t('ineq_amgm_title')}</div>
    <div class="fbody">
    <div class="fline">\\(n=2: \\frac{a+b}{2} \\ge \\sqrt{ab}\\)</div>
    <div class="fline">\\(n=3: \\frac{a+b+c}{3} \\ge \\sqrt[3]{abc}\\)</div>
    <div class="fline">\\(n=4: \\frac{a+b+c+d}{4} \\ge \\sqrt[4]{abcd}\\)</div>
    <div class="fline">\\(\\text{General: } \\frac{1}{n}\\sum_{i=1}^n a_i \\ge \\sqrt[n]{\\prod_{i=1}^n a_i}\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lbl_cond')} \\(a_i > 0\\). ${t('lbl_eq')} \\(a_1 = a_2 = \\dots = a_n\\).</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="ineq_means_title">${t('ineq_means_title')}</div>
    <div class="fbody">
    <div class="fline">\\(H_n = \\frac{n}{\\sum \\frac{1}{a_i}}, \\; G_n = \\sqrt[n]{\\prod a_i}, \\; A_n = \\frac{\\sum a_i}{n}, \\; Q_n = \\sqrt{\\frac{\\sum a_i^2}{n}}\\)</div>
    <div class="fline">\\(H_n \\le G_n \\le A_n \\le Q_n\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lbl_cond')} \\(a_i > 0\\). ${t('lbl_eq')} toate egale.</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="ineq_bernoulli_title">${t('ineq_bernoulli_title')}</div>
    <div class="fbody">
    <div class="fline">\\(r=2: (1+x)^2 \\ge 1+2x\\)</div>
    <div class="fline">\\(r=3: (1+x)^3 \\ge 1+3x\\)</div>
    <div class="fline">\\(\\text{General: } (1+x)^r \\ge 1+rx\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('ineq_bernoulli_cond')}</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="ineq_basic_title">${t('ineq_basic_title')}</div>
    <div class="fbody">
    <div class="fline">\\((a \\pm b)^2 \\ge 0 \\implies a^2+b^2 \\ge \\pm 2ab\\)</div>
    <div class="fline">\\(|a+b| \\le |a|+|b| \\; (\\mathbb{R}) \\quad |z+w| \\le |z|+|w| \\; (\\mathbb{C})\\)</div>
    <div class="fline">\\(a^3+b^3+c^3 \\ge 3abc \\; (a,b,c>0) \\quad \\frac{a}{b}+\\frac{b}{a} \\ge 2 \\; (a,b>0)\\)</div>
    </div>
    </div>
    </div>

    <!-- 2️⃣ CBS & Variante -->
    <div class="fsec" style="background:linear-gradient(90deg,#2980b9,#3498db); margin-top:15px;">${t('ineq_sec_cbs')}</div>

    <div class="fcard">
    <div class="fhead" data-i18n="ineq_cbs_title">${t('ineq_cbs_title')}</div>
    <div class="fbody">
    <div class="fline">\\(n=2: (a_1^2+a_2^2)(b_1^2+b_2^2) \\ge (a_1b_1+a_2b_2)^2\\)</div>
    <div class="fline">\\(n=3: (a_1^2+a_2^2+a_3^2)(b_1^2+b_2^2+b_3^2) \\ge (a_1b_1+a_2b_2+a_3b_3)^2\\)</div>
    <div class="fline">\\(n=4: (a_1^2+a_2^2+a_3^2+a_4^2)(b_1^2+b_2^2+b_3^2+b_4^2) \\ge (a_1b_1+a_2b_2+a_3b_3+a_4b_4)^2\\)</div>
    <div class="fline">\\(\\text{General: } (\\sum_{i=1}^n a_i^2)(\\sum_{i=1}^n b_i^2) \\ge (\\sum_{i=1}^n a_i b_i)^2\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lbl_eq')} \\(\\vec{a} \\parallel \\vec{b} \\quad (\\frac{a_1}{b_1} = \\frac{a_2}{b_2} = \\dots)\\)</div>
    </div>
    </div>

    <div class="fcard">
    <div class="fhead" data-i18n="ineq_titu_title">${t('ineq_titu_title')}</div>
    <div class="fbody">
    <div class="fline">\\(n=2: \\frac{a_1^2}{b_1}+\\frac{a_2^2}{b_2} \\ge \\frac{(a_1+a_2)^2}{b_1+b_2}\\)</div>
    <div class="fline">\\(n=3: \\frac{a_1^2}{b_1}+\\frac{a_2^2}{b_2}+\\frac{a_3^2}{b_3} \\ge \\frac{(a_1+a_2+a_3)^2}{b_1+b_2+b_3}\\)</div>
    <div class="fline">\\(n=4: \\frac{a_1^2}{b_1}+\\frac{a_2^2}{b_2}+\\frac{a_3^2}{b_3}+\\frac{a_4^2}{b_4} \\ge \\frac{(a_1+a_2+a_3+a_4)^2}{b_1+b_2+b_3+b_4}\\)</div>
    <div class="fline">\\(\\text{General: } \\sum_{i=1}^n \\frac{a_i^2}{b_i} \\ge \\frac{(\\sum_{i=1}^n a_i)^2}{\\sum_{i=1}^n b_i}\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lbl_cond')} \\(b_i > 0\\). ${t('lbl_eq')} \\(\\frac{a_1}{b_1} = \\frac{a_2}{b_2} = \\dots\\)</div>

    <!-- ✅ NOU: Condiție explicită pentru generalizarea ponderată -->
    <div class="fline" style="color:var(--text-muted); font-size:0.82rem; margin: 6px 0 2px 0;">${t('ineq_radon_weighted_cond')}</div>
    <div class="fline">\\(\\sum_{i=1}^{n} \\frac{x_i^p}{a_i^{p-1}} \\geq \\frac{(\\sum x_i)^p}{(\\sum a_i)^{p-1}}\\)</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="ineq_holder_title">${t('ineq_holder_title')}</div>
    <div class="fbody">
    <div class="fline">\\(n=3: a_1b_1 + a_2b_2 + a_3b_3 \\le (a_1^p + a_2^p + a_3^p)^{1/p}(b_1^q + b_2^q + b_3^q)^{1/q}\\)</div>
    <div class="fline">\\(\\text{General: } \\sum_{i=1}^n a_i b_i \\le (\\sum_{i=1}^n a_i^p)^{1/p}(\\sum_{i=1}^n b_i^q)^{1/q}, \\quad \\frac{1}{p}+\\frac{1}{q}=1\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lbl_cond')} \\(a_i,b_i \\ge 0, \\; p,q > 1\\). ${t('ineq_holder_eq')}</div>
    </div>
    </div>

    <!-- 3️⃣ Ordine & Jensen -->
    <div class="fsec" style="background:linear-gradient(90deg,#27ae60,#2ecc71); margin-top:15px;">${t('ineq_sec_jensen')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="ineq_rearrange_title">${t('ineq_rearrange_title')}</div>
    <div class="fbody">
    <div class="fline">\\(a_1 \\ge \\dots \\ge a_n, \\; b_1 \\ge \\dots \\ge b_n \\implies \\sum a_i b_{n-i+1} \\le \\sum a_i b_{\\sigma(i)} \\le \\sum a_i b_i\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lbl_eq')} \\(\\sigma\\) identică sau inversă.</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="ineq_chebyshev_title">${t('ineq_chebyshev_title')}</div>
    <div class="fbody">
    <div class="fline">\\(n=3: \\frac{a_1b_1 + a_2b_2 + a_3b_3}{3} \\ge \\frac{a_1+a_2+a_3}{3} \\cdot \\frac{b_1+b_2+b_3}{3}\\)</div>
    <div class="fline">\\(n=4: \\frac{a_1b_1 + a_2b_2 + a_3b_3 + a_4b_4}{4} \\ge \\frac{a_1+a_2+a_3+a_4}{4} \\cdot \\frac{b_1+b_2+b_3+b_4}{4}\\)</div>
    <div class="fline">\\(\\text{Monotone same: } \\frac{1}{n}\\sum_{i=1}^n a_i b_i \\ge (\\frac{1}{n}\\sum_{i=1}^n a_i)(\\frac{1}{n}\\sum_{i=1}^n b_i)\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lbl_eq')} \\(a_i\\) sau \\(b_i\\) constante. ${t('lbl_cond')} ambele secvențe monotone în același sens.</div>
    </div>
    </div>
    div class="fcard">
    <div class="fhead" data-i18n="ineq_jensen_title">${t('ineq_jensen_title')}</div>
    <div class="fbody">
    <div class="fline">\\(n=2: f(\\frac{x_1+x_2}{2}) \\le \\frac{f(x_1)+f(x_2)}{2}\\)</div>
    <div class="fline">\\(n=3: f(\\frac{x_1+x_2+x_3}{3}) \\le \\frac{f(x_1)+f(x_2)+f(x_3)}{3}\\)</div>
    <div class="fline">\\(\\text{General: } f(\\sum_{i=1}^n w_i x_i) \\le \\sum_{i=1}^n w_i f(x_i), \\; w_i \\ge 0, \\sum w_i = 1\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('lbl_eq')} \\(x_i\\) egale sau \\(f\\) liniară. Convex \\(\\implies \\le\\), concav \\(\\implies \\ge\\).</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="ineq_jensen_apps_title">${t('ineq_jensen_apps_title')}</div>
    <div class="fbody">
    <div class="fline">\\(e^x \\ge 1+x \\quad \\ln x \\le x-1 \\quad (x>0)\\)</div>
    <div class="fline">\\(\\frac{x^p}{p} + \\frac{y^q}{q} \\ge xy \\quad (p,q>1, \\frac{1}{p}+\\frac{1}{q}=1, \\; x,y \\ge 0)\\)</div>
    </div>
    </div>
    </div>

    <!-- 4️⃣ Triunghi & Trig -->
    <div class="fsec" style="background:linear-gradient(90deg,#d35400,#e67e22); margin-top:15px;">${t('ineq_sec_tri')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="ineq_tri_basic_title">${t('ineq_tri_basic_title')}</div>
    <div class="fbody">
    <div class="fline">\\(a+b>c, \\; b+c>a, \\; c+a>b\\)</div>
    <div class="fline">\\(a^2+b^2+c^2 \\ge 4\\sqrt{3}S \\quad (\\text{Weitzenböck})\\)</div>
    <div class="fline">\\(a^2+b^2+c^2 \\ge ab+bc+ca \\ge 4\\sqrt{3}S\\)</div>
    </div>
    </div>
    <div class="fcard">
    <div class="fhead" data-i18n="ineq_trig_sums_title">${t('ineq_trig_sums_title')}</div>
    <div class="fbody">
    <div class="fline">\\(\\sin A + \\sin B + \\sin C \\le \\frac{3\\sqrt{3}}{2}\\)</div>
    <div class="fline">\\(\\cos A + \\cos B + \\cos C \\le \\frac{3}{2}\\)</div>
    <div class="fline">\\(\\tan A + \\tan B + \\tan C \\ge 3\\sqrt{3} \\quad (\\triangle \\text{ ascuțitunghic})\\)</div>
    <div class="fline" style="color:var(--text-muted); font-size:0.85rem;">${t('ineq_cond_abc')} ${t('ineq_trig_eq')}</div>
    </div>
    </div>
    </div>
    `;

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
