// modules/aritmetica/prime.js
import { t } from '../../utils/i18n.js';

// ✅ Sieve of Eratosthenes optimizat (Uint8Array + 6k±1 skip)
function sieve(limit) {
    if (limit < 2) return [];
    const arr = new Uint8Array(limit + 1);
    arr[0] = arr[1] = 1;
    for (let i = 2; i * i <= limit; i++) {
        if (!arr[i]) {
            for (let j = i * i; j <= limit; j += i) arr[j] = 1;
        }
    }
    const primes = [];
    for (let i = 2; i <= limit; i++) if (!arr[i]) primes.push(i);
    return primes;
}

// ✅ Filtrare interval [min, max] din lista de prime
function filterRange(primes, min, max) {
    return primes.filter(p => p >= min && p <= max);
}

// ✅ Estimare timp execuție (empirică, bazată pe benchmark-uri browser)
function estimateTime(limit) {
    if (limit <= 10000) return '< 0.1s';
    if (limit <= 50000) return '~0.3–0.8s';
    if (limit <= 100000) return '~1–2s';
    return '> 2s';
}

// ✅ Suma primelor k numere prime (BigInt)
function sumFirstKPrimes(k) {
    const primes = sieve(100000);
    if (k > primes.length) return null;
    let sum = 0n;
    for (let i = 0; i < k; i++) {
        sum += BigInt(primes[i]);
    }
    return sum;
}

// ✅ Produsul primelor k numere prime (BigInt) - cu chunking pentru UI fluid
async function productFirstKPrimes(k) {
    const primes = sieve(100000);
    if (k > primes.length) return null;
    
    let prod = 1n;
    const CHUNK = 50;
    
    for (let i = 0; i < k; i++) {
        prod *= BigInt(primes[i]);
        
        // Yield control la fiecare CHUNK iterații pentru UI responsiv
        if (i > 0 && i % CHUNK === 0) {
            await new Promise(r => setTimeout(r, 0));
        }
    }
    
    return prod;
}

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <!-- SECȚIUNE NOUĂ: Sum & Product of first k primes -->
    <div id="sum-product-section" style="background:var(--bg-card); border-radius:8px; padding:15px; margin-bottom:20px; border:1px solid var(--border);">
        <h3 data-i18n="sum_product_title">${t('sum_product_title')}</h3>
        <div class="description" data-i18n="sum_product_desc">${t('sum_product_desc')}</div>
        
        <div class="input-group">
            <label data-i18n="sum_product_k">${t('sum_product_k')}</label>
            <input id="sp-k" type="number" min="1" max="9592" placeholder="Ex: 10" data-i18n-placeholder="sum_product_k_ph">
        </div>
        
        <div class="btn-group" style="gap:8px;">
            <button id="btn-sum-primes" data-i18n="btn_sum">${t('btn_sum')}</button>
            <button id="btn-product-primes" data-i18n="btn_product">${t('btn_product')}</button>
        </div>
        
        <!-- Sum Result Box -->
        <div id="sum-result-box" style="margin-top:12px; display:none;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <strong data-i18n="sum_result">${t('sum_result')}</strong>
                <span id="sum-status" style="font-size:0.85rem; color:var(--accent);"></span>
            </div>
            <div id="sum-result-value" style="background:var(--bg); padding:10px; border-radius:4px; font-family:monospace; word-break:break-all; max-height:150px; overflow-y:auto; border:1px solid var(--border);"></div>
        </div>
        
        <!-- Product Result Box -->
        <div id="product-result-box" style="margin-top:12px; display:none;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <strong data-i18n="product_result">${t('product_result')}</strong>
                <span id="product-status" style="font-size:0.85rem; color:var(--accent);"></span>
            </div>
            <div id="product-result-value" style="background:var(--bg); padding:10px; border-radius:4px; font-family:monospace; word-break:break-all; max-height:150px; overflow-y:auto; border:1px solid var(--border);"></div>
            <div id="product-warning" style="margin-top:5px; font-size:0.85rem; color:var(--warning); display:none;"></div>
        </div>
    </div>
    
    <h2 data-i18n="prime_title">${t('prime_title')}</h2>
    <div class="description" data-i18n="prime_desc">${t('prime_desc')}</div>
    
    <!-- Mod: Limită sau Interval -->
    <div style="display:flex; gap:12px; margin-bottom:10px; flex-wrap:wrap;">
        <label style="display:flex; align-items:center; gap:4px; font-size:0.9rem; color:var(--text); cursor:pointer;">
            <input type="radio" name="prime-mode" value="limit" checked> 
            <span data-i18n="prime_mode_limit">${t('prime_mode_limit')}</span>
        </label>
        <label style="display:flex; align-items:center; gap:4px; font-size:0.9rem; color:var(--text); cursor:pointer;">
            <input type="radio" name="prime-mode" value="range"> 
            <span data-i18n="prime_mode_range">${t('prime_mode_range')}</span>
        </label>
    </div>

    <!-- Input Limită -->
    <div id="prime-limit-group" class="input-group">
        <label data-i18n="prime_lim">${t('prime_lim')}</label>
        <input id="p-lim" type="number" min="2" max="100000" placeholder="Ex: 1000" data-i18n-placeholder="prime_lim_ph">
    </div>

    <!-- Input Interval (ascuns implicit) -->
    <div id="prime-range-group" class="input-group" style="display:none;">
        <label data-i18n="prime_min">${t('prime_min')}</label>
        <input id="p-min" type="number" min="2" max="100000" placeholder="Ex: 100" data-i18n-placeholder="prime_min_ph" style="flex:1;">
        <label data-i18n="prime_max">${t('prime_max')}</label>
        <input id="p-max" type="number" min="2" max="100000" placeholder="Ex: 1000" data-i18n-placeholder="prime_max_ph" style="flex:1;">
    </div>

    <div class="btn-group btn-group-1">
        <button id="btn-gen-prime" data-i18n="btn_gen">${t('btn_gen')}</button>
    </div>
    
    <!-- Avertisment timp estimat -->
    <div id="prime-warning" style="margin-top:8px; font-size:0.85rem; color:var(--warning); display:none;"></div>

    <!-- Container tabel -->
    <div id="prime-table-container" class="table-wrap" style="margin-top:15px;display:none;">
        <table>
        <thead>
        <tr>
        <th>#</th>
        <th data-i18n="th_num">${t('th_num')}</th>
        <th data-i18n="th_digits">${t('th_digits')}</th>
        </tr>
        </thead>
        <tbody id="p-body"></tbody>
        </table>
    </div>
    `;

    // 🔒 Safe-by-default show (CodeQL compliant) - doar pentru generatorul de prime
    function show(content, err = false, allowHtml = false) {
        resBox.style.display = 'block';
        if (err) {
            resBox.textContent = String(content);
        } else if (allowHtml) {
            resBox.innerHTML = content;
        } else {
            resBox.textContent = String(content);
        }
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        if (window.MathJax?.typesetPromise) {
            MathJax.typesetPromise([resBox]).catch(() => {});
        }
    }

    // ✅ Sum button handler - afișare directă în sum-result-box
    document.getElementById('btn-sum-primes').addEventListener('click', () => {
        const k = parseInt(document.getElementById('sp-k').value) || 0;
        const sumBox = document.getElementById('sum-result-box');
        const sumValue = document.getElementById('sum-result-value');
        const sumStatus = document.getElementById('sum-status');
        
        if (k < 1) {
            sumStatus.textContent = `❌ ${t('sum_product_err_k')}`;
            sumStatus.style.color = '#ff5555';
            sumBox.style.display = 'block';
            sumValue.textContent = '';
            return;
        }
        if (k > 9592) {
            sumStatus.textContent = `❌ ${t('sum_product_err_max')}`;
            sumStatus.style.color = '#ff5555';
            sumBox.style.display = 'block';
            sumValue.textContent = '';
            return;
        }
        
        const t0 = performance.now();
        const sum = sumFirstKPrimes(k);
        const t1 = performance.now();
        const time = ((t1 - t0) / 1000).toFixed(3);
        
        if (!sum) {
            sumStatus.textContent = `❌ ${t('sum_product_err_calc')}`;
            sumStatus.style.color = '#ff5555';
            sumBox.style.display = 'block';
            sumValue.textContent = '';
            return;
        }
        
        sumValue.textContent = sum.toString();
        sumStatus.textContent = `✅ ${t('sum_success').replace('{k}', k)} (${time}s)`;
        sumStatus.style.color = 'var(--accent)';
        sumBox.style.display = 'block';
    });

    // ✅ Product button handler - afișare directă în product-result-box
    document.getElementById('btn-product-primes').addEventListener('click', async () => {
        const k = parseInt(document.getElementById('sp-k').value) || 0;
        const prodBox = document.getElementById('product-result-box');
        const prodValue = document.getElementById('product-result-value');
        const prodStatus = document.getElementById('product-status');
        const prodWarning = document.getElementById('product-warning');
        
        if (k < 1) {
            prodStatus.textContent = `❌ ${t('sum_product_err_k')}`;
            prodStatus.style.color = '#ff5555';
            prodBox.style.display = 'block';
            prodValue.textContent = '';
            prodWarning.style.display = 'none';
            return;
        }
        if (k > 9592) {
            prodStatus.textContent = `❌ ${t('sum_product_err_max')}`;
            prodStatus.style.color = '#ff5555';
            prodBox.style.display = 'block';
            prodValue.textContent = '';
            prodWarning.style.display = 'none';
            return;
        }
        
        const btn = document.getElementById('btn-product-primes');
        btn.disabled = true;
        btn.textContent = '⏳ ' + t('btn_product_calc');
        prodWarning.style.display = 'none';
        
        try {
            const t0 = performance.now();
            const prod = await productFirstKPrimes(k);
            const t1 = performance.now();
            const time = ((t1 - t0) / 1000).toFixed(3);
            
            if (!prod) {
                prodStatus.textContent = `❌ ${t('sum_product_err_calc')}`;
                prodStatus.style.color = '#ff5555';
                prodBox.style.display = 'block';
                prodValue.textContent = '';
                return;
            }
            
            const prodStr = prod.toString();
            
            // Check threshold - avertisment dacă > 150 cifre
            if (prodStr.length > 150) {
                prodWarning.textContent = `⚠️ ${t('product_warn_large').replace('{digits}', prodStr.length)}`;
                prodWarning.style.display = 'block';
                
                // Truncate display dacă > 300 cifre (arată primele și ultimele 75)
                if (prodStr.length > 300) {
                    const first = prodStr.substring(0, 75);
                    const last = prodStr.substring(prodStr.length - 75);
                    prodValue.textContent = `${first} ... ${last} (${t('product_truncated')})`;
                } else {
                    prodValue.textContent = prodStr;
                }
            } else {
                prodValue.textContent = prodStr;
                prodWarning.style.display = 'none';
            }
            
            prodStatus.textContent = `✅ ${t('product_success').replace('{k}', k).replace('{time}', time).replace('{digits}', prodStr.length)}`;
            prodStatus.style.color = 'var(--accent)';
            prodBox.style.display = 'block';
        } catch (e) {
            prodStatus.textContent = `❌ ${e.message}`;
            prodStatus.style.color = '#ff5555';
            prodBox.style.display = 'block';
            prodValue.textContent = '';
        }
        
        btn.disabled = false;
        btn.textContent = t('btn_product');
    });

    // Toggle mod: limită vs interval
    document.querySelectorAll('input[name="prime-mode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const isRange = e.target.value === 'range';
            document.getElementById('prime-limit-group').style.display = isRange ? 'none' : 'block';
            document.getElementById('prime-range-group').style.display = isRange ? 'flex' : 'none';
        });
    });

    // Generare prime
    document.getElementById('btn-gen-prime').addEventListener('click', async () => {
        const mode = document.querySelector('input[name="prime-mode"]:checked').value;
        const warning = document.getElementById('prime-warning');
        warning.style.display = 'none';
        warning.textContent = '';

        let limit, min, max;
        if (mode === 'limit') {
            limit = parseInt(document.getElementById('p-lim').value) || 0;
            if (limit < 2) {
                return show(`❌ ${t('prime_err_min')}`, true);
            }
            min = 2;
            max = limit;
        } else {
            min = parseInt(document.getElementById('p-min').value) || 2;
            max = parseInt(document.getElementById('p-max').value) || 0;
            if (min < 2 || max < min) {
                return show(`❌ ${t('prime_err_range')}`, true);
            }
            limit = max;
        }

        if (limit > 100000) {
            return show(`❌ ${t('prime_err_hard_limit')}`, true);
        }

        if (limit > 10000) {
            const est = estimateTime(limit);
            warning.textContent = `⚠️ ${t('prime_warn_slow').replace('{time}', est)}`;
            warning.style.display = 'block';
            
            await new Promise(r => setTimeout(r, 1500));
            
            if (!confirm(t('prime_confirm'))) {
                warning.style.display = 'none';
                return;
            }
        }

        const btn = document.getElementById('btn-gen-prime');
        btn.disabled = true; btn.textContent = '⏳ ' + t('prime_calc');
        document.getElementById('prime-table-container').style.display = 'none';
        const tb = document.getElementById('p-body');
        tb.innerHTML = '';

        setTimeout(async () => {
            try {
                const t0 = performance.now();
                const allPrimes = sieve(limit);
                const primes = mode === 'limit' ? allPrimes : filterRange(allPrimes, min, max);
                const t1 = performance.now();
                const time = ((t1 - t0) / 1000).toFixed(3);

                const CHUNK = 100;
                for (let i = 0; i < primes.length; i += CHUNK) {
                    const chunk = primes.slice(i, i + CHUNK);
                    let rows = '';
                    chunk.forEach((v, idx) => {
                        const globalIdx = i + idx + 1;
                        rows += `<tr><td>${globalIdx}</td><td><strong>${v}</strong></td><td><span class="badge">${v.toString().length}</span></td></tr>`;
                    });
                    tb.insertAdjacentHTML('beforeend', rows);
                    if (i + CHUNK < primes.length) {
                        await new Promise(r => setTimeout(r, 0));
                    }
                }

                document.getElementById('prime-table-container').style.display = 'block';
                show(`✅ ${t('prime_found').replace('{count}', primes.length).replace('{time}', time)}`, false, false);
            } catch (e) {
                show(`❌ ${e.message}`, true);
            }
            btn.disabled = false; btn.textContent = t('btn_gen');
            warning.style.display = 'none';
        }, 50);
    });

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
    }
}
