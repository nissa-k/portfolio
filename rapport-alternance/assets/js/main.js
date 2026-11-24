// Interactions légères et non intrusives (pas de framework)

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  // Révèle légèrement les cartes / sections au scroll
  const revealables = document.querySelectorAll('.card, .gallery-item, .tl-item');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    revealables.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      io.observe(el);
    });
  }
});

// Le logo de l'en-tête apparaît au défilement (comme sur le site Info Concept)
(function () {
  const onScroll = () => document.body.classList.toggle('scrolled', window.scrollY > 90);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Missions : liste de domaines à gauche, détail à droite (sans JS, les cartes restent affichées)
(function () {
  const src = document.getElementById('missions');
  if (!src) return;
  const cards = Array.from(src.querySelectorAll(':scope > .card'));
  if (!cards.length) return;

  const wrap = document.createElement('div');
  wrap.className = 'mdet';
  const list = document.createElement('div');
  list.className = 'mdet-list';
  list.setAttribute('role', 'tablist');
  const panel = document.createElement('div');
  panel.className = 'mdet-panel';
  panel.setAttribute('role', 'tabpanel');

  const buttons = cards.map((c, i) => {
    const tag = c.querySelector('.tag');
    const h3 = c.querySelector('h3');
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.innerHTML = '<small>' + (tag ? tag.textContent : '') + '</small><span>' + (h3 ? h3.textContent : '') + '</span>';
    b.addEventListener('click', () => select(i));
    list.appendChild(b);
    return b;
  });

  function select(i) {
    buttons.forEach((b, k) => {
      b.classList.toggle('on', k === i);
      b.setAttribute('aria-selected', k === i ? 'true' : 'false');
    });
    panel.classList.remove('in');
    panel.innerHTML = cards[i].innerHTML;
    void panel.offsetWidth;
    panel.classList.add('in');
  }

  wrap.appendChild(list);
  wrap.appendChild(panel);
  src.parentNode.insertBefore(wrap, src);
  src.style.display = 'none';
  select(0);
})();
