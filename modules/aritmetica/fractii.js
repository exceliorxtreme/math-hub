// modules/aritmetica/fractii.js
import { t } from '../../utils/i18n.js';

// ✅ LOGICĂ PURĂ
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b){[a,b]=[b,a%b]}return a}
function simp(n,d){if(d<0n){n=-n;d=-d}const c=gcd(n<0n?-n:n,d);return{n:n/c,d:d/c}}

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');

    ws.innerHTML = `
    <h2 data-i18n="frac_title">${t('frac_title')}</h2>
    <div class="description" data-i18n="frac_desc">${t('frac_desc')}</div>
    <div class="input-group">
    <label data-i18n="frac_lbl_1">${t('frac_lbl_1')}</label>
    <div class="frac-inputs">
    <input id="f1-n" type="number" placeholder="${t('frac_ph_num')}">
    <span class="sep">/</span>
    <input id="f1-d" type="number" placeholder="${t('frac_ph_den')}">
    </div>
    </div>
    <div class="input-group">
    <label data-i18n="frac_lbl_2">${t('frac_lbl_2')}</label>
    <div class="frac-inputs">
    <input id="f2-n" type="number" placeholder="${t('frac_ph_num')}">
    <span class="sep">/</span>
    <input id="f2-d" type="number" placeholder="${t('frac_ph_den')}">
    </div>
    </div>
    <div class="btn-group btn-group-4">
    <button id="btn-add">+</button><button id="btn-sub">−</button><button id="btn-mul">×</button><button id="btn-div">÷</button>
    </div>
    `;

    function show(html, err=false){
        resBox.style.display='block'; resBox.innerHTML=html; resBox.style.borderLeftColor=err?'#ff5555':'var(--accent)';
        requestAnimationFrame(()=>{ if(window.MathJax?.typesetPromise) MathJax.typesetPromise([resBox]).catch(()=>{}); });
    }

    const run = (op)=>{
        try {
            const n1=BigInt(document.getElementById('f1-n').value||0), d1=BigInt(document.getElementById('f1-d').value||1);
            const n2=BigInt(document.getElementById('f2-n').value||0), d2=BigInt(document.getElementById('f2-d').value||1);
            if(!d1||!d2) throw new Error("Numitorul nu poate fi 0");
            let rn,rd;
            if(op==='add'){rn=n1*d2+n2*d1; rd=d1*d2} else if(op==='sub'){rn=n1*d2-n2*d1; rd=d1*d2}
            else if(op==='mul'){rn=n1*n2; rd=d1*d2} else { if(!n2) throw new Error("Împărțire la zero!"); rn=n1*d2; rd=d1*n2 }
            const s=simp(rn,rd); const sym={add:'+',sub:'−',mul:'\\times',div:'\\div'}[op];
            show(`\\(\\left(\\frac{${n1}}{${d1}}\\right) ${sym} \\left(\\frac{${n2}}{${d2}}\\right) = ${s.d===1n?`${s.n}`:`\\frac{${s.n}}{${s.d}}`}\\)`);
        } catch(e){ show("❌ "+e.message, true); }
    };
    document.getElementById('btn-add').onclick=()=>run('add'); document.getElementById('btn-sub').onclick=()=>run('sub');
    document.getElementById('btn-mul').onclick=()=>run('mul'); document.getElementById('btn-div').onclick=()=>run('div');
}
