// modules/aritmetica/diofantice.js
import { t } from '../../utils/i18n.js';

// 🔧 Funcții matematice auxiliare
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
const extGcd = (a, b) => {
    if (b === 0) return { g: a, x: 1, y: 0 };
    const { g, x, y } = extGcd(b, a % b);
    return { g, x: y, y: x - Math.floor(a / b) * y };
};
const modInv = (a, m) => {
    const { g, x } = extGcd(a, m);
    if (g !== 1) return null;
    return ((x % m) + m) % m;
};
const safeMod = (n, m) => ((n % m) + m) % m;

export function initUI() {
    const ws = document.getElementById('workspace');
    ws.innerHTML = `
    <h2 data-i18n="diof_title">${t('diof_title')}</h2>
    <div class="description" data-i18n="diof_desc">${t('diof_desc')}</div>

    <!-- 1️⃣ Ecuația ax + by = c -->
    <div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#6c3483); margin-top:15px;">${t('diof_sec_eq')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="diof_eq_title">${t('diof_eq_title')}</div>
    <div class="fbody">
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
    <input id="eq-a" type="number" placeholder="a" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <input id="eq-b" type="number" placeholder="b" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <input id="eq-c" type="number" placeholder="c" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <button id="btn-eq" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;">${t('diof_btn_solve')}</button>
    </div>
    <div id="out-eq" style="font-size:0.9rem; line-height:1.6; color:var(--text);"></div>
    </div>
    </div>
    </div>

    <!-- 2️⃣ Teorema Chineză a Resturilor -->
    <div class="fsec" style="background:linear-gradient(90deg,#2980b9,#3498db); margin-top:15px;">${t('diof_sec_crt')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="diof_crt_title">${t('diof_crt_title')}</div>
    <div class="fbody">
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
    <input id="crt-r" type="text" placeholder="Resturi (ex: 2,3,2)" style="flex:2; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <input id="crt-m" type="text" placeholder="Module (ex: 3,4,5)" style="flex:2; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <button id="btn-crt" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;">${t('diof_btn_solve')}</button>
    </div>
    <div id="out-crt" style="font-size:0.9rem; line-height:1.6; color:var(--text);"></div>
    </div>
    </div>
    </div>

    <!-- 3️⃣ Ziua Săptămânii (Zeller) -->
    <div class="fsec" style="background:linear-gradient(90deg,#27ae60,#2ecc71); margin-top:15px;">${t('diof_sec_zeller')}</div>
    <div class="fcards">
    <div class="fcard">
    <div class="fhead" data-i18n="diof_zeller_title">${t('diof_zeller_title')}</div>
    <div class="fbody">
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
    <input id="z-d" type="number" min="1" max="31" placeholder="Zi" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <input id="z-m" type="number" min="1" max="12" placeholder="Lună" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <input id="z-y" type="number" placeholder="An" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
    <button id="btn-zeller" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;">${t('diof_btn_calc')}</button>
    </div>
    <div id="out-zeller" style="font-size:0.9rem; line-height:1.6; color:var(--text);"></div>
    </div>
    </div>
    </div>
    `;

    // 🔹 Solver Ecuație Liniară
    document.getElementById('btn-eq').addEventListener('click', () => {
        const a = Number(document.getElementById('eq-a').value);
        const b = Number(document.getElementById('eq-b').value);
        const c = Number(document.getElementById('eq-c').value);
        const out = document.getElementById('out-eq');
        if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) return out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t('diof_err_nums')}</span>`;

        const g = gcd(a, b);
        if (c % g !== 0) return out.innerHTML = `<span style="color:#e74c3c;">❌ ${t('diof_err_nosol')}</span>`;

        const { x: x0, y: y0 } = extGcd(a, b);
        const scale = c / g;
        const xp = x0 * scale, yp = y0 * scale;
        const bg = b / g, ag = a / g;

        out.innerHTML = `
        <div class="fline">\\(\\gcd(${a}, ${b}) = ${g} \\mid ${c} \\implies \\text{${t('diof_sol_exists')}}\\)</div>
        <div class="fline">\\(x = ${xp} ${bg > 0 ? '+' : '-'} ${Math.abs(bg)} \\cdot t\\)</div>
        <div class="fline">\\(y = ${yp} ${ag > 0 ? '-' : '+'} ${Math.abs(ag)} \\cdot t, \\quad t \\in \\mathbb{Z}\\)</div>
        <div class="fline" style="color:var(--text-muted); font-size:0.85rem; margin-top:6px;">${t('diof_note_particular')}</div>
        `;
        if (window.MathJax?.typesetPromise) MathJax.typesetPromise([out]).catch(() => {});
    });

    // 🔹 CRT Solver
    document.getElementById('btn-crt').addEventListener('click', () => {
        const parse = s => s.split(',').map(Number).filter(Number.isFinite);
        const r = parse(document.getElementById('crt-r').value);
        const m = parse(document.getElementById('crt-m').value);
        const out = document.getElementById('out-crt');

        if (r.length !== m.length || r.length === 0) return out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t('diof_err_crt_len')}</span>`;
        for (let i = 0; i < m.length; i++) {
            for (let j = i + 1; j < m.length; j++) if (gcd(m[i], m[j]) !== 1) return out.innerHTML = `<span style="color:#e74c3c;">❌ ${t('diof_err_crt_coprime')}</span>`;
        }

        let M = 1; m.forEach(v => M *= v);
        let x = 0;
        const steps = [];
        for (let i = 0; i < m.length; i++) {
            const Mi = M / m[i];
            const inv = modInv(Mi, m[i]);
            x = (x + r[i] * Mi * inv) % M;
            steps.push(`\\(M_i=${Mi}, \\; M_i^{-1} \\equiv ${inv} \\pmod{${m[i]}}\\)`);
        }
        x = safeMod(x, M);

        out.innerHTML = `
        <div class="fline">\\(x \\equiv ${x} \\pmod{${M}}\\)</div>
        <div class="fline" style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">${steps.join(' <br> ')}</div>
        `;
        if (window.MathJax?.typesetPromise) MathJax.typesetPromise([out]).catch(() => {});
    });

    // 🔹 Zeller Algorithm
    document.getElementById('btn-zeller').addEventListener('click', () => {
        const d = Number(document.getElementById('z-d').value);
        const m = Number(document.getElementById('z-m').value);
        const y = Number(document.getElementById('z-y').value);
        const out = document.getElementById('out-zeller');
        if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1) return out.innerHTML = `<span style="color:#e74c3c;">⚠️ ${t('diof_err_date')}</span>`;

        let mm = m, yy = y;
        if (mm <= 2) { mm += 12; yy -= 1; }
        const K = yy % 100, J = Math.floor(yy / 100);
        const h = safeMod(d + Math.floor(13 * (mm + 1) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - 2 * J, 7);
        const days = ['Sâmbătă', 'Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri'];
        const daysEn = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const dayName = (localStorage.getItem('app_lang') === 'en') ? daysEn[h] : days[h];

        out.innerHTML = `
        <div class="fline">\\(${d}/${m}/${y} \\implies \\textbf{${dayName}}\\)</div>
        <div class="fline" style="color:var(--text-muted); font-size:0.85rem; margin-top:4px;">${t('diof_note_zeller')}</div>
        `;
        if (window.MathJax?.typesetPromise) MathJax.typesetPromise([out]).catch(() => {});
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
