// modules/aritmetica/factori.js
import { t } from '../../utils/i18n.js';

// ============================================================================
// 🔢 HELPERS ARITMETICE (BigInt safe & Precision Fixed)
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
    
    // Corecție logică: p este BigInt pentru a preveni buclele infinite la numere mari
    for (let p = 2n; p * p <= temp; p++) {
        if (temp % p === 0n) {
            let count = 0;
            while (temp % p === 0n) { 
                temp /= p; 
                count++; 
            }
            factors.push({ p: p, count });
        }
    }
    if (temp > 1n) factors.push({ p: temp, count: 1 });
    return factors;
}

// ============================================================================
// 🛡️ MILLER-RABIN (Determinism complet până la 3.3×10¹⁸)
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

    // Set complet de baze deterministe pentru eliminarea pseudoprimelor
    const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];

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

function isPrimeSmart(n) {
    if (typeof n === 'number') n = BigInt(n);
    return n < 10000000000n ? isPrimeGB(Number(n)) : isPrimeMR(n);
}

function isPrimeGB(n) {
    if (n < 2) return false;
    if (n === 2 || n === 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

function findLargestPrimeBelow(n) {
    let x = n % 2n === 0n ? n - 1n : n;
    while (x > 2n) {
        if (isPrimeSmart(x)) return x;
        x -= 2n;
    }
    return 2n;
}

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

function isBlockedByShield(x, shield) {
    for (const m of shield) {
        if (x !== m && x % m === 0n) return true;
    }
    return false;
}

// ============================================================================
// 🎨 UI & RENDER STRUCTURATĂ ȘI SECURIZATĂ
// ============================================================================
export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

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
    <div id="out-top" style="margin-top:10px; font-size:0.9rem; line-height:1.6; color:var(--text);"></div>

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

    <div class="fsec" style="background:linear-gradient(90deg,#16a085,#1abc9c); margin-top:15px;" data-i18n="gold_shield_sec">${t('gold_shield_sec')}</div>
    <div class="fcards">
        <div class="fcard">
            <div class="fhead" data-i18n="gold_shield_title">${t('gold_shield_title')}</div>
            <div class="fbody">
                <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
                    <input id="shield-2n" type="number" min="4" max="10000000000" step="2" placeholder="Max: 10,000,000,000 (Browser)" style="flex:1; padding:6px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
                    <button id="btn-shield" data-i18n="gold_shield_btn" style="padding:6px 12px; background:var(--accent); color:#000; border:none; border-radius:6px; font-weight:600; cursor:pointer;">${t('gold_shield_btn')}</button>
                </div>
                
                <div style="margin: 10px 0; padding: 10px; border-radius: 6px; background: rgba(230,126,34,0.1); border: 1px dashed #e67e22; font-size: 0.85rem; color: #e67e22; line-height: 1.4;">
                    🚀 <strong>Senzanții Tari?</strong> Pentru numere mari (până la $10^{12}$, cum ar fi 503,222,000), browser-ul va îngheța. Folosește motorul nativ ultra-rapid compilat JIT în Python inclus în folderul proiectului: <code>core/python_engine.py</code>.
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

    document.getElementById('btn-gcd').addEventListener('click', () => {
        try {
            const a = getVal('fact-a'), b = getVal('fact-b');
            if (a < 1n || b < 1n) throw new Error(t('fact_err_min'));
            const rez = gcd(a, b);
            showLocal(outTop, `\\(CMMDC(${a}, ${b}) = ${rez}\\)`, false, true);
        } catch (e) { showLocal(outTop, `❌ ${e.message}`, true); }
    });

    document.getElementById('btn-lcm').addEventListener('click', () => {
        try {
            const a = getVal('fact-a'), b = getVal('fact-b');
            if (a < 1n || b < 1n) throw new Error(t('fact_err_min'));
            const rez = lcm(a, b);
            showLocal(outTop, `\\(CMMMC(${a}, ${b}) = ${rez}\\)`, false, true);
        } catch (e) { showLocal(outTop, `❌ ${e.message}`, true); }
    });

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

    document.getElementById('btn-shield').addEventListener('click', async () => {
    const bariera = BigInt(document.getElementById('shield-2n').value);
    const shieldLimit = Number(document.getElementById('shield-depth').value);
    const pairLimit = Number(document.getElementById('shield-limit').value);
    const btn = document.getElementById('btn-shield');

    if (bariera < 4n || bariera % 2n !== 0n) {
        return showLocal(outShield, `⚠️ Numărul trebuie să fie par și ≥ 4`, true);
    }
    
    if (bariera > 10000000000n) { 
    return showLocal(outShield, `⚠️ Valoarea depășește limita absolută de 10 miliarde a aplicației.`, true);
}

    btn.disabled = true; btn.textContent = '⏳ ' + t('gold_shield_calc');
    outShield.innerHTML = '';

    const t0 = performance.now();

    // 1. Definim o fereastră de scanare stabilă sub bariera (ex: ultimele 500.000 de unități)
    const windowSize = bariera > 1000000n ? 1000000 : Number(bariera);
const startPoint = bariera - BigInt(windowSize);
    
    // 2. Generăm scutul de baze pentru eliminare (Ciurul de bază)
    const limitRadical = Math. someLimit || Math.sqrt(Number(bariera));
    const shield = generatePrimeShield(Math.max(shieldLimit, Math.floor(limitRadical)));

    // 3. Alocăm o mască de biți rapidă în memorie pentru fereastră
    // bitSieve[i] reprezintă starea numărului (startPoint + BigInt(i))
    const bitSieve = new Uint8Array(windowSize + 1);
    bitSieve.fill(1); // Presupunem inițial că toate sunt prime

    // 4. Ciuruirea Segmentată a ferestrei (Execuție hardware ultra-rapidă)
    for (const p of shield) {
        const p_bi = BigInt(p);
        // Găsim primul multiplu al lui p care cade în interiorul ferestrei noastre
        let startModulo = startPoint % p_bi;
        let firstMultiple = startModulo === 0n ? startPoint : startPoint + (p_bi - startModulo);
        
        if (firstMultiple === p_bi) firstMultiple += p_bi; // Să nu eliminăm numărul prim în sine

        // Eliminăm multiplii lui p din fereastră în pași de adunare (fără modPow sau modulo!)
        let startIdx = Number(firstMultiple - startPoint);
        for (let idx = startIdx; idx <= windowSize; idx += Number(p_bi)) {
            bitSieve[idx] = 0;
        }
    }

    // 5. Colectarea instantanee a perechilor Goldbach prin potrivire în vector
    let localPairs = [];
    let oddCandidates = 0n;
    let blocked = 0n;

    // Scanăm descrescător din vârful ferestrei
    for (let offset = windowSize; offset >= 0; offset--) {
        const current_x = startPoint + BigInt(offset);
        if (current_x >= bariera || current_x % 2n === 0n || current_x < 2n) continue;

        oddCandidates++;

        // Verificăm starea în ciurul nostru local segmentat
        if (bitSieve[offset] === 0) {
            blocked++;
        } else {
            // Dacă x este prim în fereastră, verificăm complementul
            const comp = bariera - current_x;
            
            // Pentru complement folosim testul rapid din cache sau cel inteligent
            if (isPrimeSmart(comp)) {
                localPairs.push({ a: current_x, b: comp });
                if (localPairs.length >= pairLimit) break;
            }
        }
    }

    const t1 = performance.now();
    const time = ((t1 - t0) / 1000).toFixed(4);

    
    let regim = localPairs.length === 0 ? "extern" : (localPairs.length < pairLimit ? "mixt" : "local");
    const p_margine = findLargestPrimeBelow(bariera); 

    let html = `<div style="background:var(--card-bg); padding:8px; border-radius:6px; margin-bottom:8px; font-family:monospace; font-size:0.85rem;">`;
    html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_2n')}</span><strong>${bariera.toLocaleString()}</strong></div>`;
    html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Fereastră Segmentată Activă</span><strong class="accent">${windowSize.toLocaleString()} unități</strong></div>`;
    html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Viteză Filtrare</span><strong class="success">Ciur local activat</strong></div>`;
    html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_mode')}</span><strong class="success">${t('gold_shield_mode_' + regim)}</strong></div>`;
    html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Candidați verificați</span><strong>${oddCandidates.toLocaleString()}</strong></div>`;
    html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_blocked')}</span><strong class="warning">${blocked.toLocaleString()}</strong></div>`;
    html += `<div style="display:flex; justify-content:space-between; padding:4px 0;"><span>${t('gold_shield_metric_time')}</span><strong>${time}s</strong></div>`;
    html += `</div>`;

    if (localPairs.length > 0) {
        html += `<div style="margin-top:8px;"><strong>${t('gold_shield_pairs_title')}:</strong><br>`;
        localPairs.forEach(p => {
            html += `<div>[⚡ Ciur Rapid] ${bariera.toLocaleString()} = ${p.a.toLocaleString()} + ${p.b.toLocaleString()}</div>`;
        });
        html += `</div>`;
    }

    const conclKey = regim === 'local' ? 'gold_shield_concl_local' : 'gold_shield_concl_ext';
    html += `<div style="margin-top:10px; padding:8px; border-radius:6px; background:rgba(74,222,128,0.1); border:1px solid var(--success); color:var(--success); font-weight:500;">${t(conclKey)}</div>`;

    showLocal(outShield, html, false, true);
    btn.disabled = false; btn.textContent = t('gold_shield_btn');
});

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
