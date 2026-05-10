// modules/aritmetica/baze.js
import { t } from '../../utils/i18n.js';

const BASE_CHARS = "0123456789ABCDEF";

function convertBase(raw, fromBase, toBase) {
    if (fromBase < 2 || fromBase > 16 || toBase < 2 || toBase > 16) {
        throw new Error(t('base_err_range') || "Bazele trebuie să fie între 2 și 16.");
    }
    const allowed = BASE_CHARS.slice(0, fromBase).toLowerCase();
    for (let ch of raw.toLowerCase()) {
        if (!allowed.includes(ch)) throw new Error(`${t('base_err_char') || 'Caracter nevalid'} '${ch}' pentru baza ${fromBase}.`);
    }

    let val = 0n;
    const fb = BigInt(fromBase);
    for (let ch of raw.toLowerCase()) {
        val = val * fb + BigInt(BASE_CHARS.toLowerCase().indexOf(ch));
    }

    let res = "";
    if (val === 0n) res = "0";
    else {
        const tb = BigInt(toBase);
        let temp = val;
        while (temp > 0n) {
            res = BASE_CHARS[Number(temp % tb)] + res;
            temp /= tb;
        }
    }
    return { raw, fromBase, res, toBase };
}

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    ws.innerHTML = `
    <h2 data-i18n="base_title">${t('base_title')}</h2>
    <div class="description" data-i18n="base_desc">${t('base_desc')}</div>
    <div class="input-group">
    <label data-i18n="base_lbl_num">${t('base_lbl_num')}</label>
    <input id="base-num" type="text" placeholder="Ex: 1F, 1010, FF">
    </div>
    <div style="display:flex; gap:10px; margin-bottom:12px;">
    <div class="input-group" style="flex:1;">
    <label data-i18n="base_lbl_from">${t('base_lbl_from')}</label>
    <input id="base-from" type="number" min="2" max="16" value="16">
    </div>
    <div class="input-group" style="flex:1;">
    <label data-i18n="base_lbl_to">${t('base_lbl_to')}</label>
    <input id="base-to" type="number" min="2" max="16" value="10">
    </div>
    </div>
    <div class="btn-group btn-group-1">
    <button id="btn-base-conv" data-i18n="base_btn">${t('base_btn')}</button>
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

    document.getElementById('btn-base-conv').addEventListener('click', () => {
        try {
            const raw = document.getElementById('base-num').value.trim();
            if (!raw) throw new Error(t('base_err_empty') || "Introduceți un număr.");
            const fromBase = parseInt(document.getElementById('base-from').value);
            const toBase = parseInt(document.getElementById('base-to').value);
            const res = convertBase(raw, fromBase, toBase);
            const safeRaw = escapeHtml(res.raw);
            const safeFromBase = escapeHtml(res.fromBase);
            const safeRes = escapeHtml(res.res);
            const safeToBase = escapeHtml(res.toBase);
            show(`
            <div style="text-align:center;line-height:1.8;font-size:0.95rem;padding:5px 0;">
            ${t('base_res_from')} \\( ${safeRaw} \\) ${t('base_res_in')} \\( ${safeFromBase} \\) ${t('base_res_becomes')}<br>
            <span style="font-size:1.4em;color:var(--accent);word-break:break-all;">\\( ${safeRes} \\)</span>
            <br><small style="color:var(--text-muted)">${t('base_res_in')} \\( ${safeToBase} \\)</small>
            </div>
            `);
        } catch (e) {
            const safeMessage = escapeHtml(e?.message ?? '');
            show(`❌ ${safeMessage}`, true);
        }
    });

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]).catch(() => {}));
}
