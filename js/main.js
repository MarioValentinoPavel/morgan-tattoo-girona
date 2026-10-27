// Morgan Tattoo & Piercing · «Val regal»: se desata el lazo, se abre la caja y diseñas tu tarjeta regalo
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const LI = () => ({ es: 0, ca: 1, en: 2 }[document.documentElement.lang] || 0);
  const T = (es, ca, en) => [es, ca, en][LI()];
  const TYPES = [['Lo que elija', 'El que triï', 'Their choice'], ['Tatuaje', 'Tatuatge', 'Tattoo'], ['Piercing', 'Pírcing', 'Piercing'], ['Joyería', 'Joieria', 'Jewellery'], ['Gema dental', 'Gemma dental', 'Tooth gem']];
  const AMTS = [30, 50, 100, 150];
  const st = { type: 0, amt: 1 };

  // ---------- arranque: la caja se abre ----------
  function intro() {
    const box = document.getElementById('box');
    if (reduce || typeof gsap === 'undefined') { box.remove(); return Promise.resolve(); }
    document.body.classList.add('lock');
    return new Promise((res) => {
      gsap.timeline({ onComplete: () => { box.remove(); document.body.classList.remove('lock'); res(); } })
        .from('.box-n', { opacity: 0, y: 30, duration: .6, ease: 'expo.out' })
        .to('.rib-v', { yPercent: -110, duration: .7, ease: 'power3.in' }, .55)
        .to('.rib-h', { xPercent: 110, duration: .7, ease: 'power3.in' }, .6)
        .to(box, { yPercent: -100, duration: .9, ease: 'expo.inOut' }, 1.15);
    });
  }

  // ---------- tarjeta regalo ----------
  function gift() {
    const tBox = document.getElementById('gType'), aBox = document.getElementById('gAmt');
    const to = document.getElementById('gTo'), msg = document.getElementById('gMsg'), card = document.getElementById('card');
    const opts = () => {
      tBox.innerHTML = TYPES.map((t, i) => `<button type="button" role="radio" aria-checked="${i === st.type}" data-i="${i}">${t[LI()]}</button>`).join('');
      aBox.innerHTML = AMTS.map((a, i) => `<button type="button" role="radio" aria-checked="${i === st.amt}" data-i="${i}">${a} €</button>`).join('');
    };
    const sum = () => `${AMTS[st.amt]} € · ${TYPES[st.type][LI()]}`;
    const fill = () => {
      document.getElementById('cAmt').textContent = AMTS[st.amt] + ' €';
      document.getElementById('cType').textContent = st.type ? TYPES[st.type][LI()] : T('Tatuaje, piercing, joyería o gemas dentales', 'Tatuatge, pírcing, joieria o gemmes dentals', 'Tattoo, piercing, jewellery or tooth gems');
      document.getElementById('cTo').textContent = to.value.trim() || '…';
      document.getElementById('cMsg').textContent = msg.value.trim() ? `«${msg.value.trim()}»` : '';
      document.getElementById('gIg').title = T('Escríbenos: quiero una tarjeta regalo de ', 'Escriu-nos: vull una targeta regal de ', 'Message us: I would like a gift card for ') + sum();
    };
    const pick = (box, key) => box.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return; st[key] = +b.dataset.i; opts(); fill();
      if (!reduce && typeof gsap !== 'undefined') gsap.fromTo(card, { rotateY: -14 }, { rotateY: 0, duration: .8, ease: 'elastic.out(1, .5)' });
    });
    pick(tBox, 'type'); pick(aBox, 'amt');
    [to, msg].forEach((el) => el.addEventListener('input', fill));
    document.addEventListener('langchange', () => { opts(); fill(); });
    opts(); fill();
    // inclinación 3D y reflejo al pasar el cursor
    if (fine && !reduce) {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = `rotateY(${(x - .5) * 16}deg) rotateX(${(.5 - y) * 12}deg)`;
        card.style.setProperty('--gx', x * 100 + '%'); card.style.setProperty('--gy', y * 100 + '%');
      });
      card.addEventListener('pointerleave', () => (card.style.transform = ''));
    }
    // vista previa en PNG
    document.getElementById('gSave').addEventListener('click', async () => {
      const W = 1600, H = 1000, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
      if (document.fonts) await document.fonts.load('600 40px "Texturina"');
      g.fillStyle = '#0b1f19'; g.beginPath(); g.roundRect(0, 0, W, H, 56); g.fill();
      g.strokeStyle = 'rgba(239,232,220,.3)'; g.lineWidth = 3; g.beginPath(); g.roundRect(30, 30, W - 60, H - 60, 36); g.stroke();
      g.fillStyle = '#efe8dc'; g.font = '600 110px "Texturina"'; g.fillText('Morgan', 90, 200);
      g.fillStyle = '#a3b5ab'; g.font = '400 30px "PT Sans"'; g.fillText('TATTOO & PIERCING · GIRONA', 92, 250);
      g.fillStyle = '#d4472b'; g.font = '700 34px "PT Sans"'; g.fillText(T('TARJETA REGALO', 'TARGETA REGAL', 'GIFT CARD'), 92, 340);
      g.fillStyle = '#efe8dc'; g.font = '700 240px "Texturina"'; g.fillText(AMTS[st.amt] + ' €', 84, 600);
      g.fillStyle = '#a3b5ab'; g.font = '400 40px "PT Sans"'; g.fillText(document.getElementById('cType').textContent, 92, 680);
      g.fillStyle = '#efe8dc'; g.font = '400 46px "PT Sans"'; g.fillText(`${T('Para', 'Per a', 'For')} ${to.value.trim() || '…'}`, 92, 790);
      g.font = 'italic 400 40px "PT Sans"'; g.fillText(msg.value.trim() ? `«${msg.value.trim()}»` : '', 92, 860);
      g.fillStyle = 'rgba(239,232,220,.45)'; g.font = '400 24px "PT Sans"'; g.fillText(T('VISTA PREVIA · SE COMPRA EN EL ESTUDIO · PLAÇA DEL VI, 11', 'VISTA PRÈVIA · ES COMPRA A L’ESTUDI · PLAÇA DEL VI, 11', 'PREVIEW · BUY IT AT THE STUDIO · PLAÇA DEL VI, 11'), 92, 940);
      c.toBlob((b) => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'tarjeta-regalo-morgan.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); });
    });
  }

  function header() {
    const top = document.querySelector('.top'); let last = 0;
    addEventListener('scroll', () => {
      const y = scrollY; top.classList.toggle('solid', y > 40);
      if (y > 600 && y > last + 4) top.classList.add('hide'); else if (y < last - 4) top.classList.remove('hide');
      last = y;
    }, { passive: true });
  }

  function motion() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('h2.rv').forEach((h) => gsap.from(h, { opacity: 0, y: 40, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } }));
    gsap.utils.toArray('.q-list li').forEach((li) => gsap.from(li, { opacity: 0, x: -40, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: li, start: 'top 92%' } }));
    gsap.utils.toArray('.t-grid figure, .rs blockquote, .card-wrap').forEach((el, i) => gsap.from(el, { opacity: 0, y: 50, duration: 1.1, ease: 'expo.out', delay: (i % 3) * .07, scrollTrigger: { trigger: el, start: 'top 92%' } }));
  }
  function heroIn() {
    if (reduce || typeof gsap === 'undefined') return;
    gsap.from('.since, .hero h1, .hero-p, .hero-cta, .hero-rate', { opacity: 0, y: 30, duration: 1.2, stagger: .08, ease: 'expo.out' });
    gsap.from('.ha-1', { opacity: 0, rotate: -14, y: 60, duration: 1.4, ease: 'expo.out' });
    gsap.from('.ha-2', { opacity: 0, rotate: 16, y: 80, duration: 1.4, ease: 'expo.out', delay: .12 });
  }

  function init() {
    gift(); header();
    if (!reduce && typeof gsap !== 'undefined') motion();
    intro().then(heroIn);
    document.fonts && document.fonts.ready.then(() => typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
