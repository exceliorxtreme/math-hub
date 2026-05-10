// modules/modulara/op_modulo.js
import { t } from '../../utils/i18n.js';

function safeMod(v, n) { return ((v % n) + n) % n; }
function pMod(a, b, n) {
    if (n === 1n) return 0n;
    let r = 1n; a = safeMod(a, n);
    while (b > 0n) {
        if (b & 1n) r = safeMod(r * a, n);
        a = safeMod(a * a, n); b >>= 1n;
    }
    return r;
}
function mInv(a, n) {
    let t = 0n, nt = 1n, r = n, nr = safeMod(a, n);
    while (nr !== 0n) {
        let q = r / nr; [t, nt] = [nt, t - q * nt]; [r, nr] = [nr, r - q * nr];
    }
    return r > 1n ? null : (t < 0n ? t + n : t);
}

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="mod_title">${t('mod_title')}</h2>
    <div class="description" data-i18n="mod_desc">${t('mod_desc')}</div>
    <div class="input-group"><label data-i18n="mod_lbl_a">${t('mod_lbl_a')}</label><input id="m-a" type="text" placeholder="73"></div>
    <div class="input-group"><label data-i18n="mod_lbl_b">${t('mod_lbl_b')}</label><input id="m-b" type="text" placeholder="117"></div>
    <div class="input-group"><label data-i18n="mod_lbl_n">${t('mod_lbl_n')}</label><input id="m-n" type="text" placeholder="101"></div>
    <div class="btn-group btn-group-4">
    <button id="b-add" data-i18n="mod_btn_add">${t('mod_btn_add')}</button>
    <button id="b-sub" data-i18n="mod_btn_sub">${t('mod_btn_sub')}</button>
    <button id="b-mul" data-i18n="mod_btn_mul">${t('mod_btn_mul')}</button>
    <button id="b-pow" data-i18n="mod_btn_pow">${t('mod_btn_pow')}</button>
    </div>
    <div class="btn-group btn-group-1" style="margin-top:8px">
    <button id="b-inv" style="background:#2ecc71;" data-i18n="mod_btn_inv">${t('mod_btn_inv')}</button>
    </div>
    `;

    function show(html, err = false) {
        resBox.style.display = 'block';
        if (err) {
            resBox.textContent = html;
        } else {
            resBox.innerHTML = html;
        }
        resBox.style.borderLeftColor = err ? '#ff5555' : 'var(--accent)';
        requestAnimationFrame(() => { if (window.MathJax?.typesetPromise) MathJax.typesetPromise([resBox]).catch(() => {}); });
    }

    const gv = id => BigInt(document.getElementById(id).value.trim() || '0');

    document.getElementById('b-add').onclick = () => { try { show(`\\(a+b \\equiv ${safeMod(gv('m-a')+gv('m-b'), gv('m-n'))} \\pmod n\\)`); } catch(e){ show('❌ '+e.message, 1); } };
    document.getElementById('b-sub').onclick = () => { try { show(`\\(a-b \\equiv ${safeMod(gv('m-a')-gv('m-b'), gv('m-n'))} \\pmod n\\)`); } catch(e){ show('❌ '+e.message, 1); } };
    document.getElementById('b-mul').onclick = () => { try { show(`\\(a\\times b \\equiv ${safeMod(gv('m-a')*gv('m-b'), gv('m-n'))} \\pmod n\\)`); } catch(e){ show('❌ '+e.message, 1); } };
    document.getElementById('b-pow').onclick = () => { try { show(`\\(a^b \\bmod n = ${pMod(gv('m-a'), gv('m-b'), gv('m-n'))}\\)`); } catch(e){ show('❌ '+e.message, 1); } };
    document.getElementById('b-inv').onclick = () => { try { const inv = mInv(gv('m-a'), gv('m-n')); if(inv===null) throw new Error(t('mod_err_inv') || "Inversul nu există (gcd(a,n) ≠ 1)"); show(`\\(a^{-1} \\bmod n = ${inv}\\)`); } catch(e){ show('❌ '+e.message, 1); } };

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]));
}
