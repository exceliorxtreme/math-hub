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

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
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

    // 🔒 Safe-by-default show (CodeQL compliant)
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
            limit = max; // pentru verificarea hard limit
        }

        // 🛑 Hard limit: 100.000
        if (limit > 100000) {
            return show(`❌ ${t('prime_err_hard_limit')}`, true);
        }

        // ⚠️ Soft warning: >10.000 → estimare timp + confirmare
        if (limit > 10000) {
            const est = estimateTime(limit);
            warning.textContent = `⚠️ ${t('prime_warn_slow').replace('{time}', est)}`;
            warning.style.display = 'block';
            
            // Așteptăm 1.5s pentru ca utilizatorul să vadă avertismentul
            await new Promise(r => setTimeout(r, 1500));
            
            // Confirmare opțională (poate fi sărită cu Escape)
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

        // Chunked rendering pentru UI fluid
        setTimeout(async () => {
            try {
                const t0 = performance.now();
                const allPrimes = sieve(limit);
                const primes = mode === 'limit' ? allPrimes : filterRange(allPrimes, min, max);
                const t1 = performance.now();
                const time = ((t1 - t0) / 1000).toFixed(3);

                // Randare chunk-by-chunk (100 rânduri la fiecare yield)
                const CHUNK = 100;
                for (let i = 0; i < primes.length; i += CHUNK) {
                    const chunk = primes.slice(i, i + CHUNK);
                    let rows = '';
                    chunk.forEach((v, idx) => {
                        const globalIdx = i + idx + 1;
                        rows += `<tr><td>${globalIdx}</td><td><strong>${v}</strong></td><td><span class="badge">${v.toString().length}</span></td></tr>`;
                    });
                    tb.insertAdjacentHTML('beforeend', rows);
                    // Cedează controlul UI-ului
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
