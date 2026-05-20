// modules/aritmetica/factori.js
import { t } from '../../utils/i18n.js';

function gcd(a, b) {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b) { [a, b] = [b, a % b]; }
    return a;
}

function lcm(a, b) {
    if (a === 0n || b === 0n) return 0n;
    return (a < 0n ? -a : a) * (b < 0n ? -b : b) / gcd(a, b);
}

function factorize(n) {
    if (n < 2) throw new Error(t('fact_err_min') || "Numerele trebuie să fie ≥ 2");
    const factors = [];
    let temp = n;
    for (let p = 2; p * p <= temp; p++) {
        if (temp % p === 0) {
            let count = 0;
            while (temp % p === 0) { temp /= p; count++; }
            factors.push({ p, count });
        }
    }
    if (temp > 1) factors.push({ p: temp, count: 1 });
    return factors;
}

// 🔢 Goldbach Helper
const MAX_GOLDBACH = 500000;
function isPrimeGB(n) {
    if (n < 2) return false;
    if (n === 2 || n === 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

export function initUI() {
    const ws = document.getElementById('workspace');

    ws.innerHTML = `
    <h2 data-i18n="fact_title">${t('fact_title')}</h2>
    <div class="description" data-i18n="fact_desc">${t('fact_desc')}</div>
    
    <div class="input-group">
        <label data-i18n="fact_lbl_a">${t('fact_lbl_a')}</label>
        <input id="fact-a" type="number" min="1" max="100000000000000" placeholder="Ex: 360">
    </div>
    <div class="input-group">
        <label data-i18n="fact_lbl_b">${t('fact_lbl_b')}</label>
        <input id="fact-b" type="number" min="1" max="100000000000000" placeholder="Ex: 1001">
    </div>
    
    <div class="btn-group btn-group-3">
        <button id="btn-factor" data-i18n="fact_btn">${t('fact_btn')}</button>
        <button id="btn-gcd" style="background:#e67e22" data-i18n="fact_btn_gcd">${t('fact_btn_gcd')}</button>
        <button id="btn-lcm" style="background:#2ecc71" data-i18n="fact_btn_lcm">${t('fact_btn_lcm')}</button>
    </div>
    <!-- ✅ Output local pentru primele 3 butoane -->
    <div id="out-top" style="margin-top:10px; font-size:0.9rem; line-height:1.6; color:var(--text);"></div>
    <!-- 🔢 Goldbach Section -->
<div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#6c3483); margin-top:15px;" data-i18n="gold_sec">${t('gold_sec')}</div>
<div class="fcards">
    <div class="fcard">
        <div class="fhead" data-i18n="gold_title">${t('gold_title')}</div>
        <div class="fbody">
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
                <input id="gold-n" type="number" min="4" max="500000" data-i18n-placeholder="gold_ph" placeholder="${t('gold_ph')}" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
                <button id="btn-gold" data-i18n="gold_btn" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;">${t('gold_btn')}</button>
            </div>
            <div style="display:flex; gap:12px; margin-bottom:8px; flex-wrap:wrap;">
                <label style="display:flex; align-items:center; gap:4px; font-size:0.9rem; color:var(--text); cursor:pointer;">
                    <input type="radio" name="gold-mode" value="2" checked> <span data-i18n="gold_mode_2">${t('gold_mode_2')}</span>
                </label>
                <label style="display:flex; align-items:center; gap:4px; font-size:0.9rem; color:var(--text); cursor:pointer;">
                    <input type="radio" name="gold-mode" value="3"> <span data-i18n="gold_mode_3">${t('gold_mode_3')}</span>
                </label>
            </div>
            <div id="out-gold" style="font-size:0.9rem; line-height:1.6; color:var(--text);"></div>
        </div>
    </div>
</div>
    `;

    // 🔒 Helper securizat pentru output-uri locale
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function showLocal(target, content, err = false, allowHtml = false) {
    target.style.display = 'block';
    
    // 🔒 ERORI: mereu textContent, zero interpretare HTML (CodeQL compliant)
    if (err) {
        target.textContent = String(content);
    } 
    // ✅ CONȚINUT LEGITIM: innerHTML doar pentru LaTeX generat intern (nu input utilizator)
    else if (allowHtml) {
        // Notă: `content` este întotdeauna generat intern din valori numerice validate,
        // nu conține input brut de la utilizator. Safe pentru MathJax.
        target.innerHTML = content;
    } 
    // 🔒 DEFAULT: textContent pentru orice alt caz
    else {
        target.textContent = String(content);
    }
    
    target.style.borderLeft = err ? '3px solid #e74c3c' : 'none';
    target.style.paddingLeft = err ? '8px' : '0';
    
    if (window.MathJax?.typesetPromise) {
        MathJax.typesetPromise([target]).catch(() => {});
    }
}
    const outTop = document.getElementById('out-top');
    const outGold = document.getElementById('out-gold');
    const getVal = id => BigInt(document.getElementById(id).value.trim() || '0');

    // Factorizare
    document.getElementById('btn-factor').addEventListener('click', () => {
        try {
            const a = getVal('fact-a');
            if (a < 2n) throw new Error(t('fact_err_min') || "Numărul trebuie să fie ≥ 2");
            if (a > 100000000000000n) throw new Error(t('fact_err_max') || "Maxim 10¹⁴");
            const factors = factorize(Number(a));
            const latex = factors.map(f => f.count === 1 ? `${f.p}` : `${f.p}^{${f.count}}`).join(' \\times ');
            showLocal(outTop, `\\(${a} = ${latex}\\)`, false, true);
        } catch (e) { showLocal(outTop, `❌ ${e.message}`, true); }
    });

    // CMMDC
    document.getElementById('btn-gcd').addEventListener('click', () => {
        try {
            const a = getVal('fact-a');
            const b = getVal('fact-b');
            if (a < 1n || b < 1n) throw new Error(t('fact_err_min') || "Numerele trebuie să fie ≥ 1");
            const rez = gcd(a, b);
            showLocal(outTop, `\\(CMMDC(${a}, ${b}) = ${rez}\\)`, false, true);
        } catch (e) { showLocal(outTop, `❌ ${e.message}`, true); }
    });

    // CMMMC
    document.getElementById('btn-lcm').addEventListener('click', () => {
        try {
            const a = getVal('fact-a');
            const b = getVal('fact-b');
            if (a < 1n || b < 1n) throw new Error(t('fact_err_min') || "Numerele trebuie să fie ≥ 1");
            const rez = lcm(a, b);
            showLocal(outTop, `\\(CMMMC(${a}, ${b}) = ${rez}\\)`, false, true);
        } catch (e) { showLocal(outTop, `❌ ${e.message}`, true); }
    });

    // 🔢 Goldbach
    const btnGold = document.getElementById('btn-gold');
    if (btnGold && outGold) {
        btnGold.addEventListener('click', () => {
            const n = Number(document.getElementById('gold-n').value);
            const mode = document.querySelector('input[name="gold-mode"]:checked').value;
            const btn = document.getElementById('btn-gold');

            const min = mode === '2' ? 4 : 7;
            const isEven = n % 2 === 0;
            const isValid = (mode === '2' && isEven) || (mode === '3' && !isEven);

            if (!Number.isInteger(n) || n < min || !isValid) {
                outGold.textContent = `⚠️ ${mode === '2' ? t('gold_err_even') : t('gold_err_odd')}`;
                outGold.style.color = '#e74c3c'; return;
            }
            if (n > MAX_GOLDBACH) {
                outGold.textContent = `⚠️ ${t('gold_err_limit')}`;
                outGold.style.color = '#e74c3c'; return;
            }

            btn.disabled = true; btn.textContent = '⏳ Calculez...'; outGold.innerHTML = '';
            outGold.style.color = 'var(--text)';

            setTimeout(() => {
                try {
                    let results = [];
                    const MAX_LIMIT = 100;
                    if (mode === '2') {
                        for (let p = 2; p <= n / 2 && results.length < MAX_LIMIT; p++) {
                            if (isPrimeGB(p) && isPrimeGB(n - p)) results.push([p, n - p]);
                        }
                    } else {
                        for (let p = 2; p <= n - 4 && results.length < MAX_LIMIT; p++) {
                            if (!isPrimeGB(p)) continue;
                            const rest = n - p;
                            for (let q = 2; q <= rest / 2 && results.length < MAX_LIMIT; q++) {
                                if (isPrimeGB(q) && isPrimeGB(rest - q)) {
                                    results.push([p, q, rest - q]);
                                    break;
                                }
                            }
                        }
                    }

                    if (results.length === 0) {
                        outGold.textContent = `❌ ${t('gold_err_none')}`;
                        outGold.style.color = '#e74c3c';
                    } else {
                        const latex = results.map(arr => `\\(${n} = ${arr.join(' + ')}\\)`).join('<br>');
                        const totalMsg = results.length >= MAX_LIMIT ? `${results.length}+` : results.length;
                        const showMsg = results.length >= MAX_LIMIT ? ` (${t('gold_showing')} ${MAX_LIMIT})` : '';
                        outGold.innerHTML = `✅ ${t('gold_found')} ${totalMsg}${showMsg}:<br>${latex}`;
                        outGold.style.color = 'var(--text)';
                    }
                } catch(e) {
                    outGold.textContent = `❌ ${e.message}`;
                    outGold.style.color = '#e74c3c';
                }
                btn.disabled = false; btn.textContent = t('gold_btn');
                if (window.MathJax?.typesetPromise) MathJax.typesetPromise([outGold]).catch(() => {});
            }, 50);
        });
    }

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
