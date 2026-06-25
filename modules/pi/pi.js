// modules/pi/pi.js
import { t } from '../../utils/i18n.js';

// ============================================================================
// 🥧 ALGORITM PI (Formula lui Machin cu BigInt & Fixed-Point)
// ============================================================================
function arctan(x, unit) {
    let x2 = x * x;
    let num = unit;
    let den = x;
    let sum = 0n;
    let k = 0;
    
    while (true) {
        let term = num / den;
        if (term === 0n) break; 
        
        let div = BigInt(2 * k + 1);
        if (k % 2 === 0) sum += term / div;
        else sum -= term / div;
        
        // ❌ ȘTERS: num = -num;  ← Asta cauza dublă alternare a semnelor!
        den = den * x2;
        k++;
    }
    return sum;
}

function calculatePi(totalDigits) {
    const prec = totalDigits + 15; 
    const unit = 10n ** BigInt(prec);
    
    let pi = 16n * arctan(5n, unit) - 4n * arctan(239n, unit);
    let piStr = pi.toString();
    
    while (piStr.length < prec + 1) {
        piStr = '0' + piStr;
    }
    
    return piStr.slice(1, totalDigits + 1);
}

// ============================================================================
// 🎨 UI & RENDER
// ============================================================================
export function initUI() {
    const ws = document.getElementById('workspace');
    if (!ws) return;

    ws.innerHTML = `
   <h2 data-i18n="pi_title">${t('pi_title')}</h2>
<div class="description" data-i18n="pi_desc">${t('pi_desc')}</div>

<div style="margin: 12px 0 18px 0; padding: 12px 16px; background: linear-gradient(135deg, rgba(41,128,185,0.08), rgba(142,68,173,0.08)); border-left: 4px solid var(--accent); border-radius: 6px; font-family: 'Courier New', monospace; font-size: 1.15rem; letter-spacing: 1px; color: var(--text);">
    <span style="color: var(--accent); font-weight: 700;">π</span> = 3.14159<span style="opacity:0.5;">...</span>
</div>

    <div class="fsec" style="background:linear-gradient(90deg,#2980b9,#3498db); margin-top:15px;" data-i18n="pi_sec_calc">${t('pi_sec_calc')}</div>
    <div class="fcards">
        <div class="fcard">
            <div class="fhead" data-i18n="pi_calc_title">${t('pi_calc_title')}</div>
            <div class="fbody">
                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                    <div class="input-group" style="flex:1; min-width:150px;">
                        <label data-i18n="pi_lbl_start">${t('pi_lbl_start')}</label>
                        <input id="pi-start" type="number" min="1" value="1000" placeholder="Ex: 1000">
                    </div>
                    <div class="input-group" style="flex:1; min-width:150px;">
                        <label data-i18n="pi_lbl_count">${t('pi_lbl_count')}</label>
                        <input id="pi-count" type="number" min="1" max="10000" value="200" placeholder="Ex: 200">
                    </div>
                </div>
                <div class="btn-group">
                    <button id="btn-calc-pi" data-i18n="pi_btn">${t('pi_btn')}</button>
                </div>
                <div id="out-pi" style="margin-top:10px; font-size:0.9rem; line-height:1.6; color:var(--text); font-family:monospace; white-space:pre-wrap; background:var(--card-bg); padding:10px; border-radius:6px; display:none;"></div>
            </div>
        </div>
    </div>

    <div class="fsec" style="background:linear-gradient(90deg,#8e44ad,#6c3483); margin-top:15px;" data-i18n="pi_sec_math">${t('pi_sec_math')}</div>
    <div class="fcards">
        <div class="fcard">
            <div class="fhead" data-i18n="pi_math_title">${t('pi_math_title')}</div>
            <div class="fbody" style="text-align:center; font-size:1.1rem; padding:15px;">
                \\[ \\pi = 16 \\arctan\\left(\\frac{1}{5}\\right) - 4 \\arctan\\left(\\frac{1}{239}\\right) \\]
                <div style="font-size:0.85rem; color:var(--text); margin-top:10px;" data-i18n="pi_math_desc">${t('pi_math_desc')}</div>
            </div>
        </div>
    </div>
    `;

    function showLocal(target, content, err = false, allowHtml = false) {
        if (!target) return;
        target.style.display = 'block';
        target.innerHTML = allowHtml ? content : String(content);
        target.style.borderLeft = err ? '3px solid #e74c3c' : '3px solid var(--accent)';
        target.style.paddingLeft = '8px';
    }

    const outPi = document.getElementById('out-pi');
    const btnCalc = document.getElementById('btn-calc-pi');

    btnCalc.addEventListener('click', () => {
        const start = parseInt(document.getElementById('pi-start').value);
        const count = parseInt(document.getElementById('pi-count').value);

        if (isNaN(start) || start < 1) {
            return showLocal(outPi, `❌ ${t('pi_err_start')}`, true);
        }
        if (isNaN(count) || count < 1 || count > 10000) {
            return showLocal(outPi, `❌ ${t('pi_err_count')}`, true);
        }

        const end = start + count - 1;

        if (end > 100000) {
            return showLocal(outPi, `❌ ${t('pi_err_max_end')}`, true);
        }

        btnCalc.disabled = true; 
        btnCalc.textContent = '⏳ ' + t('pi_calc');
        showLocal(outPi, `⏳ ${t('pi_computing')}...`, false);

        setTimeout(() => {
            try {
                const t0 = performance.now();
                const decimals = calculatePi(end);
                const t1 = performance.now();
                const time = ((t1 - t0) / 1000).toFixed(4);

                const slice = decimals.slice(start - 1, end);
                
                let formatted = "";
                for (let i = 0; i < slice.length; i += 50) {
                    let line = slice.substring(i, i + 50);
                    line = line.match(/.{1,10}/g).join(' ');
                    const from = start + i;
                    const to = Math.min(start + i + 49, end);
                    formatted += `[${from.toString().padStart(5, ' ')} - ${to.toString().padStart(5, ' ')}]: ${line}\n`;
                }

                let html = `<div style="margin-bottom:8px; color:var(--success);">✅ ${t('pi_success')} (${time}s)</div>`;
                html += `<pre style="margin:0; font-size:0.85rem; line-height:1.5; overflow-x:auto;">${formatted}</pre>`;
                
                showLocal(outPi, html, false, true);
            } catch (e) {
                showLocal(outPi, `❌ ${e.message}`, true);
            }
            btnCalc.disabled = false; 
            btnCalc.textContent = t('pi_btn');
        }, 50);
    });

    if (window.MathJax?.typesetPromise) {
        requestAnimationFrame(() => {
            if (window.MathJax?.typesetPromise) {
                window.MathJax.typesetPromise([ws]).catch(() => {});
            }
        });
    }
}
