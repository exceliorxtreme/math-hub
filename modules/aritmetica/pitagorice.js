// modules/aritmetica/pitagorice.js
import { t } from '../../utils/i18n.js';

function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }

function generatePythagorean(limit) {
    const triples = [];
    for (let m = 2; m * m <= limit; m++) {
        for (let n = 1; n < m; n++) {
            if ((m - n) % 2 === 0 || gcd(m, n) !== 1) continue;
            const a = m * m - n * n;
            const b = 2 * m * n;
            const c = m * m + n * n;
            if (c > limit) break;
            triples.push([Math.min(a, b), Math.max(a, b), c]);
        }
    }
    triples.sort((x, y) => x[2] - y[2]);
    return triples;
}

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="pyth_title">${t('pyth_title')}</h2>
    <div class="description" data-i18n="pyth_desc">${t('pyth_desc')}</div>
    <div class="input-group">
    <label data-i18n="pyth_lim">${t('pyth_lim')}</label>
    <input id="py-lim" type="number" min="5" max="10000" placeholder="Ex: 200">
    </div>
    <div class="btn-group btn-group-1">
    <button id="btn-gen-pyth" data-i18n="btn_gen">${t('btn_gen')}</button>
    </div>
    <div id="pyth-table-container" class="table-wrap" style="margin-top:15px;display:none;">
    <table>
    <thead>
    <tr>
    <th>#</th>
    <th>a</th>
    <th>b</th>
    <th>c</th>
    <th data-i18n="th_verify"></th>
    </tr>
    </thead>
    <tbody id="py-body"></tbody>
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

    document.getElementById('btn-gen-pyth').addEventListener('click', () => {
        const lim = Math.min(parseInt(document.getElementById('py-lim').value) || 0, 10000);
        if (lim < 5) {
            show(`❌ ${t('pyth_err_min') || 'Limită ≥ 5'}`, true);
            return;
        }
        const triples = generatePythagorean(lim);
        const tb = document.getElementById('py-body');
        tb.innerHTML = '';
        triples.forEach((v, i) => {
            tb.innerHTML += `<tr><td>${i + 1}</td><td>${v[0]}</td><td>${v[1]}</td><td><strong>${v[2]}</strong></td><td><span class="badge">${v[0]}²+${v[1]}²=${v[2]}²</span></td></tr>`;
        });
        document.getElementById('pyth-table-container').style.display = 'block';
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
