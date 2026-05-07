// modules/analiza/grafice.js
import { t } from '../../utils/i18n.js';

export function initUI() {
    const ws = document.getElementById('workspace');
    const resBox = document.getElementById('result');
    const colors = ['#00ff41', '#ff5555', '#42a5f5'];

    ws.innerHTML = `
    <h2 data-i18n="graph_title">${t('graph_title')}</h2>
    <div class="description" data-i18n="graph_desc">${t('graph_desc')}</div>
    <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px;">
    <div class="input-group" style="display:flex; align-items:center; gap:8px;">
    <span style="width:12px;height:12px;border-radius:50%;background:${colors[0]};display:inline-block;"></span>
    <label style="flex:1; font-size:0.85rem;">f₁(x) =</label>
    <input id="f1" type="text" placeholder="sin(x), x^2, sqrt(x)" style="flex:2;">
    </div>
    <div class="input-group" style="display:flex; align-items:center; gap:8px;">
    <span style="width:12px;height:12px;border-radius:50%;background:${colors[1]};display:inline-block;"></span>
    <label style="flex:1; font-size:0.85rem;">f₂(x) =</label>
    <input id="f2" type="text" placeholder="cos(x), log(x)" style="flex:2;">
    </div>
    <div class="input-group" style="display:flex; align-items:center; gap:8px;">
    <span style="width:12px;height:12px;border-radius:50%;background:${colors[2]};display:inline-block;"></span>
    <label style="flex:1; font-size:0.85rem;">f₃(x) =</label>
    <input id="f3" type="text" placeholder="tan(x), exp(-x)" style="flex:2;">
    </div>
    </div>
    <div class="btn-group btn-group-2" style="margin-bottom:10px;">
    <button id="btn-plot" style="background:#00ff41;color:#000;font-weight:bold;" data-i18n="graph_btn_plot">${t('graph_btn_plot')}</button>
    <button id="btn-clear" style="background:#555;" data-i18n="graph_btn_clear">${t('graph_btn_clear')}</button>
    </div>
    <canvas id="plot-canvas" style="width:100%; height:350px; background:var(--input-bg); border:1px solid var(--border); border-radius:6px;"></canvas>
    <div style="margin-top:8px; font-size:0.82rem; color:var(--text-muted); line-height:1.5;" data-i18n="graph_note">${t('graph_note')}</div>
    `;

    function show(html, err=false) {
        resBox.style.display='block'; resBox.innerHTML=html; resBox.style.borderLeftColor=err?'#ff5555':'var(--accent)';
        requestAnimationFrame(()=>{ if(window.MathJax?.typesetPromise) MathJax.typesetPromise([resBox]).catch(()=>{}); });
    }

    const plot = () => {
        const canvas = document.getElementById('plot-canvas');
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const xMin = -10, xMax = 10;
        const rawFuncs = [
            document.getElementById('f1').value.trim(),
            document.getElementById('f2').value.trim(),
            document.getElementById('f3').value.trim()
        ].filter(f => f.length > 0);

        if (rawFuncs.length === 0) return show(`❌ ${t('graph_err_empty') || 'Introduceți cel puțin o funcție.'}`, true);

        // Compile functions safely
        const funcs = [];
        try {
            for (let expr of rawFuncs) {
                const safeExpr = expr.replace(/\^/g, '**');
                const fn = new Function('x', `
                const sin=Math.sin, cos=Math.cos, tan=Math.tan, asin=Math.asin, acos=Math.acos, atan=Math.atan;
                const sqrt=Math.sqrt, log=Math.log, ln=Math.log, exp=Math.exp, abs=Math.abs, PI=Math.PI, E=Math.E;
                return ${safeExpr};
                `);
                fn(1); // test run
                funcs.push(fn);
            }
        } catch(e) { return show(`❌ ${t('graph_err_parse') || 'Sintaxă invalidă. Verificați expresiile.'}`, true); }

        // Autoscale Y
        const steps = 300;
        let yMin = Infinity, yMax = -Infinity;
        for (let fn of funcs) {
            for (let i=0; i<=steps; i++) {
                const x = xMin + (xMax-xMin)*i/steps;
                try {
                    const y = fn(x);
                    if (isFinite(y)) { yMin = Math.min(yMin, y); yMax = Math.max(yMax, y); }
                } catch(e) {}
            }
        }
        if (!isFinite(yMin)) { yMin = -5; yMax = 5; }
        const pad = (yMax - yMin) * 0.1 || 1;
        yMin -= pad; yMax += pad;

        const toX = x => ((x - xMin) / (xMax - xMin)) * rect.width;
        const toY = y => rect.height - ((y - yMin) / (yMax - yMin)) * rect.height;

        // Draw
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.lineWidth = 1;

        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        for (let x=Math.ceil(xMin); x<=xMax; x++) { ctx.beginPath(); ctx.moveTo(toX(x),0); ctx.lineTo(toX(x),rect.height); ctx.stroke(); }
        for (let y=Math.ceil(yMin); y<=yMax; y++) { ctx.beginPath(); ctx.moveTo(0,toY(y)); ctx.lineTo(rect.width,toY(y)); ctx.stroke(); }

        // Axes
        ctx.strokeStyle = '#00ff4188'; ctx.lineWidth = 1.5;
        const y0 = Math.max(0, Math.min(rect.height, toY(0)));
        const x0 = Math.max(0, Math.min(rect.width, toX(0)));
        ctx.beginPath(); ctx.moveTo(0,y0); ctx.lineTo(rect.width,y0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x0,0); ctx.lineTo(x0,rect.height); ctx.stroke();

        // Plot functions
        funcs.forEach((fn, idx) => {
            ctx.strokeStyle = colors[idx]; ctx.lineWidth = 2;
            ctx.beginPath();
            let started = false;
            for (let i=0; i<=steps*2; i++) {
                const x = xMin + (xMax-xMin)*i/(steps*2);
                try {
                    const y = fn(x);
                    if (!isFinite(y)) { started=false; continue; }
                    const px = toX(x), py = toY(y);
                    if (!started) { ctx.moveTo(px, py); started=true; } else ctx.lineTo(px, py);
                } catch(e) { started=false; }
            }
            ctx.stroke();
        });
    };

    document.getElementById('btn-plot').onclick = plot;
    document.getElementById('btn-clear').onclick = () => {
        document.getElementById('f1').value=''; document.getElementById('f2').value=''; document.getElementById('f3').value='';
        const c=document.getElementById('plot-canvas'), ctx=c.getContext('2d');
        ctx.clearRect(0,0,c.width,c.height);
        show('');
    };

    if (window.MathJax?.typesetPromise) requestAnimationFrame(() => MathJax.typesetPromise([ws]));
}
