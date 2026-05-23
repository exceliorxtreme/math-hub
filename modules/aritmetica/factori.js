// modules/aritmetica/factori.js
import { t } from '../../utils/i18n.js';

// ============================================================================
// 🔢 HELPERS ARITMETICE (BigInt safe)
// ============================================================================
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
    if (n < 2) throw new Error(t('fact_err_min') || "Numărul trebuie să fie ≥ 2");
    const factors = [];
    let temp = n;
    for (let p = 2; BigInt(p) * BigInt(p) <= temp; p++) {
        if (temp % BigInt(p) === 0n) {
            let count = 0;
            while (temp % BigInt(p) === 0n) { temp /= BigInt(p); count++; }
            factors.push({ p: BigInt(p), count });
        }
    }
    if (temp > 1n) factors.push({ p: temp, count: 1 });
    return factors;
}

// ============================================================================
// 🛡️ MILLER-RABIN (BigInt) pentru numere > 10¹⁰ (suport până la ~10¹²)
// ============================================================================
function modPow(base, exp, mod) {
    let result = 1n;
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) result = (result * base) % mod;
        base = (base * base) % mod;
        exp /= 2n;
    }
    return result;
}

function isPrimeMR(n) {
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n) return false;

    // Baze deterministe pentru n < 3.3×10¹⁸ (acoperă 19⁹ cu marjă)
    const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n];

    // Scrie n-1 = d * 2^r
    let d = n - 1n, r = 0n;
    while (d % 2n === 0n) { d /= 2n; r++; }

    for (const a of bases) {
        if (a >= n) continue;
        let x = modPow(a, d, n);
        if (x === 1n || x === n - 1n) continue;
        let cont = false;
        for (let i = 0n; i < r - 1n; i++) {
            x = (x * x) % n;
            if (x === n - 1n) { cont = true; break; }
        }
        if (!cont) return false;
    }
    return true;
}

// Wrapper inteligent: trial division pentru mic, Miller-Rabin pentru mare
function isPrimeSmart(n) {
    if (typeof n === 'number') n = BigInt(n);
    return n < 10000000000n ? isPrimeGB(Number(n)) : isPrimeMR(n);
}

// Trial division optimizat 6k±1 pentru numere mici (< 10¹⁰)
function isPrimeGB(n) {
    if (n < 2) return false;
    if (n === 2 || n === 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

// Găsește cel mai mare prim < n (pentru fereastra Goldbach Shield)
function findLargestPrimeBelow(n) {
    let x = n % 2n === 0n ? n - 1n : n;
    while (x > 2n) {
        if (isPrimeSmart(x)) return x;
        x -= 2n;
    }
    return 2n;
}

// Generează scutul modular (prime mici) cu cache
const SHIELD_CACHE = new Map();
function generatePrimeShield(limit) {
    if (SHIELD_CACHE.has(limit)) return SHIELD_CACHE.get(limit);
    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrimeGB(i)) primes.push(BigInt(i));
    }
    SHIELD_CACHE.set(limit, primes);
    return primes;
}

// Verifică dacă x este blocat de scutul modular
function isBlockedByShield(x, shield) {
    for (const m of shield) {
        if (x !== m && x % m === 0n) return true;
    }
    return false;
}

// ============================================================================
// 🎨 UI & RENDER
// ============================================================================
export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="fact_title">${t('fact_title')}</h2>
    <div class="description" data-i18n="fact_desc">${t('fact_desc')}</div>

    <!-- Factorizare / CMMDC / CMMMC -->
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
    <div id="out-top" style="margin-top:10px; font-size:0.9rem; line-height:1.6; color:var(--text);"></div>

    <!-- 🔢 Goldbach Clasic (2 & 3 prime) -->
    <div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#6c3483); margin-top:15px;" data-i18n="gold_sec">${t('gold_sec')}</div>
    <div class="fcards">
        <div class="fcard">
            <div class="fhead" data-i18n="gold_title">${t('gold_title')}</div>
            <div class="fbody">
                <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
                    <input id="gold-n" type="number" min="4" max="500000" placeholder="${t('gold_ph')}" data-i18n-placeholder="gold_ph" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
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

    <!-- 🛡️ Goldbach Shield (Expert Mode până la 19⁹) -->
    <div class="fsec" style="background:linear-gradient(90deg,#16a085,#1abc9c); margin-top:15px;" data-i18n="gold_shield_sec">${t('gold_shield_sec')}</div>
    <div class="fcards">
        <div class="fcard">
            <div class="fhead" data-i18n="gold_shield_title">${t('gold_shield_title')}</div>
            <div class="fbody">
                <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
                    <input id="shield-2n" type="number" min="4" max="999999999999" step="2" placeholder="${t('gold_shield_ph')}" data-i18n-placeholder="gold_shield_ph" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
                    <button id="btn-shield" data-i18n="gold_shield_btn" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;">${t('gold_shield_btn')}</button>
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:8px; margin-bottom:10px;">
                    <label style="font-size:0.85rem; color:var(--text-muted);">
                        <span data-i18n="gold_shield_depth">${t('gold_shield_depth')}</span><br>
                        <select id="shield-depth" style="width:100%; padding:4px; background:var(--card-bg); border:1px solid var(--border); border-radius:4px; color:var(--text);">
                            <option value="5">3 prime (p&lt;5)</option>
                            <option value="25" selected>9 prime (p&lt;25)</option>
                            <option value="100">25 prime (p&lt;100)</option>
                        </select>
                    </label>
                    <label style="font-size:0.85rem; color:var(--text-muted);">
                        <span data-i18n="gold_shield_limit">${t('gold_shield_limit')}</span><br>
                        <select id="shield-limit" style="width:100%; padding:4px; background:var(--card-bg); border:1px solid var(--border); border-radius:4px; color:var(--text);">
                            <option value="5" selected>5 perechi</option>
                            <option value="20">20 perechi</option>
                            <option value="50">50 perechi</option>
                        </select>
                    </label>
                </div>
                <div id="out-gold-shield" style="font-size:0.9rem; line-height:1.6; color:var(--text);"></div>
            </div>
        </div>
    </div>
    `;

    // 🔒 Safe-by-default show function (CodeQL compliant)
    function show(content, err = false, allowHtml = false) {
        resBox.style.display = 'block';
        if (err) {
            resBox.textContent = String(content);
        } else if (allowHtml) {
            // Content generat intern, safe pentru MathJax
            resBox.innerHTML = content;
        } else {
            resBox.textContent = String(content);
        }
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        if (window.MathJax?.typesetPromise) {
            MathJax.typesetPromise([resBox]).catch(() => {});
        }
    }

    // 🔒 showLocal pentru containere izolate (out-top, out-gold, out-gold-shield)
    function showLocal(target, content, err = false, allowHtml = false) {
        target.style.display = 'block';
        if (err) {
            target.textContent = String(content);
        } else if (allowHtml) {
            target.innerHTML = content;
        } else {
            target.textContent = String(content);
        }
        target.style.borderLeft = err ? '3px solid #e74c3c' : 'none';
        target.style.paddingLeft = err ? '8px' : '0';
        if (window.MathJax?.typesetPromise) {
            MathJax.typesetPromise([target]).catch(() => {});
        }
    }

    const getVal = id => BigInt(document.getElementById(id).value.trim() || '0');
    const outTop = document.getElementById('out-top');
    const outGold = document.getElementById('out-gold');
    const outShield = document.getElementById('out-gold-shield');

    // ========================================================================
    // 🔢 EVENT LISTENERS
    // ========================================================================

    // 🔢 Factorizare
    document.getElementById('btn-factor').addEventListener('click', () => {
        try {
            const a = getVal('fact-a');
            if (a < 2n) throw new Error(t('fact_err_min'));
            if (a > 100000000000000n) throw new Error(t('fact_err_max'));
            const factors = factorize(a);
            const latex = factors.map(f => f.count === 1 ? `${f.p}` : `${f.p}^{${f.count}}`).join(' \\times ');
            showLocal(outTop, `\\(${a} = ${latex}\\)`, false, true);
        } catch (e) { showLocal(outTop, `❌ ${e.message}`, true); }
    });

    // ➗ CMMDC
    document.getElementById('btn-gcd').addEventListener('click', () => {
        try {
            const a = getVal('fact-a'), b = getVal('fact-b');
            if (a < 1n || b < 1n) throw new Error(t('fact_err_min'));
            const rez = gcd(a, b);
            showLocal(outTop, `\\(CMMDC(${a}, ${b}) = ${rez}\\)`, false, true);
        } catch (e) { showLocal(outTop, `❌ ${e.message}`, true); }
    });

    // 📐 CMMMC
    document.getElementById('btn-lcm').addEventListener('click', () => {
        try {
            const a = getVal('fact-a'), b = getVal('fact-b');
            if (a < 1n || b < 1n) throw new Error(t('fact_err_min'));
            const rez = lcm(a, b);
            showLocal(outTop, `\\(CMMMC(${a}, ${b}) = ${rez}\\)`, false, true);
        } catch (e) { showLocal(outTop, `❌ ${e.message}`, true); }
    });

    // 🔢 Goldbach Clasic (2 sau 3 prime)
    const btnGold = document.getElementById('btn-gold');
    if (btnGold && outGold) {
        btnGold.addEventListener('click', () => {
            const n = BigInt(document.getElementById('gold-n').value);
            const mode = document.querySelector('input[name="gold-mode"]:checked').value;
            const btn = document.getElementById('btn-gold');

            const min = mode === '2' ? 4n : 7n;
            const isEven = n % 2n === 0n;
            const isValid = (mode === '2' && isEven) || (mode === '3' && !isEven);

            if (n < min || !isValid) {
                return showLocal(outGold, `⚠️ ${mode === '2' ? t('gold_err_even') : t('gold_err_odd')}`, true);
            }
            if (n > 500000n) {
                return showLocal(outGold, `⚠️ ${t('gold_err_limit')}`, true);
            }

            btn.disabled = true; btn.textContent = '⏳ ' + t('gold_shield_calc');
            outGold.innerHTML = '';

            setTimeout(() => {
                try {
                    let results = [];
                    const MAX_LIMIT = 100;
                    if (mode === '2') {
                        for (let p = 2n; p <= n / 2n && results.length < MAX_LIMIT; p++) {
                            if (isPrimeGB(Number(p)) && isPrimeGB(Number(n - p))) {
                                results.push([p, n - p]);
                            }
                        }
                    } else {
                        for (let p = 2n; p <= n - 4n && results.length < MAX_LIMIT; p++) {
                            if (!isPrimeGB(Number(p))) continue;
                            const rest = n - p;
                            for (let q = 2n; q <= rest / 2n && results.length < MAX_LIMIT; q++) {
                                if (isPrimeGB(Number(q)) && isPrimeGB(Number(rest - q))) {
                                    results.push([p, q, rest - q]);
                                    break;
                                }
                            }
                        }
                    }

                    if (results.length === 0) {
                        showLocal(outGold, `❌ ${t('gold_err_none')}`, true);
                    } else {
                        const latex = results.map(arr => `\\(${n} = ${arr.join(' + ')}\\)`).join('<br>');
                        const totalMsg = results.length >= MAX_LIMIT ? `${results.length}+` : results.length;
                        const showMsg = results.length >= MAX_LIMIT ? ` (${t('gold_showing')} ${MAX_LIMIT})` : '';
                        showLocal(outGold, `✅ ${t('gold_found')} ${totalMsg}${showMsg}:<br>${latex}`, false, true);
                    }
                } catch(e) {
                    showLocal(outGold, `❌ ${e.message}`, true);
                }
                btn.disabled = false; btn.textContent = t('gold_btn');
            }, 50);
        });
    }

    // 🛡️ Goldbach Shield (Expert Mode cu Miller-Rabin)
    const btnShield = document.getElementById('btn-shield');
    if (btnShield && outShield) {
        btnShield.addEventListener('click', async () => {
            const bariera = BigInt(document.getElementById('shield-2n').value);
            const shieldLimit = Number(document.getElementById('shield-depth').value);
            const pairLimit = Number(document.getElementById('shield-limit').value);
            const btn = document.getElementById('btn-shield');

            if (bariera < 4n || bariera % 2n !== 0n) {
                return showLocal(outShield, `⚠️ ${t('gold_shield_err_even')}`, true);
            }
            if (bariera > 999999999999n) {
                return showLocal(outShield, `⚠️ ${t('gold_shield_err_limit')}`, true);
            }

            btn.disabled = true; btn.textContent = '⏳ ' + t('gold_shield_calc');
            outShield.innerHTML = '';

            // Chunking pentru UX fluid la numere mari
            const t0 = performance.now();
            const p_margine = findLargestPrimeBelow(bariera);
            const shield = generatePrimeShield(shieldLimit);

            let localPairs = [], oddCandidates = 0n, blocked = 0n;
            let regim = "local";

            // Scanare locală [p, 2n] cu chunking
            const CHUNK = 1000n;
            for (let x = p_margine; x <= bariera; x += 2n) {
                oddCandidates++;
                if (isBlockedByShield(x, shield)) {
                    blocked++;
                } else {
                    const comp = bariera - x;
                    if (isPrimeSmart(x) && isPrimeSmart(comp) && localPairs.length < pairLimit) {
                        localPairs.push({ a: x, b: comp });
                    }
                }
                // Cedează controlul UI-ului la fiecare CHUNK iterații
                if (oddCandidates % CHUNK === 0n) {
                    await new Promise(r => setTimeout(r, 0));
                }
            }

            // Extindere dacă e nevoie
            if (localPairs.length < pairLimit) {
                regim = localPairs.length === 0 ? "extern" : "mixt";
                let x = p_margine - 2n;
                while (x > 2n && localPairs.length < pairLimit) {
                    const comp = bariera - x;
                    if (isPrimeSmart(x) && isPrimeSmart(comp)) {
                        localPairs.push({ a: x, b: comp, ext: true });
                    }
                    x -= 2n;
                }
            }

            const t1 = performance.now();
            const time = ((t1 - t0) / 1000).toFixed(4);

            // Randare metrici (monospace, culori semantice)
            let html = `<div style="background:var(--card-bg); padding:8px; border-radius:6px; margin-bottom:8px; font-family:monospace; font-size:0.85rem;">`;
            html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_2n')}</span><strong>${bariera.toLocaleString()}</strong></div>`;
            html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_p')}</span><strong>${p_margine.toLocaleString()}</strong></div>`;
            html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_win')}</span><strong class="accent">${(bariera - p_margine).toLocaleString()}</strong></div>`;
            html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_shield')}</span><strong class="info">${shield.length} prime</strong></div>`;
            html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_mode')}</span><strong class="${regim === 'local' ? 'success' : 'info'}">${t('gold_shield_mode_' + regim)}</strong></div>`;
            html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_odd')}</span><strong>${oddCandidates.toLocaleString()}</strong></div>`;
            html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_blocked')}</span><strong class="warning">${blocked.toLocaleString()}</strong></div>`;
            html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_time')}</span><strong>${time}s</strong></div>`;
            html += `</div>`;

            // Listează perechile
            if (localPairs.length > 0) {
                html += `<div style="margin-top:8px;"><strong>${t('gold_shield_pairs_title')}:</strong><br>`;
                localPairs.forEach(p => {
                    const tag = p.ext ? `[${t('gold_shield_tag_ext')}]` : `[${t('gold_shield_tag_loc')}]`;
                    const cls = p.ext ? 'style="color:var(--info)"' : '';
                    html += `<div ${cls}>${tag} ${bariera.toLocaleString()} = ${p.a.toLocaleString()} + ${p.b.toLocaleString()}</div>`;
                });
                html += `</div>`;
            }

            // Concluzie
            const conclKey = regim === 'local' ? 'gold_shield_concl_local' : 'gold_shield_concl_ext';
            html += `<div style="margin-top:10px; padding:8px; border-radius:6px; background:rgba(74,222,128,0.1); border:1px solid var(--success); color:var(--success); font-weight:500;">${t(conclKey)}</div>`;

            showLocal(outShield, html, false, true);
            btn.disabled = false; btn.textContent = t('gold_shield_btn');
        });
    }

    // MathJax sync final
    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
