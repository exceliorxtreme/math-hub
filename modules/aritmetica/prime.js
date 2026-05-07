// modules/aritmetica/prime.js
import { t } from '../../utils/i18n.js';

// ✅ LOGICĂ PURĂ (Sieve of Eratosthenes)
function sieve(limit) {
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

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="prime_title">${t('prime_title')}</h2>
    <div class="description" data-i18n="prime_desc">${t('prime_desc')}</div>
    <div class="input-group">
    <label data-i18n="prime_lim">${t('prime_lim')}</label>
    <input id="p-lim" type="number" min="2" max="100000" placeholder="Ex: 1000">
    </div>
    <div class="btn-group btn-group-1">
    <button id="btn-gen-prime" data-i18n="btn_gen">${t('btn_gen')}</button>
    </div>
    <div id="prime-table-container" class="table-wrap" style="margin-top:15px;display:none;">
    <table>
    <thead>
    <tr>
    <th>#</th>
    <th data-i18n="th_num"></th>
    <th data-i18n="th_digits"></th>
    </tr>
    </thead>
    <tbody id="p-body"></tbody>
    </table>
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

    document.getElementById('btn-gen-prime').addEventListener('click', () => {
        const lim = Math.min(parseInt(document.getElementById('p-lim').value) || 0, 100000);
        if (lim < 2) {
            show(`❌ ${t('prime_err_min') || 'Limită ≥ 2'}`, true);
            return;
        }
        const primes = sieve(lim);
        const tb = document.getElementById('p-body');
        tb.innerHTML = '';
        primes.forEach((v, i) => {
            tb.innerHTML += `<tr><td>${i + 1}</td><td><strong>${v}</strong></td><td><span class="badge">${v.toString().length}</span></td></tr>`;
        });
        document.getElementById('prime-table-container').style.display = 'block';
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
